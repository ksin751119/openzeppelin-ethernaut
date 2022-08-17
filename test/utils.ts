import { BigNumber, Signer } from 'ethers';
import { ethers } from 'hardhat';
const hre = require('hardhat');

export async function sendEther(sender: Signer, to: string, value: BigNumber) {
  await sender.sendTransaction({
    to: to,
    value: value,
  });
}

export async function _impersonateAndInjectEther(address: string) {
  // Impersonate pair
  await hre.network.provider.send('hardhat_impersonateAccount', [address]);

  // Inject 1 ether
  await hre.network.provider.send('hardhat_setBalance', [address, '0xde0b6b3a7640000']);
}

export async function impersonateAndInjectEther(address: string) {
  _impersonateAndInjectEther(address);
  return await (ethers as any).getSigner(address);
}

export function simpleEncode(_func: string, params: any) {
  const func = 'function ' + _func;
  const abi = [func];
  const iface = new ethers.utils.Interface(abi);
  const data = iface.encodeFunctionData(_func, params);

  return data;
}
