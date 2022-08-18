import { ethers } from 'hardhat';
import { impersonateAndInjectEther } from './utils';
import { expect } from 'chai';

describe('DoubleEntryPoint', function () {
  it('attack', async function () {
    const vaultAddr = '0x430304835d059Fd9F5E342DC7F2594764CB4c860';
    const DETAddr = '0x72E6aAE1965240753F24e38295E5d5D7AD8AEc9c';
    const LGTAddr = '0x2580C323F0e1aB0d38fD4b2407f76D2c8CE6dDA1';
    const FortaAddr = '0xCd96B346FdFEB43305d7210267eCbf6149aaE920';
    const senderAddr = '0x07b05D3A1ed958944033060d058b8F0771ad1A6e';
    const sender = await impersonateAndInjectEther(senderAddr);

    // Get target contract
    const vault = await ethers.getContractAt('CryptoVault', vaultAddr);
    const lgt = await ethers.getContractAt('IERC20', LGTAddr);
    const forta = await ethers.getContractAt('Forta', FortaAddr);

    // Deploy DetectionBot contract
    const DetectionBot = await ethers.getContractFactory('DetectionBot');
    const bot = await DetectionBot.deploy(vault.address, forta.address, sender.address);
    await bot.connect(sender).deployed();
    await forta.connect(sender).setDetectionBot(bot.address);
    await expect(vault.sweepToken(lgt.address)).to.be.revertedWith('Alert has been triggered, reverting');
  });
});
