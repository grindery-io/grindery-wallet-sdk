# Grindery Wallet SDK

<img src="https://grindery-io.github.io/grindery-wallet-sdk/cover.png" alt="Grindery Wallet Beta" width="320" />

Grindery Wallet SDK is a library that provides a reliable, secure, and seamless connection from your dapp to the <a href="https://www.grindery.com">Grindery Smart-Wallet</a>.

Grindery Wallet SDK enables your dapp to provide a seamless user experience for Grindery users, without relying on third-party libraries. By integrating your dapp using the SDK, millions of Telegram users can connect to their preferred Grindery Smart-Wallet.

## Table of Contents:

- [Example implementation](#example-implementation)
- [Installing SDK](#installing-sdk)
- [Basic usage](#basic-usage)
- [Injected Ethereum Provider](#injected-ethereum-provider)
  - [eth_requestAccounts](#method_eth_requestaccounts)
  - [eth_accounts](#method_eth_accounts)
  - [eth_sendTransaction](#method_eth_sendtransaction)
  - [personal_sign](#method_personal_sign)
- [SDK development and building](#sdk-development-and-building)
- [License](#license)

# Example implementation

See an example implementation here: [https://grindery-io.github.io/grindery-wallet-sdk/example](https://grindery-io.github.io/grindery-wallet-sdk/example).

# Installing SDK

Place the script before the closing `</head>` tag, using this code:

```html
<script src="grindery-wallet-sdk.umd.production.min.js"></script>
```

> If you are building a [Telegram Mini App](https://core.telegram.org/bots/webapps) - make sure to put Grindery script tag BELOW Telegram script.

# Basic usage

Once the script is loaded, a `window.Grindery.WalletSDK` object will become available.

## Wallet SDK properties

### WalletSDK.provider

Provides access to [Grindery Wallet Ethereum Provider API](#injected-ethereum-provider).

> ⚠️ More SDK documentation coming soon.

# Injected Ethereum Provider

Grindery Wallet SDK automatically injects Ethereum Provider API as specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

Provider API can be accessed via `window.ethereum` or `window.Grindery.WalletSDK.provider`.

## Multiple injected providers

If the user has multiple wallet browser extensions installed that inject ethereum providers (e.g., MetaMask or Coinbase Wallet), Grindery Wallet's injected provider will construct a "multiprovider" array at `window.ethereum.providers` containing the injected provider from each wallet. Grindery Wallet can be identified in this array by the `isGrinderyWallet` property.

## Provider Methods

- [eth_requestAccounts](#method_eth_requestaccounts)
- [eth_accounts](#method_eth_accounts)
- [eth_sendTransaction](#method_eth_sendtransaction)
- [personal_sign](#method_personal_sign)

### Method: <a id="method_eth_requestaccounts">`eth_requestAccounts`</a>

Connect a dApp to the Grindery Wallet.

This method must always be called first, to initate dApp connection and get user's wallet address.

> The method internally uses [`checkout_requestPairing`](#method_checkout_requestpairing) and [`checkout_waitForPairingResult`](#method_checkout_waitforpairingresult) methods.

**Request params:** none

**Response result:** Array of Strings. An array with user addresses.

---

### Method: <a id="method_eth_accounts">`eth_accounts`</a>

Get connected user's wallet addresses.

**Request params:** none

**Response result:** Array of Strings. An array of user addresses.

---

### Method: <a id="method_eth_sendtransaction">`eth_sendTransaction`</a>

**Request params:**

- `to` String. Required.
- `value` String. Required.
- `data` String. Required.

**Response result:** String. The transaction hash.

---

### Method: <a id="method_personal_sign">`personal_sign`</a>

**Request params:**

- `data` String. Required.
- `fromAddress` String. Required.

**Response result:** String. The signature.

# SDK Development and building

The SDK library compiled using [TSDX tool](https://tsdx.io/).

See full [development documentation here](DEVELOPMENT.md).

# License

MIT
