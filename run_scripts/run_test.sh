#!/bin/bash
URL=https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161
# FORK_URL=$URL npx hardhat test --network hardhat ./test/16_Perservation.test.ts
# FORK_URL=$URL npx hardhat test --network hardhat ./test/17_Recovery.test.ts
# FORK_URL=$URL npx hardhat test --network hardhat ./test/18_MagicNum.test.ts
# FORK_URL=$URL npx hardhat test --network hardhat ./test/19_AlienCodex.test.ts
# FORK_URL=$URL npx hardhat test --network hardhat ./test/20_Denial.test.ts
# FORK_URL=$URL npx hardhat test --network hardhat ./test/21_Shop.test.ts
# FORK_URL=$URL npx hardhat test --network hardhat ./test/22_Dex.test.ts
FORK_URL=$URL npx hardhat test --network hardhat ./test/23_DexTwo.test.ts
