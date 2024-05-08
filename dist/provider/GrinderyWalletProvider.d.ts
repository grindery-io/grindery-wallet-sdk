import { ProviderLocalStorage } from './ProviderLocalStorage';
import { ProviderInterface, RequestArguments } from './types';
export declare class GrinderyWalletProvider extends ProviderLocalStorage implements ProviderInterface {
    readonly isGrinderyWallet: boolean;
    constructor();
    isConnected(): boolean;
    isWalletConnected(): boolean;
    isWalletConnectionPending(): boolean;
    request<T>({ method, params }: RequestArguments): Promise<T>;
    private appId;
    private chainId;
    private methods;
    private sendGrinderyRpcProviderRequest;
    private sendGrinderyRpcApiRequest;
    private createProviderRpcError;
    private injectProvider;
}
