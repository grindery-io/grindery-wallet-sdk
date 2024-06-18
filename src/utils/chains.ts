/**
 * Supported chains list
 *
 * @description Currently supports the following chains: Polygon, BNB Smart Chain, and opBNB Smart Chain
 *
 * @since 0.3.0
 * @type {string[]} Chain ids in CAIP-2 format
 */
export const CHAINS: string[] = ['eip155:137', 'eip155:56', 'eip155:204'];

export const hexChainId = (chainId: string): string => {
  return `0x${parseInt(chainId.split(':')[1], 10).toString(16)}`;
};

export const unhexChainId = (hexChainId: string): string => {
  return `eip155:${parseInt(hexChainId, 16)}`;
};
