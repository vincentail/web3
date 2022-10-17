const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function() {
    it("Should return the new greeting once it's changed", async function() {
        const OpenOraclePriceData = await ethers.getContractFactory("OpenOraclePriceData");
        const openOraclePriceData = await OpenOraclePriceData.deploy();
        await openOraclePriceData.deployed();

        const setGreetingTx = await openOraclePriceData.put('hi', '123');

        // wait until the transaction is mined
        await setGreetingTx.wait();
    });
});