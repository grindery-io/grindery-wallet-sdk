import { ProviderLocalStorage } from './ProviderLocalStorage';
import { ProviderInterface, RequestArguments } from './types';
export declare class GrinderyWalletProvider extends ProviderLocalStorage implements ProviderInterface {
    readonly isGrinderyWallet: boolean;
    constructor();
    isConnected(): boolean;
    isAccountsConnected(): boolean;
    request<T>({ method, params }: RequestArguments): Promise<T>;
    private accessToken;
    private accounts;
    private appData;
    private chainId;
    private methods;
    private injectProvider;
    private connect;
    private createProviderRpcError;
    private sendGrinderyRpcApiRequest;
}
