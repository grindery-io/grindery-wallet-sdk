import '../src/index';
import { GrinderyWalletSDK } from '../src/sdk/GrinderyWalletSDK';

describe('index', () => {
  it('should inject wallet SDK', () => {
    expect(window.Grindery?.WalletSDK).toBeInstanceOf(GrinderyWalletSDK);
  });
});
