//https://eth-ropsten.alchemyapi.io/v2/ewNdP3a6xFou1Cb95gyhLIJxbtZf90bH

require("@nomiclabs/hardhat-waffle");

module.exports = {
    defaultNetwork: "kovan",
    solidity: '0.8.0',
    networks: {
        kovan: {
            url: 'https://kovan.infura.io/v3/2cd0aa69e0ea46798346a9bfae4e771f',
            accounts: ['5ac71b08416f0f480a358500c33759ae295089a5ca6c6618fa6bac06ed76f60a']
        }
    }
}