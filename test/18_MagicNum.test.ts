import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Wallet, ContractFactory } from 'ethers';

describe('MagicNum', function () {
  let owner: Wallet;
  it('attack', async function () {
    [owner] = await (ethers as any).getSigners();

    // [1] PUSH1 0x0a
    // [3] PUSH1 0x0c
    // [5] PUSH1 0x00
    // [6] CODECOPY
    // [8] PUSH1 0x0a
    // [10] PUSH1 0x00
    // [11] RETURN
    // [13] PUSH1 0x2a
    // [15] PUSH1 0x00
    // [16] MSTORE
    // [18] PUSH1 0x20
    // [20] PUSH1 0x00
    // [21] RETURN

    const byteCode = '600a600c600039600a6000f3602a60005260206000f3';
    const iface = new ethers.utils.Interface(['function whatIsTheMeaningOfLife() view returns (uint256)']);
    const factory = new ContractFactory(iface, byteCode);

    // If your contract requires constructor args, you can specify them here
    const contract = await factory.connect(owner).deploy();
    const code = await ethers.provider.getCode(contract.address);
    console.log('code', code.toString());
    const magicNum = await contract.whatIsTheMeaningOfLife();
    console.log(magicNum.toString());
    expect(magicNum).to.be.eq(42);
  });
});
