/**
 * @summary Error class for wallet Provider
 * @since 0.1.0
 * @extends Error
 */
export class ProviderError extends Error {
  name: string = 'GrinderyWalletProviderError';
  code?: number;
  data?: unknown;

  constructor(message: string, code?: number, data?: unknown) {
    super(message);
    this.code = code;
    this.data = data;
  }
}

export const ProviderErrors = {
  PairingFailed: new ProviderError('Pairing failed', 4900),
  Disconnected: new ProviderError('Disconnected', 4900),
  UnsupportedMethod: new ProviderError('Unsupported Method', 4200),
  Unauthorized: new ProviderError('Unauthorized', 4900),
  NoResult: new ProviderError('No result', 4900),
  NoAppId: new ProviderError('App ID is required', 4900),
};
