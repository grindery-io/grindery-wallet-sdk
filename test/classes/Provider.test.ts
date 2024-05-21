import { Provider } from '../../src/classes/Provider';

describe('Provider', () => {
  let provider: Provider;

  beforeEach(() => {
    provider = new Provider();
  });

  it('should be an instance of Provider', () => {
    expect(provider).toBeInstanceOf(Provider);
  });

  it('should have a property isGrinderyWallet set to true', () => {
    expect(provider.isGrinderyWallet).toBe(true);
  });

  it('should have a method isConnected that returns a boolean', () => {
    expect(typeof provider.isConnected()).toBe('boolean');
  });

  it('should have a method request that returns a promise', () => {
    const result = provider.request({ method: 'eth_accounts' }).catch(() => {});

    expect(result).toBeInstanceOf(Promise);
  });

  it('should have a method restorePairing that returns a promise', () => {
    const result = provider['restorePairing']().catch(() => {});
    expect(result).toBeInstanceOf(Promise);
  });

  it('should have a method restoreSession that returns a promise', () => {
    const result = provider['restoreSession']().catch(() => {});
    expect(result).toBeInstanceOf(Promise);
  });

  it('should have a method injectProvider that does not return a value', () => {
    expect(provider['injectProvider']()).toBeUndefined();
  });

  it('should have a method announceProvider that does not return a value', () => {
    expect(provider['announceProvider']()).toBeUndefined();
  });

  it('should have a method listenForRequestProviderEvents that does not return a value', () => {
    expect(provider['listenForRequestProviderEvents']()).toBeUndefined();
  });
});
