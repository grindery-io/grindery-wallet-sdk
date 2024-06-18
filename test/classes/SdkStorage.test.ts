import { SdkStorage, SdkStorageKeys } from '../../src/classes/SdkStorage';

const LOCALSTORAGE_KEY = 'GrinderyWalletProvider';

describe('SdkStorage', () => {
  let sdkStorage: SdkStorage;

  beforeEach(() => {
    sdkStorage = new SdkStorage();
  });

  it('should create an instance of SdkStorage', () => {
    expect(sdkStorage).toBeInstanceOf(SdkStorage);
  });

  it('should clear the storage', () => {
    sdkStorage.clear();
    Object.entries(SdkStorageKeys).forEach(([_, value]) => {
      if (value !== 'clientId' && value !== 'chainId') {
        expect(sdkStorage.getValue(SdkStorageKeys[value])).toEqual('');
      }
    });
  });

  it('should get the value of the storage by the key', () => {
    const key = SdkStorageKeys.address;
    const value = '0x0';
    sdkStorage.setValue(key, value);
    expect(sdkStorage.getValue(key)).toBe(value);
  });

  it('should save the storage', () => {
    const key = 'address';
    const value = '0x0';
    sdkStorage['saveSnapshot']({ [key]: value });
    expect(sdkStorage['getSnapshot']()).toStrictEqual({ [key]: value });
  });

  it('throws error if storage is not a valid json string', () => {
    localStorage.setItem(LOCALSTORAGE_KEY, 'invalid');

    expect(() => sdkStorage['getSnapshot']()).toThrow(
      new Error('Error parsing storage')
    );
  });
});
