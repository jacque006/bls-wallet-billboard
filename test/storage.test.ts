import { expect } from "chai";
import { ethers } from "hardhat";

describe("Storage", function () {
  it("Basic usage", async function () {
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.deployed();

    expect((await storage.slot()).toNumber()).to.eq(0);

    const [signer] = await ethers.getSigners();

    const newValue = 987;
    const tx = await storage.connect(signer).setSlot(newValue);
    await tx.wait();

    expect((await storage.slot()).toNumber()).to.eq(newValue);
  });
});
