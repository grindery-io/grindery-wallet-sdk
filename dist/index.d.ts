import { WalletSDK } from './classes/WalletSDK';
declare global {
    interface Window {
        ethereum?: any;
        Grindery?: {
            appId?: string;
            appUrl?: string;
            redirectMode?: string;
            pairingApiUrl?: string;
            walletApiUrl?: string;
            chainId?: string;
            WalletSDK?: WalletSDK;
        };
    }
}
/**
 * @summary The Grindery Wallet SDK
 */
export declare const GrinderyWalletSDK: typeof WalletSDK;
