import { Provider } from './Provider';
import { ProviderError } from './ProviderError';
import {
  ProviderInterface,
  ProviderPairingResult,
  ProviderRequestPairingResult,
  RequestArgumentsParams,
} from './types';

/**
 * @summary The Grindery Wallet Ethereum Injected Provider Class.
 * @extends Provider
 * @implements ProviderInterface
 */
export class GrinderyWalletProvider extends Provider
  implements ProviderInterface {
  /**
   * @summary Indicates that the provider is a Grindery Wallet.
   */
  public readonly isGrinderyWallet: boolean = true;

  constructor() {
    super();

    this.registerProviderMethods({
      /**
       * @summary Connect a dApp to the Grindery Wallet.
       * @since 0.1.0
       * @returns {Promise<string[]>} The list of user wallets' addresses.
       */
      eth_requestAccounts: {
        sessionRequired: false,
        execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
          if (this.isWalletConnected()) {
            try {
              return await this.request<string[]>({
                method: 'eth_accounts',
                params: params || [],
              });
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

              this.setStorageValue('sessionId', pairResult.session.sessionId);
              this.setStorageValue('pairingToken', '');
              this.setStorageValue('connectUrl', '');
              this.setStorageValue('connectUrlBrowser', '');

              if (!pairResult.session.sessionId) {
                throw new ProviderError('Pairing failed', 4900);
              }

              return [];
            } catch (error) {
              this.setStorageValue('sessionId', '');
              this.setStorageValue('pairingToken', '');
              this.setStorageValue('connectUrl', '');
              this.setStorageValue('connectUrlBrowser', '');
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
            if (pairResult.session.namespaces[`eip155`].accounts.length > 0) {
              return pairResult.session.namespaces[`eip155`].accounts;
            }
            return await this.sendGrinderyRpcApiRequest<string[]>(
              'checkout_request',
              {
                sessionId: pairResult.session.sessionId,
                scope: this.chainId,
                request: {
                  method: 'eth_accounts',
                  params: [],
                },
              }
            );
          } catch (error) {
            throw this.createProviderRpcError(error);
          }
        },
      },

      /**
       * @summary Get a list of user wallets' addresses.
       * @since 0.1.0
       * @returns {Promise<string[]>} The list of user wallets' addresses.
       */
      eth_accounts: {
        sessionRequired: true,
        execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
          try {
            const { requestToken } = await this.sendGrinderyRpcProviderRequest(
              'eth_accounts',
              params ? (Array.isArray(params) ? params : [params]) : []
            );
            if (!requestToken) {
              throw new ProviderError('No request token', 4900);
            }
            return await this.waitGrinderyRpcProviderRequest<string[]>(
              requestToken
            );
          } catch (error) {
            throw this.createProviderRpcError(error);
          }
        },
      },
      eth_sendTransaction: {
        sessionRequired: true,
        execute: async (params?: RequestArgumentsParams): Promise<string[]> => {
          try {
            const { requestToken } = await this.sendGrinderyRpcProviderRequest(
              'eth_sendTransaction',
              params ? (Array.isArray(params) ? params : [params]) : []
            );
            if (!requestToken) {
              throw new ProviderError('No request token', 4900);
            }
            return await this.waitGrinderyRpcProviderRequest<string[]>(
              requestToken
            );
          } catch (error) {
            throw this.createProviderRpcError(error);
          }
        },
      },
      personal_sign: {
        sessionRequired: true,
        execute: async (
          params?: Partial<RequestArgumentsParams>
        ): Promise<string> => {
          try {
            const { requestToken } = await this.sendGrinderyRpcProviderRequest(
              'personal_sign',
              params ? (Array.isArray(params) ? params : [params]) : []
            );
            if (!requestToken) {
              throw new ProviderError('No request token', 4900);
            }
            return await this.waitGrinderyRpcProviderRequest(requestToken);
          } catch (error) {
            throw this.createProviderRpcError(error);
          }
        },
      },
    });
  }
}
