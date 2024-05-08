import { Provider } from './Provider';
import { ProviderInterface } from './types';
/**
 * @summary The Grindery Wallet Ethereum Injected Provider Class.
 * @extends Provider
 * @implements ProviderInterface
 */
export declare class GrinderyWalletProvider extends Provider implements ProviderInterface {
    /**
     * @summary Indicates that the provider is a Grindery Wallet.
     */
    readonly isGrinderyWallet: boolean;
    constructor();
}
