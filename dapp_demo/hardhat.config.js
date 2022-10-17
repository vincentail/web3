require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "kovan",
    solidity: "0.8.7",
    networks: {
        goerli: {
            url: "https://eth-goerli.alchemyapi.io/v2/ZdlrULAQPEnvUTcyZFM-h5-3YLHX0UHx",
            accounts: ["5ac71b08416f0f480a358500c33759ae295089a5ca6c6618fa6bac06ed76f60a"]
        },
        kovan: {
            url: "https://kovan.infura.io/v3/2cd0aa69e0ea46798346a9bfae4e771f",
            accounts: ["5ac71b08416f0f480a358500c33759ae295089a5ca6c6618fa6bac06ed76f60a"]
        }
    }
};