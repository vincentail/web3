const { ethers } = require("hardhat")

const main = async() => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the account:", await deployer.getAddress());

    console.log("account balance:", (await deployer.getBalance()).toString());

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    await token.deployed();

    console.log("token deployed to:", token.address);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
})