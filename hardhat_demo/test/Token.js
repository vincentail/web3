const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isTypedArray } = require("util/types");

describe("MyERC20Token", function() {
    it("Deployment should assign the total supply of tokens to the owner", async function() {
        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("MyERC20Token");

        //启动部署
        const hardhatToken = await Token.deploy();
        //部署阻塞直到完成
        await hardhatToken.deployed();

        console.log("deployed to:", hardhatToken.address)

        const ownerBalance = await hardhatToken.balanceOf(owner.getAddress());
        console.log("address :" + owner.address + " balance:" + ownerBalance);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});


// describe("Transaction", () => {
//     it("should transfer tokens between accounts", async function() {
//         const [owner, addr1, addr2] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy();

//         await hardhatToken.deployed();

//         await hardhatToken.transfer(await addr1.getAddress(), 50);

//         expect(await hardhatToken.balanceOf(await addr1.getAddress())).to.equal(50);

//         await hardhatToken.transfer(await addr2.getAddress(), 50);

//         expect(await hardhatToken.balanceOf(await addr2.getAddress())).to.equal(50);


//     });
// });


// describe("Token contract", () => {

//     let Token;
//     let harhatToken;
//     let owner;
//     let addr1;
//     let addr2;
//     let addrs;

//     beforeEach(async function() {

//         Token = await ethers.getContractFactory("Token");
//         [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

//         harhatToken = await Token.deploy();

//         await harhatToken.deployed();
//     });

//     describe("Deployment", () => {
//         it("should set the right owner", async function() {
//             expect(await harhatToken.owner()).to.equal(await owner.getAddress());
//         });

//         it("shoud assign the total supply of tokens to the owner", async function() {
//             const ownerBalance = await harhatToken.balanceOf(await owner.getAddress());
//             expect(await harhatToken.totalSupply()).to.equal(ownerBalance);
//         });
//     });


//     describe("Transaction", function() {
//         it("should transfer tokens between accounts", async function() {
//             await harhatToken.transfer(await addr1.getAddress(), 50);
//             const addr1Balance = await harhatToken.balanceOf(await addr1.getAddress());

//             expect(addr1Balance).to.equal(50);
//             // Transfer 50 tokens from addr1 to addr2
//             // We use .connect(signer) to send a transaction from another account
//             await harhatToken.connect(addr1).transfer(await addr2.getAddress(), 50);
//             const addr2Balance = await harhatToken.balanceOf(
//                 await addr2.getAddress()
//             );
//             expect(addr2Balance).to.equal(50);
//         });

//         it("should fail if sender doesn't have enough tokens", async function() {
//             const initOwnerBalance = await harhatToken.balanceOf(await owner.getAddress());
//             await expect(harhatToken.connect(addr1).transfer(await owner.getAddress(), 1)).to.be.revertedWith("Not enough token");

//             expect(await harhatToken.balanceOf(await owner.getAddress())).to.equal(initOwnerBalance);
//         });

//         it("Should update balances after transfers", async function() {
//             const initialOwnerBalance = await harhatToken.balanceOf(
//                 await owner.getAddress()
//             );

//             // Transfer 100 tokens from owner to addr1.
//             await harhatToken.transfer(await addr1.getAddress(), 100);

//             // Transfer another 50 tokens from owner to addr2.
//             await harhatToken.transfer(await addr2.getAddress(), 50);

//             // Check balances.
//             const finalOwnerBalance = await harhatToken.balanceOf(
//                 await owner.getAddress()
//             );
//             expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

//             const addr1Balance = await harhatToken.balanceOf(
//                 await addr1.getAddress()
//             );
//             expect(addr1Balance).to.equal(100);

//             const addr2Balance = await harhatToken.balanceOf(
//                 await addr2.getAddress()
//             );
//             expect(addr2Balance).to.equal(50);
//         });
//     });
// });


// describe("My erc20 token", () => {

//     let MyERC20Token;
//     let harhatToken;

//     beforeEach(async function() {

//         MyERC20Token = await ethers.getContractFactory("MyERC20Token");

//         harhatToken = await MyERC20Token.deploy();

//         await harhatToken.deployed();
//     });

//     describe("Deployment", () => {
//         it("should set the right owner", async function() {
//             expect(await harhatToken.totalSupply()).to.equal(1000);
//         });
//     });
// });