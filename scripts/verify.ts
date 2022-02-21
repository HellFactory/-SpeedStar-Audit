import * as hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const SpeedToken = "0xa14dE1F8c9cFcd9e06731E03c1e8265692a9D0e7";
  const StarToken = "0x038891d65c254E1D31b784cD5A6B7FC132FC30Ce";
  const Horse = "0x6FB0fAd3d6055d63F9ea5A1896DE5AAbAA211288";
  const Facility = "0x83550B918E5B9f74eaF1E429c0BB010511AE406b";
  // Swap
  await hre.run("verify:verify", {
    address: "0xe241725B597D381debe142a05404BF9F952F9054",
    contract: "contracts/farm/Staking.sol:Staking",
    constructorArguments: [
      SpeedToken,
      StarToken,
      Horse,
      Facility,
      hre.ethers.utils.parseEther("80"),
      0
    ]
  });
  // await hre.run("verify:verify", {
  //   address: "0xf85775044CFFd51147014f9f5dCD90d32cdf3159",
  //   contract: "contracts/Shop.sol:Shop",
  //   constructorArguments: []
  // }); 
  // await hre.run("verify:verify", {
  //   address: "0x6FB0fAd3d6055d63F9ea5A1896DE5AAbAA211288",
  //   contract: "contracts/Horse.sol:Horse",
  //   constructorArguments: ["Horse", "SSH"]
  // });
  // await hre.run("verify:verify", {
  //   address: "0x83550B918E5B9f74eaF1E429c0BB010511AE406b",
  //   contract: "contracts/Facility.sol:Facility",
  //   constructorArguments: ["Facilities", "SSF"]
  // });

    // await hre.run("verify:verify", {
    // address: "0x038891d65c254E1D31b784cD5A6B7FC132FC30Ce",
    // contract: "contracts/tokens/Star.sol:Star",
    // constructorArguments: []
  // });

  //  await hre.run("verify:verify", {
  //   address: "0x4642C6E8358F5c2b43db4C22F183eD14fD7E6c7d",
  //   contract: "contracts/SwapHorse.sol:SwapHorse",
  //   constructorArguments: ["0xD7cAA5C20D14D4B7945E605c31A4EC6162340009"]
  // });
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
