import { GrinderyWalletProvider } from '../provider/GrinderyWalletProvider';

/**
 * @summary The Grindery Wallet SDK class
 * @since 0.1.0
 */
export class GrinderyWalletSDK {
  /**
   * @summary The provider instance
   * @public
   */
  public provider: GrinderyWalletProvider;

  constructor() {
    this.provider = this.getWeb3Provider();
  }

  /**
   * @summary Gets the Grindery Wallet ethereum provider
   * @returns {GrinderyWalletProvider} The Grindery Wallet ethereum provider
   */
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
