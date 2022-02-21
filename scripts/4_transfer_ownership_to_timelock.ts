// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades, network } from "hardhat";
import {Staking,Shop,Timelock} from './../types'
import fs from "fs";

async function main() {
 
  const [deployer] = await ethers.getSigners();
  const TimelockContract = await ethers.getContractFactory("Timelock")
  const timelock:Timelock = (await TimelockContract.attach("")) as Timelock
  await timelock.deployed();

  const StakingContract  = await ethers.getContractFactory("Staking");
  const staking:Staking = (await StakingContract.attach("")) as Staking;

  await staking.transferOwnership(timelock.address)
  console.log("Staking transferOwnership done ",await staking.owner());

  const ShopContract  = await ethers.getContractFactory("Shop");
  const shop:Shop = (await ShopContract.attach("")) as Shop;

  await shop.transferOwnership(timelock.address)
  console.log("Shop transferOwnership done ",await shop.owner());
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
