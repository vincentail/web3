const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function() {
    it("myToken deploy", async function() {
        const MyToken = await ethers.getContractFactory("MyToken");
        const myToken = await MyToken.deploy(100);
        await myToken.deployed();
        console.log("deploy address:", myToken.address);
    });
});