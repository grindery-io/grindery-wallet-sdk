# Grindery Wallet SDK

<img src="https://grindery-io.github.io/grindery-wallet-sdk/cover.png" alt="Grindery Wallet Beta" width="320" />

Grindery Wallet SDK is a library that provides a reliable, secure, and seamless connection from your dapp to the <a href="https://www.grindery.com">Grindery Smart-Wallet</a>.

Grindery Wallet SDK enables your dapp to provide a seamless user experience for Grindery users, without relying on third-party libraries. By integrating your dapp using the SDK, millions of Telegram users can connect to their preferred Grindery Smart-Wallet.

> ⚠️ SDK documentation is incomplete, work in progress.

## Table of Contents:

- [Example implementation](#example-implementation)
- [Installing SDK](#installing-sdk)
  - [Browser](#browser)
  - [Node](#node)
- [Basic usage](#basic-usage)
  - [Methods](#sdk-methods)
    - [.connect()](#sdk-methods_connect)
    - [.sendTransaction()](#sdk-methods_sendtransaction)
    - [.signMessage()](#sdk-methods_signmessage)
    - [.on()](#sdk-methods_on)
    - [.removeListener()](#sdk-methods_removelistener)
  - [Properties](#sdk-properties)
    - [.provider](#sdk-props_provider)
- [Advanced usage](#advanced-usage)
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

## Browser

Download SDK from GitHub: [https://github.com/grindery-io/grindery-wallet-sdk](https://github.com/grindery-io/grindery-wallet-sdk)

Extract downloaded archive and copy `dist/grindery-wallet-sdk.umd.production.min.js` file into the root of your project public folder.

Place the script tag before the closing `</head>` tag, using this code:

```html
<script src="grindery-wallet-sdk.umd.production.min.js"></script>
```

> If you are building a [Telegram Mini App](https://core.telegram.org/bots/webapps) - make sure to put Grindery script tag AFTER Telegram script.

## Node

Wallet SDK is a front-end library. It can be installed via node package managers to use with modern frontend frameworks, but it can't be used on the server side.

At least version 18 Node is required.

**Install with NPM:**

```bash
npm install --save grindery-io/grindery-wallet-sdk
```

**Or Yarn:**

```bash
yarn add grindery-io/grindery-wallet-sdk
```

Include module in your code:

```js
import 'grindery-wallet-sdk';
```

# Basic usage

Once the script is loaded, a `window.Grindery.WalletSDK` object will become available.

## SDK methods

### <a id="sdk-methods_connect">WalletSDK.connect()</a>

Initiate connection with the Grindery Wallet. User will be redirected to the Grindery Bot to confirm connection.

**Arguments:** none

**Returns:** Promise resolving with an array of wallet addresses

**Example code:**

```js
async () => {
  const [address] = await window.Grindery.WalletSDK.connect();
};
```

---

### <a id="sdk-methods_sendtransaction">WalletSDK.sendTransaction()</a>

Request transaction from the Grindery Wallet

**Arguments**:

- `params` Object. An object with transaction params:
  - `to` String. Recipient address.
  - `value` String. Optional. Transaction value.
  - `data` String. Optional. Transaction data.

**Returns:** Promise resolving with an array of transaction hashes

**Example code:**

```js
async () => {
  const [txHash] = await window.Grindery.WalletSDK.sendTransaction({
    to: '0x0',
    value: '0x0',
    data: '0x0',
  });
};
```

---

### <a id="sdk-methods_signmessage">WalletSDK.signMessage()</a>

Request presonal signature from the Grindery Wallet

**Arguments**:

- `message` String. A message to sign.

**Returns:** Promise resolving with a signature string

**Example code:**

```js
async () => {
  const signature = await window.Grindery.WalletSDK.signMessage('Hello World');
};
```

---

### <a id="sdk-methods_on">WalletSDK.on()</a>

Subscribe to wallet sdk event

**Arguments**:

- `event` String. An event name.
- `callback` Function. A callback function to fire on the event

**Returns:** WalletSDK class

**Example code:**

```js
window.Grindery.WalletSDK.on('connect', data => {
  console.log(data);
});
```

---

### <a id="sdk-methods_removelistener">WalletSDK.removeListener()</a>

Unsubscribe from wallet sdk event

**Arguments**:

- `event` String. An event name.
- `callback` Function. A callback function

**Returns:** WalletSDK class

**Example code:**

```js
window.Grindery.WalletSDK.removeListener('connect', data => {
  console.log(data);
});
```

---

## SDK properties

### <a id="sdk-props_provider">WalletSDK.provider</a>

Provides access to [Grindery Wallet Ethereum Provider API](#injected-ethereum-provider).

> ⚠️ More SDK documentation coming soon.

# Advanced usage

## Injected Ethereum Provider

Grindery Wallet SDK automatically injects Ethereum Provider API as specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

Provider API can be accessed via `window.ethereum` or `window.Grindery.WalletSDK.provider`.

### Multiple injected providers

If the user has multiple wallet browser extensions installed that inject ethereum providers (e.g., MetaMask or Coinbase Wallet), Grindery Wallet's injected provider will construct a "multiprovider" array at `window.ethereum.providers` containing the injected provider from each wallet. Grindery Wallet can be identified in this array by the `isGrinderyWallet` property.

### Provider Methods

- [eth_requestAccounts](#method_eth_requestaccounts)
- [eth_accounts](#method_eth_accounts)
- [eth_sendTransaction](#method_eth_sendtransaction)
- [personal_sign](#method_personal_sign)

#### Method: <a id="method_eth_requestaccounts">`eth_requestAccounts`</a>

Connect a dApp to the Grindery Wallet.

This method must always be called first, to initate dApp connection and get user's wallet address.

**Request params:** none

**Response result:** Array of Strings. An array with user addresses.

---

#### Method: <a id="method_eth_accounts">`eth_accounts`</a>

Get connected user's wallet addresses.

**Request params:** none

**Response result:** Array of Strings. An array of user addresses.

---

#### Method: <a id="method_eth_sendtransaction">`eth_sendTransaction`</a>

**Request params:**

- `to` String. Required.
- `value` String. Required.
- `data` String. Required.

**Response result:** String. The transaction hash.

---

#### Method: <a id="method_personal_sign">`personal_sign`</a>

**Request params:**

- `data` String. Required.
- `fromAddress` String. Required.

**Response result:** String. The signature.

# SDK Development and building

The SDK library compiled using [TSDX tool](https://tsdx.io/).

See full [development documentation here](DEVELOPMENT.md).

# License

MIT
