/**
 * @summary Error class for WalletProvider
 * @since 0.1.0
 * @extends Error
 */
export class WalletProviderError extends Error {
  name: string = 'GrinderyWalletProviderError';
  code?: number;
  data?: unknown;

  constructor(message: string, code?: number, data?: unknown) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export const WalletProviderErrors = {
  PairingFailed: new WalletProviderError('Pairing failed', 4900),
  Disconnected: new WalletProviderError('Disconnected', 4900),
  UnsupportedMethod: new WalletProviderError('Unsupported Method', 4200),
  Unauthorized: new WalletProviderError('Unauthorized', 4900),
  NoResult: new WalletProviderError('No result', 4900),
  NoAppId: new WalletProviderError('App ID is required', 4900),
};
