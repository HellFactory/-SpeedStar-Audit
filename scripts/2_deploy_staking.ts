// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades, network } from "hardhat";
import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [deployer] = await ethers.getSigners();

  const SpeedToken = "0x5583baFcf507C4805b100d264254983cFC8dbc6c";
  const StarToken = "0xb6A58749B10B7538cdDb6a3A94577c7176E0E10c";
  const Horse = "0x92E725F286f21661E44784A386bd8A591aEA567B";//new horse
  const Facility = "0xbfcE6832FA6E67E81FA4ea155eDea6f04Ab2ed12";
  const StakingAddress = "0xf0d55b41d4c2eb794b82ca6b4c543f03b175bf6d";
  // Rinkeby
  // const SpeedToken = "0xa14dE1F8c9cFcd9e06731E03c1e8265692a9D0e7";
  // const StarToken = "0x038891d65c254E1D31b784cD5A6B7FC132FC30Ce";
  // const Horse = "0x6FB0fAd3d6055d63F9ea5A1896DE5AAbAA211288";//new horse
  // const Facility = "0x83550B918E5B9f74eaF1E429c0BB010511AE406b";
  // const StakingAddress = "0x7757b3735E3998e4bF740318dfe39751AA03EF07";
  // // We get the contract to deploy
  const Staking = await ethers.getContractFactory("Staking");
  // const staking = await Staking.deploy(
  //   SpeedToken,
  //   StarToken,
  //   Horse,
  //   Facility,
  //   ethers.utils.parseEther("80"),
  //   0
  // );
  const staking = await Staking.attach(StakingAddress);
  await staking.deployed();

  const Speed = await ethers.getContractFactory("Speed");
  const speed = await Speed.attach(SpeedToken);
  // await speed.deployed();

  const tx = await speed.mint(staking.address,ethers.utils.parseEther('10000000'));
  await tx.wait();

  // console.log(tx);

  await speed.setAdmin(staking.address, true);

  console.log(await speed.admins(staking.address));

  // // //  const staking = await upgrades.upgradeProxy("0xe3fc199054a806a9b184452cf872f7baa7a63de0",Staking);

  // await staking.deployed();

  console.log("Staking deployed to:", staking.address);

  //  const staking =  await Staking.attach('0x3B561fB716D7812884dC38FF8fC8639AA30A2CF1');
  //  console.log(ethers.utils.formatEther( await staking.poolLength()));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
