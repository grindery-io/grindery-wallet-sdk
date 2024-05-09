import { ProviderInterface } from '../types';
import { WalletProvider } from './WalletProvider';
/**
 * @summary The Grindery Wallet Ethereum Injected Provider Class.
 * @extends WalletProvider
 * @implements ProviderInterface
 */
export declare class GrinderyWalletProvider extends WalletProvider implements ProviderInterface {
    /**
     * @summary Indicates that the provider is a Grindery Wallet.
     */
    readonly isGrinderyWallet: boolean;
    constructor();
    /**
     * @summary Restores the pairing process if pairing token is stored in the local storage
     * @private
     * @returns {void}
     */
    private restorePairing;
    /**
     * @summary Restores the session if session Id is stored in the local storage
     * @private
     * @returns {void}
     */
    private restoreSession;
}
