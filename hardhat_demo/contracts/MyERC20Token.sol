// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20Token is ERC20 {
    uint256 private initialSupply = 10000;

    constructor() ERC20("MyERC20Token", "MET") {
        _mint(msg.sender, initialSupply);
    }
}
