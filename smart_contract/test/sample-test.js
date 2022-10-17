const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function() {
    // it("Should return the new greeting once it's changed", async function() {
    //     const Greeter = await ethers.getContractFactory("Greeter");
    //     const greeter = await Greeter.deploy("Hello, world!");
    //     await greeter.deployed();

    //     expect(await greeter.greet()).to.equal("Hello, world!");

    //     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    //     // wait until the transaction is mined
    //     await setGreetingTx.wait();

    //     expect(await greeter.greet()).to.equal("Hola, mundo!");
    // });
    it("sign", async function() {
        let privateKey = "5ac71b08416f0f480a358500c33759ae295089a5ca6c6618fa6bac06ed76f60a";
        let wallet = new ethers.Wallet(privateKey);
        console.log(wallet.address);
        // let msg = ""
        // wallet.s
    });
    it("address", async function() {
        //第一步: 移除公钥前两位04，如果包含0x就是移除四位了，再重新加上0x构造
        let public_key = "0x0361463e05a2fe473bc6c03bcb0b0999e84af8a86ed40cd547fc02923008cb4341";
        let new_key = "0x" + public_key.substring(4)
            //第二步：对上面的结果转化成bytesLike(不能漏)
        let new_bytes = ehters.utils.arrayify(new_key)
            //第三步，keccak_256,得到一个长度为64的哈希值
        new_key = sha3.keccak_256(new_bytes)
            //第四步，取上面结果的最后40位，就得到了全小写的地址。
        let result = "0x" + new_key.substring(24)
            //最后，将地址转换成检验后的地址
        result = utils.getAddress(result)
        console.log("")
        console.log(result)
    })
});