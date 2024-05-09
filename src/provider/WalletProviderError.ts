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