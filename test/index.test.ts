import { WalletSDK } from '../src/classes/WalletSDK';

// @ts-ignore
window.Grindery = {
  ...(window.Grindery || {}),
  appId: '1234',
  appUrl: 'https://example.com',
};

import '../src/index';

describe('index', () => {
  it('should inject wallet SDK', () => {
    expect(window.Grindery?.WalletSDK).toBeInstanceOf(WalletSDK);
  });
});
