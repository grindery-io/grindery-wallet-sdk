import { ProviderBase } from './ProviderBase';
import { ProviderError } from './ProviderError';
import {
  ProviderInterface,
  ProviderPairingResult,
  ProviderRequestPairingResult,
  RequestArgumentsParams,
} from './types';

/**
 * @summary The Grindery Wallet Ethereum Injected Provider Class.
 * @extends ProviderBase
 * @implements ProviderInterface
 */
export class GrinderyWalletProvider extends ProviderBase
  implements ProviderInterface {
  /**
   * @summary Indicates that the provider is a Grindery Wallet.
   */
  public readonly isGrinderyWallet: boolean = true;

  constructor() {
    super();

    this.registerProviderMethods({
      eth_requestAccounts: {
        sessionRequired: false,
        execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
          if (this.isWalletConnected()) {
            try {
              const accounts = await this.request<string[]>({
                method: 'eth_accounts',
                params: params || [],
              });
              this.accounts = accounts;
              this.emit('accountsChanged', { accounts });
              return accounts;
            } catch (error) {
              this.setStorageValue('sessionId', '');
              // skip failed request and continue with pairing
            }
          }
          if (this.isWalletConnectionPending()) {
            try {
              this.emit('restorePairing', {
                connectUrl: this.getStorageValue('connectUrl'),
                connectUrlBrowser: this.getStorageValue('connectUrlBrowser'),
              });

              const pairResult = await this.sendGrinderyRpcApiRequest<
                ProviderPairingResult
              >('checkout_waitForPairingResult', {
                pairingToken: this.getStorageValue('pairingToken'),
              });

              this.clearStorage();
              this.setStorageValue('sessionId', pairResult.session.sessionId);

              if (!pairResult.session.sessionId) {
                throw new ProviderError('Pairing failed', 4900);
              }

              const accounts = (
                pairResult.session?.namespaces?.[`eip155`]?.accounts || []
              ).map(account =>
                account.includes(':') ? account.split(':')[2] || '' : account
              );
              this.accounts = accounts;
              this.emit('accountsChanged', { accounts });
              return [];
            } catch (error) {
              this.clearStorage();
              // skip failed request and continue with pairing
            }
          }
          try {
            const result = await this.sendGrinderyRpcApiRequest<
              ProviderRequestPairingResult
            >('checkout_requestPairing', { appId: this.appId });

            if (!result.pairingToken || !result.connectUrl) {
              throw new ProviderError('Pairing failed', 4900);
            }

            this.setStorageValue('pairingToken', result.pairingToken);
            this.setStorageValue('connectUrl', result.connectUrl);
            this.setStorageValue('connectUrlBrowser', result.connectUrlBrowser);
            this.emit('pairing', {
              connectUrl: result.connectUrl,
              connectUrlBrowser: result.connectUrlBrowser,
            });
            const pairResult = await this.sendGrinderyRpcApiRequest<
              ProviderPairingResult
            >('checkout_waitForPairingResult', {
              pairingToken: result.pairingToken,
            });

            this.setStorageValue('sessionId', pairResult.session.sessionId);

            if (!pairResult.session.sessionId) {
              throw new ProviderError('Pairing failed', 4900);
            }
            this.setStorageValue('pairingToken', '');
            this.setStorageValue('connectUrl', '');
            this.setStorageValue('connectUrlBrowser', '');
            const accounts = (
              pairResult.session?.namespaces?.[`eip155`]?.accounts || []
            ).map(account =>
              account.includes(':') ? account.split(':')[2] || '' : account
            );
            this.accounts = accounts;
            this.emit('accountsChanged', { accounts });
            return accounts;
          } catch (error) {
            throw this.createProviderRpcError(error);
          }
        },
      },
      eth_accounts: {
        sessionRequired: true,
        execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
          try {
            const accounts = await this.sendAndWaitGrinderyRpcProviderRequest<
              string[]
            >(
              'eth_accounts',
              params ? (Array.isArray(params) ? params : [params]) : []
            );
            this.accounts = accounts;
            this.emit('accountsChanged', { accounts });
            return accounts;
          } catch (error) {
            throw this.createProviderRpcError(error);
          }
        },
      },
      eth_sendTransaction: {
        sessionRequired: true,
        execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
          return await this.sendAndWaitGrinderyRpcProviderRequest<string[]>(
            'eth_sendTransaction',
            params ? (Array.isArray(params) ? params : [params]) : []
          );
        },
      },
      personal_sign: {
        sessionRequired: true,
        execute: async (
          params?: Partial<RequestArgumentsParams>
        ): Promise<string> => {
          return await this.sendAndWaitGrinderyRpcProviderRequest(
            'personal_sign',
            params ? (Array.isArray(params) ? params : [params]) : []
          );
        },
      },
    });

    window.addEventListener('load', () => {
      this.emit('connect', { chainId: this.getChain() });
      this.restorePairing();
      this.restoreSession();
    });
  }

  /**
   * @summary Restores the pairing process if pairing token is stored in the local storage
   * @private
   * @returns {void}
   */
  private async restorePairing(): Promise<void> {
    const pairingToken = this.getStorageValue('pairingToken');
    const sessionId = this.getStorageValue('sessionId');
    if (pairingToken && !sessionId) {
      try {
        this.emit('restorePairing', {
          connectUrl: this.getStorageValue('connectUrl'),
          connectUrlBrowser: this.getStorageValue('connectUrlBrowser'),
        });

        const pairResult = await this.sendGrinderyRpcApiRequest<
          ProviderPairingResult
        >('checkout_waitForPairingResult', {
          pairingToken,
        });

        this.clearStorage();
        this.setStorageValue('sessionId', pairResult.session.sessionId);

        if (!pairResult.session.sessionId) {
          throw new ProviderError('Pairing failed', 4900);
        }

        const accounts = (
          pairResult.session?.namespaces?.[`eip155`]?.accounts || []
        ).map(account =>
          account.includes(':') ? account.split(':')[2] || '' : account
        );
        this.accounts = accounts;
        this.emit('accountsChanged', { accounts });
      } catch (error) {
        this.accounts = [];
        this.clearStorage();
      }
    }
  }

  /**
   * @summary Restores the session if session Id is stored in the local storage
   * @private
   * @returns {void}
   */
  private async restoreSession(): Promise<void> {
    const pairingToken = this.getStorageValue('pairingToken');
    const sessionId = this.getStorageValue('sessionId');
    if (sessionId && !pairingToken) {
      try {
        await this.request<string[]>({
          method: 'eth_requestAccounts',
        });
      } catch (error) {
        this.accounts = [];
        this.clearStorage();
      }
    }
  }
}
