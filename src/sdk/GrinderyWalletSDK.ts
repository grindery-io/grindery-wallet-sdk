import { GrinderyWalletProvider } from '../provider/GrinderyWalletProvider';

export class GrinderyWalletSDK {
  public provider: GrinderyWalletProvider;

  constructor() {
    this.provider = this.getWeb3Provider();
  }

  private getWeb3Provider(): GrinderyWalletProvider {
    let provider = window.ethereum?.providers?.find(
      (provider: GrinderyWalletProvider | unknown) =>
        provider instanceof GrinderyWalletProvider && provider.isGrinderyWallet
    );
    if (
      !provider &&
      window.ethereum instanceof GrinderyWalletProvider &&
      window.ethereum.isGrinderyWallet
    ) {
      provider = window.ethereum;
    }
    if (!provider) {
      provider = new GrinderyWalletProvider();
    }
    return provider;
  }
}
