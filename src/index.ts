import { GrinderyWalletSDK } from './sdk/GrinderyWalletSDK';

declare global {
  interface Window {
    Telegram?: any;
    ethereum?: any;
    Grindery?: {
      WalletSDK?: GrinderyWalletSDK;
    };
  }
}

function init(_: Event) {
  if (
    !window.Grindery?.WalletSDK ||
    !(window.Grindery.WalletSDK instanceof GrinderyWalletSDK)
  ) {
    window.Grindery = {
      ...(window.Grindery || {}),
      WalletSDK: new GrinderyWalletSDK(),
    };
  }
}

// Initialize the SDK when the page is loaded
addEventListener('load', init);
