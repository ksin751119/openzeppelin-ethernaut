// Vault
// Difficulty 3/10

// Unlock the vault to pass the level!

// ---- Solution ---- //
// Get the last byte32 of input data
// Contract Creation Code and read the last 32 bytes (64 characters of the bytecode)
// https://stackoverflow.com/questions/71967135/decode-constructor-arguments-in-solidity




// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Vault {
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) public {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}
