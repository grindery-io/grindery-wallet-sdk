import { ProviderError } from '../../src/classes/ProviderError';

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
