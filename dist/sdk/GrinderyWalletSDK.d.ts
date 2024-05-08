import { GrinderyWalletProvider } from '../provider/GrinderyWalletProvider';
/**
 * @summary The Grindery Wallet SDK class
 * @since 0.1.0
 */
export declare class GrinderyWalletSDK {
    /**
     * @summary The provider instance
     * @public
     */
    provider: GrinderyWalletProvider;
    constructor();
    /**
     * @summary Gets the Grindery Wallet ethereum provider
     * @returns {GrinderyWalletProvider} The Grindery Wallet ethereum provider
     */
    private getWeb3Provider;
}
