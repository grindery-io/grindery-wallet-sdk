import { WalletSDK } from './classes/WalletSDK';

declare global {
  interface Window {
    Telegram?: any;
    ethereum?: any;
    Grindery?: {
      appId?: string;
      appUrl?: string;
      redirectMode?: string;
      pairingApiUrl?: string;
      walletApiUrl?: string;
      WalletSDK?: WalletSDK;
    };
  }
}

/**
 * @summary The Grindery Wallet SDK
 */
export const GrinderyWalletSDK = WalletSDK;

function init() {
  if (
    !window.Grindery?.WalletSDK ||
    !(window.Grindery.WalletSDK instanceof WalletSDK)
  ) {
    window.Grindery = {
      ...(window.Grindery || {}),
      WalletSDK: new WalletSDK(),
    };
  }
}

// Initialize the SDK
init();
