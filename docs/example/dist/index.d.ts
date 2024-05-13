import { GrinderyWalletSDK } from './sdk/GrinderyWalletSDK';
declare global {
    interface Window {
        Telegram?: any;
        ethereum?: any;
        Grindery?: {
            appId?: string;
            WalletSDK?: GrinderyWalletSDK;
        };
    }
}
