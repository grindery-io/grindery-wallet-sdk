/**
 * Supported chains list
 *
 * @description Currently supports the following chains: Polygon, BNB Smart Chain, and opBNB Smart Chain
 *
 * @since 0.3.0
 * @type {string[]} Chain ids in CAIP-2 format
 */
export declare const CHAINS: string[];
export declare const hexChainId: (chainId: string) => string;
export declare const unhexChainId: (hexChainId: string) => string;
