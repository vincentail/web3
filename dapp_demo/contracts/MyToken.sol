//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MyToken {
    string public name = "MyToken";
    uint256 totalSupply;
    mapping(address => uint256) balances;

    /**
      1：provide tranfer function
      2:check balance
     */

    event tranferSuccess(address from, address toAddress, uint256 amount);

    constructor(uint256 _totalSupply) {
        totalSupply = _totalSupply;
        balances[msg.sender] = totalSupply;
    }

    function transferAmount(address toAddress, uint256 amount)  public {
        require(balances[msg.sender] >= amount);

        balances[msg.sender] -= amount;
        balances[toAddress] += amount;

        emit tranferSuccess(msg.sender, toAddress, amount);
    }

    function balanceOf(address toAddress) public view returns (uint256) {
        return balances[toAddress];
    }
}
