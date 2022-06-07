// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "BT";

    uint256 public totalSupply = 10000000;

    address public owner;

    mapping(address => uint256) balances;

    event transferEvent(address from, address to, uint256 amount);

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough token");
        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit transferEvent(msg.sender, to, amount);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
