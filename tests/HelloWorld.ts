import { expect } from "chai";
import { ethers } from "hardhat";
import { HelloWorld } from "../typechain-types";

describe("Hello World", () => {
  let helloWorldContract: HelloWorld;

  beforeEach(async () => {
    const helloWorldContractFactory = await ethers.getContractFactory(
      "HelloWorld"
    );
    helloWorldContract = await helloWorldContractFactory.deploy();
    await helloWorldContract.deployed();
  });

  it("Should return Hello World!", async () => {
    const text = await helloWorldContract.helloWorld();
    expect(text).to.eq("Hello World!");
  });

  it("Should set owner to deployer account", async () => {
    const signers = await ethers.getSigners();
    const deployerAccount = signers[0];
    const owner = await helloWorldContract.owner();
    console.log(deployerAccount.address);
    expect(owner).to.eq(deployerAccount.address);
  });

  it("Should not allow anyone other than owner to call transferOwnership", async () => {
    const signers = await ethers.getSigners();
    await expect(
      helloWorldContract
        .connect(signers[1])
        .transferOwnership(signers[1].address)
    ).to.be.revertedWith("Caller is not the owner");
  });
});
