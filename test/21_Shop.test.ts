import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BigNumber, Wallet } from 'ethers';

describe('Shop', function () {
  let owner: Wallet;

  it('attack', async function () {
    [owner] = await (ethers as any).getSigners();

    // Deploy puzzle contract
    const Shop = await ethers.getContractFactory('Shop');
    const shop = await Shop.deploy();
    await shop.connect(owner).deployed();
    expect(await shop.price()).to.be.eq(BigNumber.from('100'));
    expect(await shop.isSold()).to.be.eq(false);

    // Deploy hack contract
    const ShopHack = await ethers.getContractFactory('ShopHack');
    const hack = await ShopHack.deploy();
    await hack.connect(owner).deployed();

    // Attack
    await hack.attack(shop.address);
    expect(await shop.price()).to.be.eq(0);
    expect(await shop.isSold()).to.be.eq(true);
  });
});
