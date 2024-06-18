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
  Unauthorized: new ProviderError('Unauthorized', 4100),
  NoResult: new ProviderError('No result', 4900),
  NoAppId: new ProviderError('App ID is required', 4900),
  UserRejected: new ProviderError('User Rejected Request', 4001),
  ChainDisconnected: new ProviderError('Chain Disconnected', 4901),
};

export const newProviderError = (error?: unknown): ProviderError => {
  let errorResponse: ProviderError;
  if (error instanceof ProviderError) {
    errorResponse = new ProviderError(
      error.message || 'Unknown error',
      error.code || 4900,
      error.data
    );
  } else if (error instanceof Error) {
    errorResponse = new ProviderError(
      error.message || 'Unknown error',
      4900,
      error
    );
  } else {
    errorResponse = new ProviderError('Unknown error', 4900, error);
  }
  return errorResponse;
};
