import { WalletSDK } from '../src/classes/WalletSDK';
import '../src/index';

describe('index', () => {
  it('should inject wallet SDK', () => {
    expect(window.Grindery?.WalletSDK).toBeInstanceOf(WalletSDK);
  });
});
