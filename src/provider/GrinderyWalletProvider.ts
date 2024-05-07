import { ProviderError } from './ProviderError';
import { ProviderLocalStorage } from './ProviderLocalStorage';
import {
  ProviderInterface,
  ProviderMethods,
  RequestArguments,
  RequestArgumentsParams,
} from './types';

export class GrinderyWalletProvider extends ProviderLocalStorage
  implements ProviderInterface {
  public readonly isGrinderyWallet: boolean = true;

  constructor() {
    super();

    this.injectProvider();
  }

  public isConnected(): boolean {
    return !!this.chainId;
  }

  public isAccountsConnected(): boolean {
    return this.accounts.length > 0;
  }

  public async request<T>({ method, params }: RequestArguments): Promise<T> {
    if (method !== 'wallet_ping' && !this.chainId) {
      throw new ProviderError('Disconnected', 4900);
    }
    if (!this.methods[method]) {
      throw new ProviderError('Unsupported Method', 4200);
    }

    try {
      return (await this.methods[method](params)) as T;
    } catch (error) {
      throw this.createProviderRpcError(error);
    }
  }

  private accounts: string[] = [];
  private chainId: string = '';

  /* Avaialble `request` methods */
  private methods: ProviderMethods = {
    eth_accounts: async (_?: RequestArgumentsParams): Promise<string[]> => {
      if (!this.getStorageValue('accessToken') || this.accounts.length === 0) {
        throw new ProviderError('Unauthorized', 4900);
      }
      return this.accounts;
    },
    eth_requestAccounts: async (
      params?: {
        userId?: string;
      } & RequestArgumentsParams
    ): Promise<string[]> => {
      if (this.getStorageValue('accessToken') && this.accounts.length > 0) {
        return this.accounts;
      }
      try {
        const result = await this.request<{
          success: boolean;
          address?: string;
          accessToken?: string;
          connectUrl?: string;
        }>({
          method: 'wallet_pair',
          params: { userId: params?.userId || this.getStorageValue('userId') },
        });

        if (
          result.success &&
          result.address &&
          new RegExp(/^0x[0-9a-fA-F]{40}$/).test(result.address) &&
          result.accessToken
        ) {
          this.setStorageValue('address', result.address);
          this.setStorageValue('accessToken', result.accessToken);
          this.accounts = [result.address];
          this.emit('accountsChanged', { accounts: this.accounts });
          return this.accounts;
        }
        throw new ProviderError('Pairing failed', 4900);
      } catch (error) {
        throw this.createProviderRpcError(error);
      }
    },
    wallet_pair: async (
      params?: {
        userId?: string;
      } & RequestArgumentsParams
    ): Promise<{
      success: boolean;
      address?: string;
      accessToken?: string;
      connectUrl?: string;
    }> => {
      return await this.sendGrinderyRpcApiRequest<{
        success: boolean;
        address?: string;
        accessToken?: string;
        connectUrl?: string;
      }>('wallet_pair', params);
    },
    eth_sendTransaction: async (
      params?: RequestArgumentsParams
    ): Promise<string[]> => {
      if (!this.getStorageValue('accessToken') || this.accounts.length === 0) {
        throw new ProviderError('Unauthorized', 4900);
      }
      return await this.sendGrinderyRpcApiRequest<string[]>(
        'eth_sendTransaction',
        params
      );
    },
    personal_sign: async (params?: RequestArgumentsParams): Promise<string> => {
      if (!this.getStorageValue('accessToken') || this.accounts.length === 0) {
        throw new ProviderError('Unauthorized', 4900);
      }
      return await this.sendGrinderyRpcApiRequest<string>(
        'personal_sign',
        params
      );
    },
  };

  private injectProvider(): void {
    if (!window.ethereum) {
      window.ethereum = this;
    } else {
      if (
        window.ethereum.providers &&
        Array.isArray(window.ethereum.providers)
      ) {
        window.ethereum.providers.push(this);
      } else {
        window.ethereum.providers = [window.ethereum, this];
      }
    }

    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      // TODO replace with real async handshake?
      setTimeout(() => {
        this.chainId = '0x89';
        if (this.getStorageValue('address')) {
          this.accounts = [this.getStorageValue('address')];
        }
        this.emit('connect', { chainId: this.chainId });
      }, 100);
    } catch (error) {
      this.emit('disconnect', { error: this.createProviderRpcError(error) });
    }
  }

  private createProviderRpcError(error: unknown): ProviderError {
    let errorResponse: ProviderError;
    if (error instanceof ProviderError) {
      errorResponse = new ProviderError(error.message || 'Unknown error');
      errorResponse.code = error.code || 4900;
      errorResponse.data = error.data;
    } else if (error instanceof Error) {
      errorResponse = new ProviderError(error.message || 'Unknown error');
      errorResponse.code = 4900;
    } else {
      errorResponse = new ProviderError('Unknown error');
      errorResponse.code = 4900;
    }
    return errorResponse;
  }

  private async sendGrinderyRpcApiRequest<T>(
    method: string,
    params?: RequestArgumentsParams
  ): Promise<T> {
    try {
      const response = await fetch('https://walletconnect-api.grindery.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.getStorageValue('accessToken')
            ? `Bearer ${this.getStorageValue('accessToken')}`
            : '',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method,
          params,
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new ProviderError(data.error.message, data.error.code);
      }
      if (!data.result) {
        throw new ProviderError('No result', 4900);
      }
      return data.result;
    } catch (error) {
      throw this.createProviderRpcError(error);
    }
  }
}
