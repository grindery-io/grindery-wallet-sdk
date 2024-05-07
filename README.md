# Grindery Wallet SDK

Grindery Wallet SDK is a library that provides a reliable, secure, and seamless connection from your dapp to the Grindery Smart-Wallet. You can install the SDK in existing dapps, and call any Wallet Provider API methods from your dapp.

Grindery Wallet SDK enables your dapp to provide a seamless user experience for Grindery users, without relying on third-party libraries. By integrating your dapp using the SDK, millions of Telegram users can connect to their preferred Grindery Smart-Wallet. The SDK uses the Grindery Wallet Ethereum provider as specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

## Installing Wallet SDK

Place the script before the `</body>` tag, using this code:

```html
<script src="https://www.grindery.com/hubfs/WalletSDK/grindery-wallet-sdk.umd.production.min.js"></script>
```

### Basic usage

Once the script is connected, a `window.Grindery.WalletSDK` object will become available.

See available SDK properties and methods [here](DOCUMENTATION.md).

### Injected ethereum provider

Grindery Wallet SDK automatically injects Ethereum Provider, that can be accessed via `window.ethereum`.

#### Multiple injected providers

If the user has multiple wallet browser extensions installed that inject ethereum providers (e.g., MetaMask or Coinbase Wallet), Grindery Wallet's injected provider will construct a "multiprovider" array at `window.ethereum.providers` containing the injected provider from each wallet. Grindery Wallet can be identified in this array by the `isGrinderyWallet` property.

## Developing

See (DEVELOPMENT.md)[DEVELOPMENT.md].

## License

MIT
