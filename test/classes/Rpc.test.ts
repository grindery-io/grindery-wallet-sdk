import { Rpc, RpcMethodNames } from '../../src/classes/Rpc';

describe('Rpc', () => {
  let rpc: Rpc;

  beforeEach(() => {
    rpc = new Rpc();
  });

  describe('sendAndWaitRpcRequest', () => {
    it('should send a provider request and wait for the result', async () => {
      // Mock the provider request
      const method = 'request';
      const params = [1, 2, 3];
      const expectedResult = 'result';

      // Mock the sendRpcRequest method
      rpc['sendRpcRequest'] = jest
        .fn()
        .mockResolvedValueOnce({ requestToken: 'token' });

      // Mock the waitRpcRequest method
      rpc['waitRpcRequest'] = jest.fn().mockResolvedValueOnce(expectedResult);

      // Call the sendAndWaitRpcRequest method
      const result = await rpc.sendAndWaitRpcRequest(method, params);

      // Verify the mock methods were called with the correct arguments
      expect(rpc['sendRpcRequest']).toHaveBeenCalledWith(method, params);
      expect(rpc['waitRpcRequest']).toHaveBeenCalledWith('token', undefined);

      // Verify the result
      expect(result).toEqual(expectedResult);
    });
  });

  describe('sendRpcRequest', () => {
    it('should send a provider request', async () => {
      // Mock the provider request
      const method = 'request';
      const params = [1, 2, 3];
      const expectedResult = { requestToken: 'token' };

      // mock sendRpcApiRequest method
      rpc['sendRpcApiRequest'] = jest
        .fn()
        .mockResolvedValueOnce(expectedResult);

      // Call the sendRpcRequest method
      const result = await rpc['sendRpcRequest'](method, params);

      // Verify the result
      expect(result).toEqual(expectedResult);
    });
  });

  describe('waitRpcRequest', () => {
    it('should wait for the result of a provider request', async () => {
      // Mock the request token and timeout
      const requestToken = 'token';
      const timeout = 5000;

      // Mock the waitRpcRequest method
      rpc['waitRpcRequest'] = jest.fn().mockResolvedValueOnce('result');

      // Call the waitRpcRequest method
      const result = await rpc['waitRpcRequest'](requestToken, timeout);

      // Verify the mock method was called with the correct arguments
      expect(rpc['waitRpcRequest']).toHaveBeenCalledWith(requestToken, timeout);

      // Verify the result
      expect(result).toEqual('result');
    });
  });

  describe('sendRpcApiRequest', () => {
    it('should send a request to the Grindery Walletconnect RPC API', async () => {
      // Mock the request method and params
      const method = RpcMethodNames.request;
      const params = { param1: 'value1', param2: 'value2' };
      const expectedResult = 'result';

      // Mock the fetch method result
      global.fetch = jest.fn().mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ result: expectedResult }),
      });

      // Call the sendRpcApiRequest method
      const result = await rpc.sendRpcApiRequest(method, params);

      // Verify the result
      expect(result).toEqual(expectedResult);
    });
  });
});
