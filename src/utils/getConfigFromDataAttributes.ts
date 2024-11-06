import { WalletSDKConfig } from '../classes/WalletSDK';

/**
 * @summary Get the SDK config from the script tag data attributes
 * @returns {object} The SDK config object
 */
export const getConfigFromDataAttributes = (): Partial<WalletSDKConfig> => {
  let config: Partial<WalletSDKConfig> = {};
  const attributesMap = {
    'data-app-id': 'appId',
    'data-wallet-api-url': 'walletApiUrl',
    'data-pairing-api-url': 'pairingApiUrl',
    'data-app-url': 'appUrl',
    'data-redirect-mode': 'redirectMode',
    'data-chain-id': 'chainId',
  };
  for (const [attribute, key] of Object.entries(attributesMap)) {
    const elements = document.querySelectorAll(`[${attribute}]`);
    for (let j = 0; j < elements.length; j++) {
      const element = elements[j];
      const value = element.getAttribute(attribute);
      const src = element.getAttribute('src');
      const isGrinderySrc = src && src.includes('grindery-wallet-sdk');
      if (isGrinderySrc && value) {
        config[key as keyof WalletSDKConfig] = value as string;
      }
    }
  }
  return config;
};
