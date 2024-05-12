import { GrinderyWalletSDK } from './sdk/GrinderyWalletSDK';
import { getAppId } from './utils/getAppId';

declare global {
  interface Window {
    Telegram?: any;
    ethereum?: any;
    Grindery?: {
      appId?: string;
      WalletSDK?: GrinderyWalletSDK;
    };
  }
}

function init() {
  if (
    !window.Grindery?.WalletSDK ||
    !(window.Grindery.WalletSDK instanceof GrinderyWalletSDK)
  ) {
    window.Grindery = {
      ...(window.Grindery || {}),
      WalletSDK: new GrinderyWalletSDK({
        appId: getAppId(),
      }),
    };
  }
}

// Initialize the SDK
init();
