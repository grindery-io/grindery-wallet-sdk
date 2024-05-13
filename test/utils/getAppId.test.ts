import { getAppId } from '../../src/utils/getAppId';

describe('utils/getAppId', () => {
  it('should return a string', () => {
    const appId = getAppId();
    expect(typeof appId).toBe('string');
  });
});
