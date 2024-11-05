import { Rpc, RpcMethodNames } from '../../src/classes/Rpc';

describe('Rpc', () => {
  let rpc: Rpc;

  beforeEach(() => {
    rpc = new Rpc({ appId: '1234', appUrl: 'https://example.com' });
  });

  describe('sendAndWaitRpcRequest', () => {
    it('should send a provider request and wait for the result', async () => {
      const method = 'request';
      const params = [1, 2, 3];
      const expectedResult = 'result';
      rpc['sendRpcRequest'] = jest
        .fn()
        .mockResolvedValueOnce({ requestToken: 'token' });
      rpc['waitRpcRequest'] = jest.fn().mockResolvedValueOnce(expectedResult);
      const result = await rpc.sendAndWaitRpcRequest(method, params);
      expect(rpc['sendRpcRequest']).toHaveBeenCalledWith(method, params);
      expect(rpc['waitRpcRequest']).toHaveBeenCalledWith('token', undefined);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('sendRpcRequest', () => {
    it('should send a provider request', async () => {
      const method = 'request';
      const params = [1, 2, 3];
      const expectedResult = { requestToken: 'token' };
      rpc['sendRpcApiRequest'] = jest
        .fn()
        .mockResolvedValueOnce(expectedResult);
      const result = await rpc['sendRpcRequest'](method, params);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('waitRpcRequest', () => {
    it('should wait for the result of a provider request', async () => {
      const requestToken = 'token';
      const timeout = 5000;
      rpc['waitRpcRequest'] = jest.fn().mockResolvedValueOnce('result');
      const result = await rpc['waitRpcRequest'](requestToken, timeout);
      expect(rpc['waitRpcRequest']).toHaveBeenCalledWith(requestToken, timeout);
      expect(result).toEqual('result');
    });
  });

  describe('sendRpcApiRequest', () => {
    it('should send a request to the Grindery Walletconnect RPC API', async () => {
      const method = RpcMethodNames.request;
      const params = { param1: 'value1', param2: 'value2' };
      const expectedResult = 'result';
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ result: expectedResult }),
      });
      const result = await rpc.sendRpcApiRequest(method, params);
      expect(result).toEqual(expectedResult);
    });
  });
});
