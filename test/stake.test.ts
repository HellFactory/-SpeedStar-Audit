import hre, { ethers, upgrades, waffle } from "hardhat";
import { expect } from "chai";
import { Contract, utils } from "ethers";
import { Staking } from "../types/Staking";
import { Star } from "../types/Star";
import { Facility } from "../types/Facility";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Stake", async () => {
  let wallet: SignerWithAddress;
  let walletTo: SignerWithAddress;
  let horse: Contract;
  let facility: Facility;
  let staking: Staking;
  let speed: Contract;
  let star: Star;

  let moveBlock = async (_totalBlockToMove: Number) => {
    for (let index = 0; index < _totalBlockToMove; index++) {
      const block = await waffle.provider.getBlock("latest");
      await waffle.provider.send("evm_mine", [block.timestamp + 5001]);
    }
  };

  beforeEach(async () => {
    [wallet, walletTo] = await ethers.getSigners();
    const Horse = await ethers.getContractFactory("Horse");
    const Speed = await ethers.getContractFactory("Speed");
    const StakingContract = await ethers.getContractFactory("Staking");
    const StarContract = await ethers.getContractFactory("Star");
    const FacilityContract = await ethers.getContractFactory("Facility");
    horse = await Horse.deploy("SpeedStar Horse", "SSH");
    await horse.deployed();
    star = (await StarContract.deploy()) as Star;
    await star.deployed();
    facility = (await FacilityContract.deploy(
      "SpeedStar Facility",
      "SSF"
    )) as Facility;
    await facility.deployed();
    speed = await Speed.deploy();
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

  it("Stake star", async () => {
    await star
      .connect(wallet)
      .mint(walletTo.address, ethers.utils.parseEther("11"));
    await star
      .connect(walletTo)
      .approve(staking.address, ethers.utils.parseEther("10000"));

    await staking.connect(walletTo).depositStar(ethers.utils.parseEther("2.89"));

    await horse.connect(walletTo).setApprovalForAll(staking.address, true);
    for (let index = 0; index < 4; index++) {
      await horse
        .connect(walletTo)
        .mint(walletTo.address, "api/data/1", index, 100, 3000000);

      await expect(staking.connect(walletTo).depositHorse(index))
        .to.emit(staking, "DepositHorse")
        .withArgs(walletTo.address, 100, index);
    }

    //  await staking.connect(walletTo).withdrawStar(ethers.utils.parseEther("0.99"));
  });

  it("Get horse staking", async () => {
    await horse.connect(walletTo).setApprovalForAll(staking.address, true);
    for (let index = 0; index < 2; index++) {
      await horse
        .connect(walletTo)
        .mint(walletTo.address, "api/data/1", index, 100, 3000000);

      await expect(staking.connect(walletTo).depositHorse(index))
        .to.emit(staking, "DepositHorse")
        .withArgs(walletTo.address, 100, index);
    }
    const horses = await staking.getUserDepositHorse(walletTo.address);
    // console.log("Horse ", JSON.stringify(horses, null, 2));
  }).timeout(10000000);

  it("Plot size", async () => {
    console.log("Use plot", await staking.userPlots(walletTo.address));
    await facility.connect(walletTo).setApprovalForAll(staking.address, true);

    await facility.mintStable(walletTo.address, "api/data/1", 1, 2, 120);
    await expect(staking.connect(walletTo).depositStable(1))
      .to.emit(staking, "DepositStable")
      .withArgs(walletTo.address, 0, 1);
    console.log("Use plot", await staking.userPlots(walletTo.address));
    await facility.mintStable(walletTo.address, "api/data/2", 2, 2, 24);
    await expect(staking.connect(walletTo).depositStable(2))
      .to.emit(staking, "DepositStable")
      .withArgs(walletTo.address, 0, 2);
    console.log("Use plot", await staking.userPlots(walletTo.address));

    const stables = await staking.getUserDepositStable(walletTo.address);
    // console.log("Stable ", JSON.stringify(stables, null, 2));

    const horses = await staking.getUserDepositHorse(walletTo.address);
    console.log("Horse ", JSON.stringify(horses, null, 2));
    // await facility.mintStable(walletTo.address, "api/data/3", 3, 2, 120);
    // await expect(staking.connect(walletTo).depositStable(3))
    // .to.emit(staking, "DepositStable")
    // .withArgs(walletTo.address, 0, 3);
  });

  it("Claim Reward", async () => {
    await horse
      .connect(walletTo)
      .mint(walletTo.address, "api/data/11", 11, 100, 3000000);
    await horse.connect(walletTo).setApprovalForAll(staking.address, true);
    // await expect(staking.connect(walletTo).depositHorse(11))
    // .to.emit(staking, "DepositHorse")
    // .withArgs(walletTo.address, 100, 11);

    await horse
      .connect(walletTo)
      .mint(walletTo.address, "api/data/12", 12, 100, 3000000);

    await facility.mintStable(walletTo.address, "api/data/1", 1, 2, 4);
    await facility.connect(walletTo).setApprovalForAll(staking.address, true);

    await expect(staking.connect(walletTo).depositStable(1))
      .to.emit(staking, "DepositStable")
      .withArgs(walletTo.address, 0, 1);

    moveBlock(1);
    console.log("block ", (await waffle.provider.getBlock("latest")).number);
    await expect(staking.connect(walletTo).depositHorseInStable(1, 11))
      .to.emit(staking, "DepositHorseInStable")
      .withArgs(walletTo.address, 1, 100, 11);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    await expect(staking.connect(walletTo).withdrawHorseInStable(1, 11))
      .to.emit(staking, "WithdrawHorseInStable")
      .withArgs(walletTo.address, 1, 100, 11);
    console.log("block ", (await waffle.provider.getBlock("latest")).number);
    await expect(staking.connect(walletTo).depositHorseInStable(1, 11))
      .to.emit(staking, "DepositHorseInStable")
      .withArgs(walletTo.address, 1, 100, 11);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    await expect(staking.connect(walletTo).withdrawHorseInStable(1, 11))
      .to.emit(staking, "WithdrawHorseInStable")
      .withArgs(walletTo.address, 1, 100, 11);
    console.log("block ", (await waffle.provider.getBlock("latest")).number);
    await expect(staking.connect(walletTo).depositHorseInStable(1, 11))
      .to.emit(staking, "DepositHorseInStable")
      .withArgs(walletTo.address, 1, 100, 11);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    await expect(staking.connect(walletTo).withdrawHorseInStable(1, 11))
      .to.emit(staking, "WithdrawHorseInStable")
      .withArgs(walletTo.address, 1, 100, 11);
    console.log("block ", (await waffle.provider.getBlock("latest")).number);
    await expect(staking.connect(walletTo).depositHorseInStable(1, 11))
      .to.emit(staking, "DepositHorseInStable")
      .withArgs(walletTo.address, 1, 100, 11);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    await expect(staking.connect(walletTo).withdrawHorseInStable(1, 11))
      .to.emit(staking, "WithdrawHorseInStable")
      .withArgs(walletTo.address, 1, 100, 11);

    console.log("block ", (await waffle.provider.getBlock("latest")).number);
    await staking.connect(walletTo).claim();
    // await staking.connect(walletTo).withdrawHorse(11);
    // console.log(
    //   "Pending ",
    //   ethers.utils.formatEther(
    //     await staking.connect(walletTo).getPendingSpeed(walletTo.address)
    //   )
    // );
    // await staking.connect(walletTo).withdrawHorse(11);

    console.log(
      "Balance ",
      ethers.utils.formatEther(await speed.balanceOf(walletTo.address))
    );

    console.log("block ", (await waffle.provider.getBlock("latest")).number);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    console.log("block ", (await waffle.provider.getBlock("latest")).number);
  });

  it("Stake horse in stable and withdraw stable", async () => {
    await horse
      .connect(walletTo)
      .mint(walletTo.address, "api/data/1", 1, 100, 3000000);
    await horse
      .connect(walletTo)
      .mint(walletTo.address, "api/data/2", 2, 100, 3000000);
    await horse.connect(walletTo).setApprovalForAll(staking.address, true);

    await expect(staking.connect(walletTo).depositHorse(1))
    .to.emit(staking, "DepositHorse")
    .withArgs(walletTo.address, 100, 1);

    await facility.mintStable(walletTo.address, "api/data/1", 1, 2, 4);

    await facility.connect(walletTo).setApprovalForAll(staking.address, true);

    await expect(staking.connect(walletTo).depositStable(1))
    .to.emit(staking, "DepositStable")
    .withArgs(walletTo.address, 0, 1);

    await expect(staking.connect(walletTo).depositHorseInStable(1, 2))
    .to.emit(staking, "DepositHorseInStable")
    .withArgs(walletTo.address, 1, 100, 2);

    await expect(staking.connect(walletTo).withdrawStable(1))
    .to.emit(staking, "WithdrawStable")
    .withArgs(walletTo.address, 1);
  });

  it("Stake horse to recevice reward 1 block", async () => {
    let startBlock;
    let endBlock;

    await horse
      .connect(walletTo)
      .mint(walletTo.address, "api/data/1", 1, 100, 3000000);
    await horse
      .connect(walletTo)
      .mint(walletTo.address, "api/data/2", 2, 100, 3000000);
    await horse.connect(walletTo).setApprovalForAll(staking.address, true);

    await expect(staking.connect(walletTo).depositHorse(1))
      .to.emit(staking, "DepositHorse")
      .withArgs(walletTo.address, 100, 1);
    console.log(
      "Start block ",
      await (
        await waffle.provider.getBlock("latest")
      ).number
    );
    await expect(staking.connect(walletTo).depositHorse(2))
      .to.emit(staking, "DepositHorse")
      .withArgs(walletTo.address, 100, 2);
    expect((await staking.userInfo(walletTo.address)).amount).to.equal(200);
    await staking.connect(walletTo).withdrawHorse(1);
    moveBlock(1);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );
    console.log("Withdraw horse 2");
    await staking.connect(walletTo).withdrawHorse(2);

    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );
    console.log(
      "End block ",
      await (
        await waffle.provider.getBlock("latest")
      ).number
    );
    console.log(
      "Speed balance ",
      ethers.utils.formatEther(await speed.balanceOf(walletTo.address))
    );

    await facility.mintStable(walletTo.address, "api/data/1", 1, 2, 4);
    await facility.mintStable(walletTo.address, "api/data/2", 2, 2, 4);

    await facility.connect(walletTo).setApprovalForAll(staking.address, true);
    await expect(staking.connect(walletTo).depositStable(1))
      .to.emit(staking, "DepositStable")
      .withArgs(walletTo.address, 0, 1);
    await expect(staking.connect(walletTo).depositStable(2))
      .to.emit(staking, "DepositStable")
      .withArgs(walletTo.address, 0, 2);

    expect(
      await staking.connect(walletTo).getPendingSpeed(walletTo.address)
    ).to.equal(0);

    await expect(staking.connect(walletTo).depositHorseInStable(1, 2))
      .to.emit(staking, "DepositHorseInStable")
      .withArgs(walletTo.address, 1, 100, 2);

    expect((await staking.userInfo(walletTo.address)).amount).to.equal(200);
    expect(await staking.getPendingSpeed(walletTo.address)).to.equal(0);

    startBlock = await waffle.provider.getBlock("latest");
    console.log("start block ", startBlock.number);
    moveBlock(1);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    await expect(staking.connect(walletTo).withdrawHorseInStable(1, 2))
      .to.emit(staking, "WithdrawHorseInStable")
      .withArgs(walletTo.address, 1, 100, 2);

    endBlock = await waffle.provider.getBlock("latest");
    console.log("end block ", endBlock.number);
    console.log(
      "Speed balance ",
      ethers.utils.formatEther(await speed.balanceOf(walletTo.address))
    );

    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    console.log(
      "------------------------------------------------------------------"
    );
    await expect(staking.connect(walletTo).depositHorseInStable(2, 2))
      .to.emit(staking, "DepositHorseInStable")
      .withArgs(walletTo.address, 2, 100, 2);

    expect((await staking.userInfo(walletTo.address)).amount).to.equal(200);
    expect(await staking.getPendingSpeed(walletTo.address)).to.equal(0);

    startBlock = await waffle.provider.getBlock("latest");
    console.log("start block ", startBlock.number);
    moveBlock(1);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    await expect(staking.connect(walletTo).withdrawStable(1))
      .to.emit(staking, "WithdrawStable")
      .withArgs(walletTo.address, 1);

    endBlock = await waffle.provider.getBlock("latest");
    console.log("end block ", endBlock.number);
    console.log(
      "Speed balance ",
      ethers.utils.formatEther(await speed.balanceOf(walletTo.address))
    );
    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );
    moveBlock(1);

    await expect(staking.connect(walletTo).withdrawStable(2))
      .to.emit(staking, "WithdrawStable")
      .withArgs(walletTo.address, 2);
    console.log(
      "Speed balance ",
      ethers.utils.formatEther(await speed.balanceOf(walletTo.address))
    );
    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );
    await facility.mintFacility(walletTo.address, "", 3, 200, 16);
    console.log(
      "------------------------------------------------------------------"
    );
    await expect(staking.connect(walletTo).depositFacility(3))
      .to.emit(staking, "DepositFacility")
      .withArgs(walletTo.address, 3, 200);
    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );
    moveBlock(1);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );
    await expect(staking.connect(walletTo).withdrawFacility(3))
      .to.emit(staking, "WithdrawFacility")
      .withArgs(walletTo.address, 3, 200);
    console.log(
      "Speed balance ",
      ethers.utils.formatEther(await speed.balanceOf(walletTo.address))
    );
    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );
    moveBlock(1);
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );
    console.log(
      "------------------------------------------------------------------"
    );
    await horse
      .connect(walletTo)
      .mint(walletTo.address, "api/data/3", 3, 100, 20000);

    await expect(staking.connect(walletTo).depositHorse(3))
      .to.emit(staking, "DepositHorse")
      .withArgs(walletTo.address, 100, 3);

    moveBlock(100);
    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );
    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );
    await staking.connect(walletTo).withdrawHorse(3);

    await expect(staking.connect(walletTo).depositHorse(3)).to.emit(
      staking,
      "DepositHorse"
    );

    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );
    await staking.connect(walletTo).withdrawHorse(3);

    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );

    await horse
      .connect(walletTo)
      .mint(walletTo.address, "api/data/4", 4, 100, 20);

    await expect(staking.connect(walletTo).depositHorse(4))
      .to.emit(staking, "DepositHorse")
      .withArgs(walletTo.address, 100, 4);

    console.log(
      "popularity ",
      (await staking.userInfo(walletTo.address)).amount.toNumber()
    );

    await staking.connect(walletTo).withdrawHorse(4);

    console.log(
      "Pending ",
      ethers.utils.formatEther(
        await staking.connect(walletTo).getPendingSpeed(walletTo.address)
      )
    );

    // TODO Stake and expire horse
    // TODO Create emergency withdraw
  });

  // it("Stake stable", async () => {

  //   await facility.mintStable(walletTo.address, "api/data/1", 1, 2, 4);
  //   await facility.mintStable(walletTo.address, "api/data/2", 2, 2, 4);

  //   await facility.connect(walletTo).setApprovalForAll(staking.address, true);
  //   //  deposit
  //   await expect(staking.connect(walletTo).depositStable(1))
  //     .to.emit(staking, "DepositStable")
  //     .withArgs(walletTo.address, 0, 1);
  //   await expect(staking.connect(walletTo).depositStable(2))
  //     .to.emit(staking, "DepositStable")
  //     .withArgs(walletTo.address, 0, 2);
  //   expect(await facility.ownerOf(1)).to.equal(staking.address);
  //   expect(await facility.ownerOf(2)).to.equal(staking.address);
  //   // withdraw
  //   await expect(staking.connect(walletTo).withdrawStable(1))
  //     .to.emit(staking, "WithdrawStable")
  //     .withArgs(walletTo.address, 1);
  //   // await expect(staking.connect(walletTo).withdrawStable(2))
  //   //   .to.emit(staking, "WithdrawStable")
  //   //   .withArgs(walletTo.address,2);

  // await horse
  //   .connect(walletTo)
  //   .mint(walletTo.address, "api/data/1", 1, 100, 3000000);
  // await horse.connect(walletTo).setApprovalForAll(staking.address, true);

  //   await expect(staking.connect(walletTo).depositHorseInStable(2, 1))
  //     .to.emit(staking, "DepositHorseInStable")
  //     .withArgs(walletTo.address, 2, 100, 1);

  //   const tx = await staking.getHorseInStable(walletTo.address, 2);
  //   expect(tx[0][0]).to.equal(1);
  // });

  // it("Stake stable then stake 2 horse", async () => {
  //   await facility.mintStable(walletTo.address, "api/data/1", 1, 2, 4);
  //   await facility.connect(walletTo).setApprovalForAll(staking.address, true);
  //   await expect(staking.connect(walletTo).depositStable(1))
  //     .to.emit(staking, "DepositStable")
  //     .withArgs(walletTo.address, 0, 1);
  //   expect(await facility.ownerOf(1)).to.equal(staking.address);

  //   await horse
  //     .connect(walletTo)
  //     .mint(walletTo.address, "api/data/1", 1, 100, 3000000);
  //   await horse
  //     .connect(walletTo)
  //     .mint(walletTo.address, "api/data/1", 2, 100, 3000000);
  //   await horse
  //     .connect(walletTo)
  //     .mint(walletTo.address, "api/data/1", 3, 100, 3000000);

  //   await horse.connect(walletTo).setApprovalForAll(staking.address, true);

  //   await expect(staking.connect(walletTo).depositHorseInStable(1, 1))
  //     .to.emit(staking, "DepositHorseInStable")
  //     .withArgs(walletTo.address, 1, 100, 1);

  //   await expect(staking.connect(walletTo).depositHorseInStable(1, 2))
  //     .to.emit(staking, "DepositHorseInStable")
  //     .withArgs(walletTo.address, 1, 100, 2);

  //   var horses = await staking
  //     .connect(walletTo)
  //     .getHorseInStable(walletTo.address, 1);

  //   expect(horses[0][0]).to.equal(1);
  //   expect(horses[1][0]).to.equal(2);

  //   await expect(staking.connect(walletTo).withdrawHorseInStable(1, 1))
  //     .to.emit(staking, "WithdrawHorseInStable")
  //     .withArgs(walletTo.address, 1, 100, 1);

  //   horses = await staking
  //     .connect(walletTo)
  //     .getHorseInStable(walletTo.address, 1);
  //   expect(horses[0][0]).to.equal(2);
  //   expect(horses[1][0]).to.equal(0);

  //   await expect(staking.connect(walletTo).depositHorseInStable(1, 3))
  //     .to.emit(staking, "DepositHorseInStable")
  //     .withArgs(walletTo.address, 1, 100, 3);

  //   horses = await staking
  //     .connect(walletTo)
  //     .getHorseInStable(walletTo.address, 1);
  //     expect(horses[0][0]).to.equal(2);
  //     expect(horses[1][0]).to.equal(3);

  //   await expect(staking.connect(walletTo).withdrawHorseInStable(1, 2))
  //     .to.emit(staking, "WithdrawHorseInStable")
  //     .withArgs(walletTo.address, 1, 100, 2);

  //   horses = await staking
  //     .connect(walletTo)
  //     .getHorseInStable(walletTo.address, 1);

  //     expect(horses[0][0]).to.equal(3);
  //     expect(horses[1][0]).to.equal(0);
  // });

  // it("TokenHorse deployed", async () => {
  //   expect(await horse.balanceOf(wallet.address)).to.equal(0);
  // });

  // it("Mint Horse", async () => {
  //   await horse.mint(walletTo.address, "api/data/1", 1, 230, 1000000);
  //   expect(await horse.balanceOf(walletTo.address)).to.equal(1);
  // });

  // it("Staking Facility", async () => {
  //   await facility.mintFacility(walletTo.address, "api/data/1", 1, 200, 2);
  //   expect(await facility.balanceOf(walletTo.address)).to.equal(1);
  //   await facility.connect(walletTo).setApprovalForAll(staking.address, true);

  //   await expect(staking.connect(walletTo).depositFacility(1))
  //     .to.emit(staking, "DepositFacility")
  //     .withArgs(walletTo.address, 0, 1);
  //   expect(await facility.ownerOf(1)).to.equal(staking.address);
  //   await staking.connect(walletTo).withdrawFacility(1);
  //   expect(await facility.balanceOf(walletTo.address)).to.equal(1);
  // });

  // it("Staking Stable", async () => {
  //   await facility.mintStable(walletTo.address, "api/data/1", 1, 2, 4);
  //   await facility.mintStable(walletTo.address, "api/data/1", 2, 2, 4);
  //   expect(await facility.balanceOf(walletTo.address)).to.equal(2);
  //   await facility.connect(walletTo).setApprovalForAll(staking.address, true);
  //   await expect(staking.connect(walletTo).depositStable(1))
  //     .to.emit(staking, "DepositStable")
  //     .withArgs(walletTo.address, 0, 1);
  //   await expect(staking.connect(walletTo).depositStable(2))
  //     .to.emit(staking, "DepositStable")
  //     .withArgs(walletTo.address, 0, 2);

  //   expect(await facility.ownerOf(1)).to.equal(staking.address);
  //   expect(await facility.ownerOf(2)).to.equal(staking.address);

  //   await staking.connect(walletTo).withdrawStable(1);
  //   await staking.connect(walletTo).withdrawStable(2);
  //   expect(await facility.balanceOf(walletTo.address)).to.equal(2);
  // });

  // it("Staking Horse", async () => {
  //   await horse.mint(
  //     walletTo.address,
  //     "api/data/4",
  //     4,
  //     230,
  //     waffle.provider.blockNumber + 1000000
  //   );
  //   console.log(await horse.ownerOf(4));
  //   expect(await horse.balanceOf(walletTo.address)).to.equal(1);
  //   await horse.connect(walletTo).setApprovalForAll(staking.address, true);
  //   expect(await horse.getPopularity(1)).to.equal(230);
  //   await expect(staking.connect(walletTo).depositHorse(4))
  //     .to.emit(staking, "DepositHorse")
  //     .withArgs(walletTo.address, 230, 4);
  //   console.log(await horse.ownerOf(4));
  //   expect(await horse.balanceOf(walletTo.address)).to.equal(0);
  //   await staking.connect(walletTo).withdrawHorse(4);
  //   expect(await horse.balanceOf(walletTo.address)).to.equal(1);
  // });

  // it("Staking Horse in stable receive reward", async () => {

  //   const {time} = require("@openzeppelin/test-helpers");
  //   console.log(await waffle.provider.getBlockNumber());
  //   await horse.mint(
  //     walletTo.address,
  //     "api/data/1",
  //     1,
  //     100,
  //     3
  //   );

  //   await horse.connect(walletTo).setApprovalForAll(staking.address, true);
  //   console.log(await waffle.provider.getBlockNumber());
  //   await expect(staking.connect(walletTo).depositHorse(1))
  //     .to.emit(staking, "DepositHorse")
  //     .withArgs(walletTo.address, 100, 1);

  //   const { amount } = await staking.userInfo(walletTo.address);
  //   let pending = await staking.pendingSpeed(walletTo.address);

  //   console.log(await waffle.provider.getBlockNumber());

  //   await waffle.provider.send("evm_mine",[1943686765]);

  //   console.log(await waffle.provider.getBlockNumber());

  //   pending = await staking.pendingSpeed(walletTo.address);
  //   console.log(utils.formatEther(pending));

  //   await staking.connect(walletTo).withdrawHorse(1);

  //   expect(await speed.balanceOf(walletTo.address)).to.be.equal(24);
  // });

  // it("Staking 2 Horse receive reward", async () => {
  //   await horse.mint(
  //     walletTo.address,
  //     "api/data/1",
  //     1,
  //     100,
  //     3
  //   );

  //   await horse.mint(
  //     walletTo.address,
  //     "api/data/2",
  //     2,
  //     100,
  //     3
  //   );

  //   await horse.mint(
  //     walletTo.address,
  //     "api/data/3",
  //     3,
  //     100,
  //     10
  //   );

  //   const block =  await waffle.provider.getBlock("latest");
  //  console.log("Block ",block.timestamp);

  //   await horse.connect(walletTo).setApprovalForAll(staking.address, true);
  //   console.log(await waffle.provider.getBlockNumber());
  //   await expect(staking.connect(walletTo).depositHorse(1))
  //     .to.emit(staking, "DepositHorse")
  //     .withArgs(walletTo.address, 100, 1);

  //   let pending = await staking.pendingSpeed(walletTo.address);

  //   console.log(await waffle.provider.getBlockNumber());

  //   console.log("//----------------------------------");
  //   await waffle.provider.send("evm_mine",[block.timestamp + 36000]);
  //   await expect(staking.connect(walletTo).depositHorse(2))
  //   .to.emit(staking, "DepositHorse")
  //   .withArgs(walletTo.address, 20, 2);
  //   console.log("//----------------------------------");
  //   await expect(staking.connect(walletTo).depositHorse(3))
  //   .to.emit(staking, "DepositHorse")
  //   .withArgs(walletTo.address, 100, 3);

  //   console.log(await waffle.provider.getBlockNumber());

  //   pending = await staking.pendingSpeed(walletTo.address);
  //   console.log(utils.formatEther(pending));

  //   await staking.connect(walletTo).withdrawHorse(1);

  //   expect(await speed.balanceOf(walletTo.address)).to.be.equal(24);
  // });

  // it("Staking Horse receive reward", async () => {

  //   const {time} = require("@openzeppelin/test-helpers");
  //   console.log(await waffle.provider.getBlockNumber());
  //   await horse.mint(
  //     walletTo.address,
  //     "api/data/1",
  //     1,
  //     100,
  //     3
  //   );

  //   await horse.connect(walletTo).setApprovalForAll(staking.address, true);
  //   console.log(await waffle.provider.getBlockNumber());
  //   await expect(staking.connect(walletTo).depositHorse(1))
  //     .to.emit(staking, "DepositHorse")
  //     .withArgs(walletTo.address, 100, 1);

  //   const { amount } = await staking.userInfo(walletTo.address);
  //   let pending = await staking.pendingSpeed(walletTo.address);

  //   console.log(await waffle.provider.getBlockNumber());

  //   await waffle.provider.send("evm_mine",[1943686765]);

  //   console.log(await waffle.provider.getBlockNumber());

  //   pending = await staking.pendingSpeed(walletTo.address);
  //   console.log(utils.formatEther(pending));

  //   await staking.connect(walletTo).withdrawHorse(1);

  //   // expect(await speed.balanceOf(walletTo.address)).to.be.equal(24);
  // });
});
