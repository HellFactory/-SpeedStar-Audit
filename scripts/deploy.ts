// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades, network,waffle } from "hardhat";
import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // let ContractJSON  = {
  //   pack:"",
  //   stable:"",
  //   shop:""
  // }
  // // // We get the contract to deploy
  // const Pack = await ethers.getContractFactory("Pack");
  // const pack = await Pack.deploy("HorsePack", "HP");
  // await pack.deployed();

  // ContractJSON.pack = pack.address;

  // const stable = await Pack.deploy("StablePack", "SP");
  // await stable.deployed();

  // ContractJSON.stable = pack.stable;

  const Shop = await ethers.getContractFactory("Shop");
  // const shop = await Shop.deploy();
  const shop = await Shop.attach("0xd001f8d83628f569a5d9f994018a555cef38719d");//Dev
  // const shop = await Shop.attach("0x72307574401A1F4E2750a8f8e2c03C94AD97665F");//Prod
//  const tx  =  await shop.claimToken();
//  await tx.wait();
//  console.log(tx)

  // const oneRate = await shop.getONERate();
  // console.log("Shop address ",shop.address)

  // console.log(`One rate ${ethers.utils.formatEther(oneRate)}`)
  // await shop.deployed();
  // console.log("Shop deployed to:", shop.address);

  // await shop.setPriceFeed(`0xdCD81FbbD6c4572A69a534D8b8152c562dA8AbEF`);//Main net
  // await shop.setPriceFeed(`0x8A753747A1Fa494EC906cE90E9f37563A8AF630e`);//Rinkeby
  await shop.setPriceFeed(`0xcEe686F89bc0dABAd95AEAAC980aE1d97A075FAD`);//Test net 0x104f41eacA5A333698E0CB97F481051A91cbBce4
  // ContractJSON.shop = shop.stable;

  // const jsonString = JSON.stringify(ContractJSON, null, 2);
  // console.log(jsonString);
  // await fs.writeFileSync(`data/${network.name}_contract.json`, jsonString);
  // console.log("write file done.");
  // let price
  // console.log(`get pack 0 price ${ethers.utils.formatEther(await shop.getPackPrice(0))}`)
  // price = await shop.getPackPrice(1)
  // console.log(`get pack 1 price ${ethers.utils.formatEther(price)}`)
  // await shop.buyPack(1,{value:price})
  // console.log(`get pack 2 price ${ethers.utils.formatEther(await shop.getPackPrice(2))}`)

  // console.log(`get pack 3 price ${ethers.utils.formatEther(await shop.getPackPrice(3))}`)

  // set price
  // await shop.setPackPrice(0, 100);
  // await shop.setPackPrice(1, 300);
  // await shop.setPackPrice(2, 900);
  // await shop.setPackPrice(3, 1800);

  await shop.setPackPrice(0, 1);
  await shop.setPackPrice(1, 1);
  await shop.setPackPrice(2, 1);
  await shop.setPackPrice(3, 1);

  // // // set avaliable
  await shop.setPackAvaliable(0, 2945);//3965
  await shop.setPackAvaliable(1, 4384);//5884
  await shop.setPackAvaliable(2, 567);
  await shop.setPackAvaliable(3, 234);
  // // // // set open sale
  await shop.setOpenSale(true);

  // console.log("Stable deployed to:", stable.address);
  // console.log("Pack deployed to:", pack.address);
  console.log("Done.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
