import { GrinderyWalletSDK } from './classes/GrinderyWalletSDK';
declare global {
    interface Window {
        Telegram?: any;
        ethereum?: any;
        Grindery?: {
            WalletSDK?: GrinderyWalletSDK;
        };
    }
}
