import hre, { ethers, upgrades, waffle } from "hardhat";
import { expect } from "chai";
import { Contract, utils } from "ethers";
import {Horse,SwapHorse} from "./../types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("SwapHorse" ,async()=>{

    let wallet: SignerWithAddress;
    let walletTo: SignerWithAddress;
    let horse:Horse;
    let swapHorse:SwapHorse;


    beforeEach(async ()=>{
        [wallet, walletTo] = await ethers.getSigners();
        const HorseContract = await ethers.getContractFactory("Horse");
        horse = (await HorseContract.deploy("Horse Old","H")) as Horse;
        await horse.deployed();

        await horse.setMinter(walletTo.address, true);

        const SwapHorseContract = await ethers.getContractFactory("SwapHorse");
        swapHorse = (await SwapHorseContract.deploy(horse.address)) as SwapHorse;

    })

    it("turn horse",async ()=>{
        await horse.connect(walletTo).mint(walletTo.address,"/api/1.json",1,100,200000);
        await horse.connect(walletTo).mint(walletTo.address,"/api/2.json",2,100,200000);

        await horse.connect(walletTo).setApprovalForAll(swapHorse.address,true);

        await expect(swapHorse.connect(walletTo).swapHorses([1,2]))
        .to.emit(swapHorse, "SwapHorses")
        .withArgs(walletTo.address, [1,2],horse.address );

    });
});