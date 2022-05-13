//https://eth-ropsten.alchemyapi.io/v2/ewNdP3a6xFou1Cb95gyhLIJxbtZf90bH

require("@nomiclabs/hardhat-waffle");

module.exports = {
    defaultNetwork: "ropsten",
    solidity: '0.8.0',
    networks: {
        ropsten: {
            url: 'https://eth-ropsten.alchemyapi.io/v2/ewNdP3a6xFou1Cb95gyhLIJxbtZf90bH',
            accounts: ['62f79f17bfd6457662fb2ce1eeef729b291ca91e69f0f7b4efe485e6351b9a06']
        }
    }
}