/**
 * Represents the assets needed to display a wallet
 *
 * @since 0.1.1
 * @link https://eips.ethereum.org/EIPS/eip-6963#provider-info
 */
export interface EIP6963ProviderInfo {
    uuid: string;
    name: string;
    /**
     * Data URI as defined in RFC-2397.
     *
     * The image SHOULD be a square with 96x96px minimum resolution.
     * The image format is RECOMMENDED to be either lossless or vector based such as PNG, WebP or SVG.
     * @link https://eips.ethereum.org/EIPS/eip-6963#imagesicons
     */
    icon: string;
    /**
     * MUST BE a valid RFC-1034 Domain Name
     * @link https://eips.ethereum.org/EIPS/eip-6963#rdns
     */
    rdns: string;
}
export declare const providerInfo: EIP6963ProviderInfo;
