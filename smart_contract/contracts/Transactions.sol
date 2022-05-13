//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCounter;

    event transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver,uint amount,string memory message,string memory keyword ) public {
        
        transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));
        transactionCounter += 1;
        emit transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
    }

    function getAllTransaction()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCounter;
    }
}
