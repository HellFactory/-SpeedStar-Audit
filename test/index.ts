import { ethers, upgrades, waffle } from "hardhat";
import { expect } from "chai";
const { Contract, utils } = ethers;

describe("Greeter", async () => {
  
  let horse;
  let facility;
  let staking;
  let speed;
  let star;

  // beforeEach(async () => {
  //   const Horse = await ethers.getContractFactory("Horse");
  //   const Speed = await ethers.getContractFactory("Speed");
  //   const Staking = await ethers.getContractFactory("Staking");
  //   const Star = await ethers.getContractFactory("Star");
  //   const Facility = await ethers.getContractFactory("Facility");
  //   horse = await Horse.deploy("SpeedStar Horse", "SSH");
  //   await horse.deployed();
  //   star = await Star.deploy();
  //   await star.deployed();
  //   facility = await Facility.deploy("SpeedStar Facility", "SSF");
  //   await facility.deployed();
  //   speed = await Speed.deploy();
  //   await speed.deployed();
  //   staking = await upgrades.deployProxy(Staking, [
  //     speed.address,
  //     star.address,
  //     horse.address,
  //     facility.address,
  //     wallet.address,
  //     utils.parseEther("80"),
  //     0
  //   ]);
  //   await staking.deployed();
  //   await speed.setAdmin(staking.address, true);
  // });

  it("Should return the new greeting once it's changed", async function () {
    const accounts = await ethers.getSigners();
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

// describe("Stake", async () => {
//   const [wallet, walletTo] = await ethers.getSigners();
//   let horse: Contract;
//   let facility: Contract;
//   let staking: Contract;
//   let speed: Contract;
//   let star: Contract;

//   beforeEach(async () => {
//     const Horse = await ethers.getContractFactory("Horse");
//     const Speed = await ethers.getContractFactory("Speed");
//     const Staking = await ethers.getContractFactory("Staking");
//     const Star = await ethers.getContractFactory("Star");
//     const Facility = await ethers.getContractFactory("Facility");
//     horse = await Horse.deploy("SpeedStar Horse", "SSH");
//     await horse.deployed();
//     star = await Star.deploy();
//     await star.deployed();
//     facility = await Facility.deploy("SpeedStar Facility", "SSF");
//     await facility.deployed();
//     speed = await Speed.deploy();
//     await speed.deployed();
//     staking = await upgrades.deployProxy(Staking, [
//       speed.address,
//       star.address,
//       horse.address,
//       facility.address,
//       wallet.address,
//       utils.parseEther("80"),
//       0
//     ]);
//     await staking.deployed();
//     await speed.setAdmin(staking.address, true);
//   });

//   it("TokenHorse deployed", async () => {
//     expect(await horse.balanceOf(wallet.address)).to.equal(0);
//   });

//   it("Mint Horse", async () => {
//     await horse.mint(walletTo.address, "api/data/1", 1, 230, 1000000);
//     expect(await horse.balanceOf(walletTo.address)).to.equal(1);
//   });

//   it("Staking Facility", async () => {
//     await facility.mintFacility(walletTo.address, "api/data/1", 1, 200);
//     expect(await facility.balanceOf(walletTo.address)).to.equal(1);
//     await facility.connect(walletTo).setApprovalForAll(staking.address, true);

//     await expect(staking.connect(walletTo).depositFacility(1))
//       .to.emit(staking, "DepositFacility")
//       .withArgs(walletTo.address, 0, 1);
//     expect(await facility.ownerOf(1)).to.equal(staking.address);
//     await staking.connect(walletTo).withdrawFacility(1);
//     expect(await facility.balanceOf(walletTo.address)).to.equal(1);
//   });

//   it("Staking Stable", async () => {
//     await facility.mintStable(walletTo.address, "api/data/1", 1, 2);
//     await facility.mintStable(walletTo.address, "api/data/1", 2, 2);
//     expect(await facility.balanceOf(walletTo.address)).to.equal(2);
//     await facility.connect(walletTo).setApprovalForAll(staking.address, true);
//     await expect(staking.connect(walletTo).depositStable(1))
//       .to.emit(staking, "DepositStable")
//       .withArgs(walletTo.address, 0, 1);
//     await expect(staking.connect(walletTo).depositStable(2))
//       .to.emit(staking, "DepositStable")
//       .withArgs(walletTo.address, 0, 2);

//     expect(await facility.ownerOf(1)).to.equal(staking.address);
//     expect(await facility.ownerOf(2)).to.equal(staking.address);

//     await staking.connect(walletTo).withdrawStable(1);
//     await staking.connect(walletTo).withdrawStable(2);
//     expect(await facility.balanceOf(walletTo.address)).to.equal(2);
//   });

//   it("Staking Horse", async () => {
//     await horse.mint(
//       walletTo.address,
//       "api/data/1",
//       1,
//       230,
//       waffle.provider.blockNumber + 1000000
//     );
//     expect(await horse.balanceOf(walletTo.address)).to.equal(1);
//     await horse.connect(walletTo).setApprovalForAll(staking.address, true);
//     expect(await horse.getPopularity(1)).to.equal(230);
//     await expect(staking.connect(walletTo).depositHorse(1))
//       .to.emit(staking, "DepositHorse")
//       .withArgs(walletTo.address, 0, 230, 1);
//     expect(await horse.balanceOf(walletTo.address)).to.equal(0);
//     await staking.connect(walletTo).withdrawHorse(1);
//     expect(await horse.balanceOf(walletTo.address)).to.equal(1);
//   });

//   it("Staking Horse receive reward", async () => {
//     await horse.mint(
//       walletTo.address,
//       "api/data/1",
//       1,
//       230,
//       waffle.provider.blockNumber + 1000000
//     );

//     await horse.connect(walletTo).setApprovalForAll(staking.address, true);
//     await expect(staking.connect(walletTo).depositHorse(1))
//       .to.emit(staking, "DepositHorse")
//       .withArgs(walletTo.address, 0, 230, 1);

//     const { amount } = await staking.userInfo(walletTo.address);
//     console.log(ethers.utils.formatUnits(amount, "wei"));
//     // const days = 1 * 24 * 60 * 60;
//     // await ethers.provider.send('evm_increaseTime', [days]);
//     // await ethers.provider.send('evm_mine',[3600]);

//     await staking.connect(walletTo).withdrawHorse(1);
//   });
// });
