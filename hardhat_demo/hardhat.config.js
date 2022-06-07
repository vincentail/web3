require("@nomiclabs/hardhat-waffle")

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


module.exports = {
    defaultNetwork: "goerli",
    solidity: "0.8.14",
    networks: {
        ropsten: {
            url: "https://eth-ropsten.alchemyapi.io/v2/ewNdP3a6xFou1Cb95gyhLIJxbtZf90bH",
            // from: "5da92087fff4ccb6206557d411d80a17e34aefcf32af615e69c4085ff6f1efcd",
            //private key
            accounts: ["5da92087fff4ccb6206557d411d80a17e34aefcf32af615e69c4085ff6f1efcd"]
                // blockGasLimit: 3000000000,
                // gasPrice: 3000000000
                // gasPrice: 10
        },
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/2cd0aa69e0ea46798346a9bfae4e771f",
            accounts: ["5da92087fff4ccb6206557d411d80a17e34aefcf32af615e69c4085ff6f1efcd"]
        },
        goerli: {
            url: "https://goerli.infura.io/v3/2cd0aa69e0ea46798346a9bfae4e771f",
            accounts: ["5da92087fff4ccb6206557d411d80a17e34aefcf32af615e69c4085ff6f1efcd"],
            gas: 100000
        }
    }
};