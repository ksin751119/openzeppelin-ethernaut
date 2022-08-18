// Privacy
// Difficulty 8/10

// The creator of this contract was careful enough to protect the sensitive areas of its storage.

// Unlock this contract to beat the level.

// Things that might help:

// Understanding how storage works
// Understanding how parameter parsing works
// Understanding how casting works
// Tips:

// Remember that metamask is just a commodity. Use another tool if it is presenting problems. Advanced gameplay could involve using remix, or your own web3 provider.

// ---- Solution ---- //
// npx hardhat run scripts/privacy.ts

// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Privacy {
    bool public locked = true; // 0 storage slot
    uint256 public ID = block.timestamp; // 1 storage slot
    uint8 private flattening = 10; // 2 storage slot
    uint8 private denomination = 255; // 2 storage slot
    uint16 private awkwardness = uint16(now); // 2 storage slot
    bytes32[3] private data; // 3,4,5 storage slot

    constructor(bytes32[3] memory _data) public {
        data = _data;
    }

    function unlock(bytes16 _key) public {
        require(_key == bytes16(data[2]));
        locked = false;
    }

    /*
    A bunch of super advanced solidity algorithms...

      ,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`
      .,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,
      *.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^         ,---/V\
      `*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.    ~|__(o.o)
      ^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'^`*.,*'  UU  UU
  */
}
