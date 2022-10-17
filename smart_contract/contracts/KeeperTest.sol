//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract KeeperTest {
    uint256 transactionCounter;
    uint256 counter;

    function increment(uint256 countSize) public {
        require(countSize > 0, "countSize must more than zero");
        counter += countSize;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }
}
