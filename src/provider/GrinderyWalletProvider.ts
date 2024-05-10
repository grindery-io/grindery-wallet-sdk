import {
  GrinderyRpcMethodNames,
  GrinderyRpcProviderRequestMethodNames,
  ProviderEvents,
  ProviderStorageKeys,
} from '../enums';
import {
  GrinderyRpcApiRequestResults,
  GrinderyRpcProviderRequestResults,
  ProviderInterface,
  RequestArgumentsParams,
} from '../types';
import { WalletProvider } from './WalletProvider';
import { WalletProviderErrors } from './WalletProviderError';

/**
 * @summary The Grindery Wallet Ethereum Injected Provider Class.
 * @extends WalletProvider
 * @implements ProviderInterface
 */
export class GrinderyWalletProvider extends WalletProvider
  implements ProviderInterface {
  /**
   * @summary Indicates that the provider is a Grindery Wallet.
   */
  public readonly isGrinderyWallet: boolean = true;

  constructor() {
    super();

    this.registerProviderMethods({
      [GrinderyRpcProviderRequestMethodNames.eth_requestAccounts]: {
        sessionRequired: false,
        execute: async (
          params?: RequestArgumentsParams
        ): Promise<GrinderyRpcProviderRequestResults.eth_requestAccounts> => {
          if (this.isWalletConnected()) {
            try {
              return await this.request<
                GrinderyRpcProviderRequestResults.eth_accounts
              >({
                method: GrinderyRpcProviderRequestMethodNames.eth_accounts,
                params: params || [],
              });
            } catch (error) {
              this.setStorageValue(ProviderStorageKeys.sessionId, '');
              // skip failed request and continue with pairing
            }
          }
          if (this.isWalletConnectionPending()) {
            try {
              const pairResult = await this.sendGrinderyRpcApiRequest<
                GrinderyRpcApiRequestResults.checkout_waitForPairingResult
              >(GrinderyRpcMethodNames.checkout_waitForPairingResult, {
                pairingToken: this.getStorageValue(
                  ProviderStorageKeys.pairingToken
                ),
              });

              this.clearStorage();
              this.setStorageValue(
                ProviderStorageKeys.sessionId,
                pairResult.session.sessionId
              );

              if (!pairResult.session.sessionId) {
                throw WalletProviderErrors.PairingFailed;
              }

              return await this.request<
                GrinderyRpcProviderRequestResults.eth_accounts
              >({
                method: GrinderyRpcProviderRequestMethodNames.eth_accounts,
                params: params || [],
              });
            } catch (error) {
              this.clearStorage();
              // skip failed request and continue with pairing
            }
          }
          try {
            const result = await this.sendGrinderyRpcApiRequest<
              GrinderyRpcApiRequestResults.checkout_requestPairing
            >(GrinderyRpcMethodNames.checkout_requestPairing, {
              appId: this.appId,
            });

            if (!result.pairingToken || !result.connectUrl) {
              throw WalletProviderErrors.PairingFailed;
            }

            this.setStorageValue(
              ProviderStorageKeys.pairingToken,
              result.pairingToken
            );
            this.setStorageValue(
              ProviderStorageKeys.connectUrl,
              result.connectUrl
            );
            this.setStorageValue(
              ProviderStorageKeys.connectUrlBrowser,
              result.connectUrlBrowser
            );
            this.setStorageValue(
              ProviderStorageKeys.shortToken,
              result.shortToken
            );
            this.emit(ProviderEvents.pair, {
              shortToken: result.shortToken,
              connectUrl: result.connectUrl,
              connectUrlBrowser: result.connectUrlBrowser,
            });
            const pairResult = await this.sendGrinderyRpcApiRequest<
              GrinderyRpcApiRequestResults.checkout_waitForPairingResult
            >(GrinderyRpcMethodNames.checkout_waitForPairingResult, {
              pairingToken: result.pairingToken,
            });

            this.setStorageValue(
              ProviderStorageKeys.sessionId,
              pairResult.session.sessionId
            );

            if (!pairResult.session.sessionId) {
              throw WalletProviderErrors.PairingFailed;
            }
            this.setStorageValue(ProviderStorageKeys.pairingToken, '');
            this.setStorageValue(ProviderStorageKeys.connectUrl, '');
            this.setStorageValue(ProviderStorageKeys.connectUrlBrowser, '');
            this.setStorageValue(ProviderStorageKeys.shortToken, '');

            return await this.request({
              method: GrinderyRpcProviderRequestMethodNames.eth_accounts,
              params: params || [],
            });
          } catch (error) {
            throw this.createProviderRpcError(error);
          }
        },
      },
      [GrinderyRpcProviderRequestMethodNames.eth_accounts]: {
        sessionRequired: true,
        execute: async (
          params?: RequestArgumentsParams
        ): Promise<GrinderyRpcProviderRequestResults.eth_accounts> => {
          try {
            return this.setAccounts(
              await this.sendAndWaitGrinderyRpcProviderRequest(
                GrinderyRpcProviderRequestMethodNames.eth_accounts,
                params ? (Array.isArray(params) ? params : [params]) : []
              )
            );
          } catch (error) {
            throw this.createProviderRpcError(error);
          }
        },
      },
      [GrinderyRpcProviderRequestMethodNames.eth_sendTransaction]: {
        sessionRequired: true,
        execute: async (
          params?: RequestArgumentsParams
        ): Promise<GrinderyRpcProviderRequestResults.eth_sendTransaction> => {
          return await this.sendAndWaitGrinderyRpcProviderRequest(
            GrinderyRpcProviderRequestMethodNames.eth_sendTransaction,
            params ? (Array.isArray(params) ? params : [params]) : []
          );
        },
      },
      [GrinderyRpcProviderRequestMethodNames.personal_sign]: {
        sessionRequired: true,
        execute: async (
          params?: Partial<RequestArgumentsParams>
        ): Promise<GrinderyRpcProviderRequestResults.personal_sign> => {
          return await this.sendAndWaitGrinderyRpcProviderRequest(
            GrinderyRpcProviderRequestMethodNames.personal_sign,
            params ? (Array.isArray(params) ? params : [params]) : []
          );
        },
      },
    });

    window.addEventListener('load', () => {
      this.emit(ProviderEvents.connect, this.getChain());
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
    const pairingToken = this.getStorageValue(ProviderStorageKeys.pairingToken);
    const sessionId = this.getStorageValue(ProviderStorageKeys.sessionId);
    if (pairingToken && !sessionId) {
      try {
        const pairResult = await this.sendGrinderyRpcApiRequest<
          GrinderyRpcApiRequestResults.checkout_waitForPairingResult
        >(GrinderyRpcMethodNames.checkout_waitForPairingResult, {
          pairingToken,
        });

        this.clearStorage();
        this.setStorageValue(
          ProviderStorageKeys.sessionId,
          pairResult.session.sessionId
        );

        if (!pairResult.session.sessionId) {
          throw WalletProviderErrors.PairingFailed;
        }

        const accounts = (
          pairResult.session?.namespaces?.[`eip155`]?.accounts || []
        ).map(account =>
          account.includes(':') ? account.split(':')[2] || '' : account
        );
        this.setAccounts(accounts);
      } catch (error) {
        this.setAccounts([]);
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
    const pairingToken = this.getStorageValue(ProviderStorageKeys.pairingToken);
    const sessionId = this.getStorageValue(ProviderStorageKeys.sessionId);
    if (sessionId && !pairingToken) {
      try {
        await this.request<string[]>({
          method: GrinderyRpcProviderRequestMethodNames.eth_requestAccounts,
        });
      } catch (error) {
        this.setAccounts([]);
        this.clearStorage();
      }
    }
  }
}
