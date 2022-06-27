// Elevator
// Difficulty 4/10

// This elevator won't let you reach the top of your building. Right?

// Things that might help:
// Sometimes solidity is not good at keeping promises.
// This Elevator expects to be used from a Building.

// ---- Solution ---- //
// elevatorSol

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Building {
    function isLastFloor(uint256) external returns (bool);
}

contract Elevator {
    bool public top;
    uint256 public floor;

    function goTo(uint256 _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}
