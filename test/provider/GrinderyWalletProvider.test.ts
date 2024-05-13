import { GrinderyWalletProvider } from '../../src/provider/GrinderyWalletProvider';

describe('provider/GrinderyWalletProvider', () => {
  const provider = new GrinderyWalletProvider();

  it('has isGrinderyWallet property equals `true`', () => {
    expect(provider.isGrinderyWallet).toBe(true);
  });
});
