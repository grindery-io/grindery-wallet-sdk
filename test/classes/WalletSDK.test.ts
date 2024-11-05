import { ProviderEvents } from '../../src/classes/EventEmitter';
import { Provider } from '../../src/classes/Provider';
import { WalletSDK } from '../../src/classes/WalletSDK';

describe('WalletSDK', () => {
  let walletSDK: WalletSDK;

  beforeEach(() => {
    walletSDK = new WalletSDK({
      appId: '1234',
    });
  });

  it('should create an instance of WalletSDK', () => {
    expect(walletSDK).toBeInstanceOf(WalletSDK);
  });

  it('should check if the provider is connected to the server', () => {
    const isConnected = walletSDK.isConnected();
    expect(isConnected).toBe(true);
  });

  it('should check if the provider is connected to the server and the Grindery Wallet', () => {
    const isWalletConnected = walletSDK.isWalletConnected();
    expect(isWalletConnected).toBe(false);
  });

  it('should initiate connection to the Grindery Wallet', async () => {
    walletSDK.provider['methods']['eth_requestAccounts'] = jest
      .fn()
      .mockResolvedValueOnce(['0x1234567890abcdef']);
    const ethereumAddresses = await walletSDK.connect();
    expect(ethereumAddresses).toEqual(['0x1234567890abcdef']);
  });

  it('should disconnect Grindery Wallet', async () => {
    walletSDK.provider['methods']['gws_disconnect'] = jest
      .fn()
      .mockResolvedValueOnce(true);
    const isDisconnected = await walletSDK.disconnect();
    expect(isDisconnected).toBe(true);
  });

  it('should send a transaction request to the Grindery Wallet', async () => {
    walletSDK.provider['methods']['eth_sendTransaction'] = jest
      .fn()
      .mockResolvedValueOnce('0xabcdef1234567890');
    const transactionParams = {
      to: '0x1234567890abcdef',
      value: '1000000000000000000',
      data: '0xabcdef1234567890',
    };

    const transactionHash = await walletSDK.sendTransaction(transactionParams);
    expect(transactionHash).toMatch('0xabcdef1234567890');
  });

  it('should send a personal signature request to the Grindery Wallet', async () => {
    walletSDK.provider['methods']['personal_sign'] = jest
      .fn()
      .mockResolvedValueOnce('0xabcdef1234567890');
    const message = 'Hello, Grindery Wallet!';

    const signature = await walletSDK.signMessage(message);
    expect(signature).toMatch('0xabcdef1234567890');
  });

  it('should add a listener to the event', () => {
    const event = ProviderEvents.connect;
    const callback = jest.fn();
    walletSDK.on(event, callback);
    window.dispatchEvent(new Event('load'));
    expect(callback).toHaveBeenCalled();
  });

  it('should remove a listener from the event', () => {
    const event = ProviderEvents.connect;
    const callback = jest.fn();
    walletSDK.on(event, callback);
    walletSDK.removeListener(event, callback);
    window.dispatchEvent(new Event('load'));
    expect(callback).not.toHaveBeenCalled();
  });

  it('should get the Grindery Wallet ethereum provider', () => {
    const provider = walletSDK['getWeb3Provider']();
    expect(provider).toBeInstanceOf(Provider);
    expect(provider.isGrinderyWallet).toBe(true);
  });

  it('should set an app id if provided', () => {
    new WalletSDK({ appId: '1234' });
    // @ts-ignore
    expect(window.Grindery).toHaveProperty('appId', '1234');
  });
});
