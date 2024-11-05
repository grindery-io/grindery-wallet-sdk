import { ProviderEvents } from '../../src/classes/EventEmitter';
import { Provider } from '../../src/classes/Provider';
import { SdkStorageKeys } from '../../src/classes/SdkStorage';

describe('Provider', () => {
  let provider: Provider;

  beforeEach(() => {
    provider = new Provider({ appId: '1234', appUrl: 'https://example.com' });
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

  it('should have a method eth_requestAccounts that returns a promise', () => {
    const result = provider['methods']
      ['eth_requestAccounts']?.()
      .catch(() => {});
    expect(result).toBeInstanceOf(Promise);
  });

  it('should have a method eth_accounts that returns a promise', () => {
    const result = provider['methods']['eth_accounts']?.().catch(() => {});
    expect(result).toBeInstanceOf(Promise);
  });

  it('should have a method eth_sendTransaction that returns a promise', () => {
    const result = provider['methods']
      ['eth_sendTransaction']?.()
      .catch(() => {});
    expect(result).toBeInstanceOf(Promise);
  });

  it('should have a method personal_sign that returns a promise', () => {
    const result = provider['methods']['personal_sign']?.().catch(() => {});
    expect(result).toBeInstanceOf(Promise);
  });

  it('should have a method gws_disconnect that returns a promise', () => {
    const result = provider['methods']['gws_disconnect']?.().catch(() => {});
    expect(result).toBeInstanceOf(Promise);
  });

  it('should emit the connect event on window load', () => {
    const spy = jest.fn();
    provider.on(ProviderEvents.connect, spy);
    window.dispatchEvent(new Event('load'));
    expect(spy).toHaveBeenCalledWith({
      chainId: expect.any(String),
    });
  });

  it('should try to restore session on window load', () => {
    const spy = jest.spyOn(provider as any, 'restoreSession');
    window.dispatchEvent(new Event('load'));
    expect(spy).toHaveBeenCalled();
  });

  it('should try to restore pairing on window load', () => {
    const spy = jest.spyOn(provider as any, 'restorePairing');
    window.dispatchEvent(new Event('load'));
    expect(spy).toHaveBeenCalled();
  });

  it('should try to get accounts if session id is present in the storage', () => {
    provider['storage'].setValue(SdkStorageKeys.sessionId, 'sessionId');
    const spy = jest.spyOn(provider['methods'] as any, 'eth_requestAccounts');
    window.dispatchEvent(new Event('load'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit accountsChanged event when accounts are changed', () => {
    const spy = jest.fn();
    provider.on(ProviderEvents.accountsChanged, spy);
    provider['rpc']['sendAndWaitRpcRequest'] = jest
      .fn()
      .mockResolvedValueOnce(['0x123']);
    provider
      .request({ method: 'eth_accounts' })
      .then(() => {
        expect(spy).toHaveBeenCalled();
      })
      .catch(() => {});
  });

  it('should emit disconnect event when disconnected', () => {
    const spy = jest.fn();
    provider.on(ProviderEvents.disconnect, spy);
    provider['rpc']['sendRpcApiRequest'] = jest
      .fn()
      .mockResolvedValueOnce(true);
    provider
      .request({ method: 'gws_disconnect' })
      .then(() => {
        expect(spy).toHaveBeenCalled();
      })
      .catch(() => {});
  });

  it('should listen for requestProvider event and announce provider', () => {
    const spy = jest.spyOn(provider as any, 'announceProvider');
    provider['listenForRequestProviderEvents']();
    window.dispatchEvent(new CustomEvent('eip6963:requestProvider'));
    expect(spy).toHaveBeenCalled();
  });
});
