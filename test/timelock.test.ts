import hre, { ethers, upgrades, waffle } from "hardhat";
import { expect } from "chai";
import { Contract, utils } from "ethers";
import { Horse, Staking, Facility, Star, Speed, Timelock } from "./../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Timelock", async () => {
  let wallet: SignerWithAddress;
  let walletTo: SignerWithAddress;
  let horse: Horse;
  let facility: Facility;
  let staking: Staking;
  let speed: Speed;
  let star: Star;
  let timelock: Timelock;

  async function mineBlocks(blockNumber:number) {
    while (blockNumber > 0) {
      blockNumber--;
      await hre.network.provider.request({
        method: "evm_mine",
        params: [],
      });
    }
  }

  beforeEach(async () => {
    [wallet, walletTo] = await ethers.getSigners();
    const HorseContract = await ethers.getContractFactory("Horse");
    const SpeedContract = await ethers.getContractFactory("Speed");
    const StakingContract = await ethers.getContractFactory("Staking");
    const StarContract = await ethers.getContractFactory("Star");
    const FacilityContract = await ethers.getContractFactory("Facility");
    horse = (await HorseContract.deploy("SpeedStar Horse", "SSH")) as Horse;
    await horse.deployed();
    star = (await StarContract.deploy()) as Star;
    await star.deployed();
    facility = (await FacilityContract.deploy(
      "SpeedStar Facility",
      "SSF"
    )) as Facility;
    await facility.deployed();
    speed = (await SpeedContract.deploy()) as Speed;
    await speed.deployed();
    staking = (await StakingContract.deploy(
      speed.address,
      star.address,
      horse.address,
      facility.address,
      utils.parseEther("80"),
      0
    )) as Staking;

    await staking.deployed();
    await speed.setAdmin(staking.address, true);
    await horse.setMinter(walletTo.address, true);
    await star.connect(wallet).setAdmin(staking.address, true);
  });

  it("set timelock", async () => {
    const TimelockContract = await ethers.getContractFactory("Timelock");
    const delay = 60 * 60 * 7;

    timelock = (await TimelockContract.deploy(
      wallet.address,
      delay
    )) as Timelock;

    await timelock.deployed();

    let block = await waffle.provider.getBlock("latest");
    // console.log(block);
    const eta = block.timestamp + delay + 10;

    await horse.connect(wallet).transferOwnership(timelock.address);
    console.log("Timelock address", timelock.address);
    console.log("Horse owner", await horse.owner());

    const query = await timelock
      .connect(wallet)
      .queueTransaction(
        horse.address,
        "0",
        "transferOwnership(address)",
        ethers.utils.defaultAbiCoder.encode(["address"], [walletTo.address]),
        eta
      );
    await query.wait();
    // console.log("tx:", JSON.stringify(query, null, 2));
    // block = await waffle.provider.getBlock("latest");
    // console.log(block.number);
    await mineBlocks(100000)
    // await waffle.provider.send("evm_mine",["0x64"]);
    // block = await waffle.provider.getBlock("latest");
    // console.log(block.number);

    const execute = await timelock
      .connect(wallet)
      .executeTransaction(
        horse.address,
        "0",
        "transferOwnership(address)",
        ethers.utils.defaultAbiCoder.encode(["address"], [walletTo.address]),
        eta
      );

    // console.log("exe:", JSON.stringify(execute, null, 2));

    console.log("Horse owner", await horse.owner());
  }).timeout(100000000);


});
