import { WalletSDK } from './classes/WalletSDK';
declare global {
    interface Window {
        Telegram?: any;
        ethereum?: any;
        Grindery?: {
            appId?: string;
            appUrl?: string;
            WalletSDK?: WalletSDK;
        };
    }
}
/**
 * @summary The Grindery Wallet SDK
 */
export declare const GrinderyWalletSDK: typeof WalletSDK;
