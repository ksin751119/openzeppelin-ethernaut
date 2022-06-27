#!/bin/bash
URL=https://rpc.ankr.com/polygon
FORK_URL=$URL npx hardhat test --network hardhat
# npx hardhat test --network localhost
