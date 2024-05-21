import {
  ProviderError,
  newProviderError,
} from '../../src/classes/ProviderError';

describe('ProviderError', () => {
  it('should create an instance of ProviderError', () => {
    const error = new ProviderError('Test error message');
    expect(error).toBeInstanceOf(ProviderError);
  });

  it('should set the message property', () => {
    const errorMessage = 'Test error message';
    const error = new ProviderError(errorMessage);
    expect(error.message).toBe(errorMessage);
  });

  it('should set the code property', () => {
    const errorMessage = 'Test error message';
    const errorCode = 123;
    const error = new ProviderError(errorMessage, errorCode);
    expect(error.code).toBe(errorCode);
  });

  it('should inherit from Error', () => {
    const error = new ProviderError('Test error message');
    expect(error).toBeInstanceOf(Error);
  });
});

describe('newProviderError', () => {
  it('should create an instance of ProviderError', () => {
    const error = newProviderError();
    expect(error).toBeInstanceOf(ProviderError);
  });

  it('should accept an error object', () => {
    const error = new Error('Test error message');
    const providerError = newProviderError(error);
    expect(providerError.message).toBe(error.message);
    expect(providerError.code).toBe(4900);
    expect(providerError.data).toBe(error);
  });

  it('should accept a provider error object', () => {
    const message = 'Error';
    const error = new ProviderError(message);
    const providerError = newProviderError(error);
    expect(providerError.message).toBe(message);
  });

  it('should return generic provider error if no message provided in provider error', () => {
    const message = '';
    const error = new ProviderError(message);
    const providerError = newProviderError(error);
    expect(providerError.message).toBe('Unknown error');
  });

  it('should return generic provider error if no message provided in error', () => {
    const message = '';
    const error = new Error(message);
    const providerError = newProviderError(error);
    expect(providerError.message).toBe('Unknown error');
  });
});
