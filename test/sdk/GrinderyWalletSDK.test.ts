import { GrinderyWalletSDK } from '../../src/sdk/GrinderyWalletSDK';
import { GrinderyWalletProvider } from '../../src/provider/GrinderyWalletProvider';

describe('sdk/GrinderyWalletSDK', () => {
  const sdk = new GrinderyWalletSDK({ appId: 'test' });

  it('returns provider', () => {
    const provider = sdk.provider;
    expect(provider).toBeInstanceOf(GrinderyWalletProvider);
  });

  it('returns connection status', () => {
    expect(sdk.isConnected()).toBeDefined();
  });

  it('returns wallet connection status', () => {
    expect(sdk.isWalletConnected()).toBeDefined();
  });
});
