// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades,network } from "hardhat";
import fs from "fs";


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // // We get the contract to deploy
  const Horse = await ethers.getContractFactory("Horse");
  // const horse = await Horse.deploy("Horse", "SSH");
  const horse = await Horse.attach('0x92E725F286f21661E44784A386bd8A591aEA567B');
  // const owner = await horse.ownerOf('9164');
  // 296
  // 3774
  // 9164
  // console.log(`Onwer ${owner}`);
  await horse.deployed();
  await horse.setMinter("0xCB950adCa1d67749486D65311Aba5efdA8351bD3",true);
  

  // const Facility = await ethers.getContractFactory("Facility");
  // const facilities = await Facility.deploy("Facilities", "SSF");
  // await facilities.deployed();

  // console.log("Horse deployed to:", horse.address);
  // console.log("Facilities deployed to:", facilities.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
