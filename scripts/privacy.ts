// cmd: node scripts/privacy.js
const hre = require('hardhat');

const provider = hre.ethers.getDefaultProvider('rinkeby');
const contractAddress = '0x07AC2FfA91Dc41cFcA58b2aBb3D5d2c26bb460A0';

async function main() {
  const storage5 = await provider.getStorageAt(contractAddress, 5);
  console.log('storage5 --> ', storage5.slice(0, 34));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
