# Grindery Wallet SDK Documentation

Grindery Wallet SDK is a library that provides a reliable, secure, and seamless connection from your dapp to the Grindery Smart-Wallet. You can install the SDK in existing dapps, and call any Wallet Provider API methods from your dapp.

- [Installing SDK](#installing-sdk)
- [Basic usage](#basic-usage)
- [Injected Ethereum Provider](#injected-ethereum-provider)
  - [eth_requestAccounts](#method_eth_requestAccounts)
  - [eth_accounts](#method_eth_accounts)
  - [wallet_pair](#method_wallet_pair)
  - [eth_sendTransaction](#method_eth_sendTransaction)
  - [personal_sign](#method_personal_sign)
- [Example](#example-implementation)

## Installing SDK

Place the script before the `</body>` tag, using this code:

```html
<script src="https://www.grindery.com/hubfs/WalletSDK/grindery-wallet-sdk.umd.production.min.js"></script>
```

## Basic usage

Once the script is loaded, a `window.Grindery.WalletSDK` object will become available.

### Wallet SDK properties

---

#### WalletSDK.provider

Provides access to [Grindery Wallet Injected Ethereum Provider](#injected-ethereum-provider) API as specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

> More SDK documentation coming soon.

## Injected Ethereum Provider

Grindery Wallet SDK automatically injects an Ethereum Provider,

Provider can be accessed via `window.ethereum` or `window.Grindery.WalletSDK.provider`.

### Multiple injected providers

If the user has multiple wallet browser extensions installed that inject ethereum providers (e.g., MetaMask or Coinbase Wallet), Grindery Wallet's injected provider will construct a "multiprovider" array at `window.ethereum.providers` containing the injected provider from each wallet. Grindery Wallet can be identified in this array by the `isGrinderyWallet` property.

### Provider Methods

- [eth_requestAccounts](#method_eth_requestAccounts)
- [eth_accounts](#method_eth_accounts)
- [wallet_pair](#method_wallet_pair)
- [eth_sendTransaction](#method_eth_sendTransaction)
- [personal_sign](#method_personal_sign)

---

#### Method: <a id="method_eth_requestAccounts">`eth_requestAccounts`</a>

Connect a dApp to the Grindery Wallet.

This method must always be called first, to initate dApp connection and get user's wallet address.

> The method internally uses `wallet_pair` method.

**Request params:**

- `userId` String. Optional. Telegram user id (if detected).

**Authentication:** optional

**Response result:** Array of Strings. An array with user addresses.

---

#### Method: <a id="method_eth_accounts">`eth_accounts`</a>

Get connected user's wallet addresses.

**Request params:** none

**Authentication:** required

**Response result:** Array of Strings. An array of user addresses.

---

#### Method: <a id="method_wallet_pair">`wallet_pair`</a>

Connect new dApp, or verify existing connection.

**Request params:**

- `userId` String. Optional. Telegram user id (if detected).

**Authentication:** optional

**Response result:**

- `success` Boolean. Required. `true` if dApp has already been connected and connection is valid.
- `connectUrl` String. Optional. An URL to redirect user to initiate dApp connection, if has not been connected yet.
- `address` String. Optional. A wallet address if the user has approved the connection.
- `accessToken` String. Optional. An access token if the user has approved the connection. If the access token received, then it must be stored locally and included in all future requests to identify the connection.

---

#### Method: <a id="method_eth_sendTransaction">`eth_sendTransaction`</a>

**Request params:**

- `to` String. Required.
- `value` String. Required.
- `data` String. Required.

**Authentication:** required

**Response result:** String. The transaction hash.

---

#### Method: <a id="method_personal_sign">`personal_sign`</a>

**Request params:**

- `data` String. Required.
- `fromAddress` String. Required.

**Authentication:** required

**Response result:** String. The signature.

---

## Example implementation

See an example implementation in [example/index.html](example/index.html)
