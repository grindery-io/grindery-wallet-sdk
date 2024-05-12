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
  - [Properties](#sdk-properties)
    - [provider](#sdk-props_provider)
  - [Methods](#sdk-methods)
    - [isConnected()](#sdk-methods_isconnected)
    - [isWalletConnected()](#sdk-methods_iswalletconnected)
    - [setAppId()](#sdk-methods_setappid)
    - [connect()](#sdk-methods_connect)
    - [disconnect()](#sdk-methods_disconnect)
    - [sendTransaction()](#sdk-methods_sendtransaction)
    - [signMessage()](#sdk-methods_signmessage)
    - [on()](#sdk-methods_on)
    - [removeListener()](#sdk-methods_removelistener)
  - [Events](#sdk-events)
    - [connect](#sdk-events_connect)
    - [disconnect](#sdk-events_disconnect)
    - [accountsChanged](#sdk-events_accountschanged)
    - [pair](#sdk-events_pair)
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

## Obtain App ID

Go to the [Grindery Bot](https://t.me/GrinderyAIBot) and use `/checkout_registerapp` command to obtain an App Id.

App Id is required, as it allows Grindery Wallet users to recognize reqests made from your app.

> For demo and testing you can use Demo App Id: `763d2695-d237-45fe-bfe8-2e4e26ff707b`

## Browser

### CDN

Place the script tag before the closing `</head>` tag, using this code:

```html
<script
  data-app-id="your-app-id"
  src="https://grindery-io.github.io/grindery-wallet-sdk/example/dist/grindery-wallet-sdk.umd.production.min.js"
></script>
```

### Download

Download SDK from GitHub: [https://github.com/grindery-io/grindery-wallet-sdk](https://github.com/grindery-io/grindery-wallet-sdk)

Extract downloaded archive and copy `dist/grindery-wallet-sdk.umd.production.min.js` file into the root of your project public folder.

Place the script tag before the closing `</head>` tag, using this code:

```html
<script
  data-app-id="your-app-id"
  src="grindery-wallet-sdk.umd.production.min.js"
></script>
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

// set app id
window.Grindery.WalletSDK.setAppId('your-app-id');
```

Alternatively you can set the app id before importing the sdk via `window.Grindery` object. This can be useful to share the app id between multiple Grindery scripts:

```js
window.Grindery.appId = 'your-app-id';
```

Then later in your code include the sdk:

```js
import 'grindery-wallet-sdk';
```

# Basic usage

Once the script is loaded, a `window.Grindery.WalletSDK` object will become available.

> Make sure to configre your app id before calling SDK methods. See here how to obtain an app id.

## SDK properties

### <a id="sdk-props_provider">WalletSDK.provider</a>

Provides access to [Grindery Wallet Ethereum Provider API](#injected-ethereum-provider).

**Example code:**

```js
const provider = window.Grindery.WalletSDK.provider;
```

## SDK methods

- [isConnected()](#sdk-methods_isconnected)
- [isWalletConnected()](#sdk-methods_iswalletconnected)
- [setAppId()](#sdk-methods_setappid)
- [connect()](#sdk-methods_connect)
- [disconnect()](#sdk-methods_disconnect)
- [sendTransaction()](#sdk-methods_sendtransaction)
- [signMessage()](#sdk-methods_signmessage)
- [on()](#sdk-methods_on)
- [removeListener()](#sdk-methods_removelistener)

### <a id="sdk-methods_isconnected">WalletSDK.isConnected()</a>

Indicates whether the SDK is connected to the server and ready to be used.

**Arguments:** none

**Returns:** Boolean. True if the provider is connected to the server.

**Example code:**

```js
const isConnected = window.Grindery.WalletSDK.isConnected();
```

---

### <a id="sdk-methods_iswalletconnected">WalletSDK.isWalletConnected()</a>

Indicates whether the SDK is connected to the server and Grindery Wallet.

**Arguments:** none

**Returns:** Boolean. True if the provider is connected to the server and user's wallet.

**Example code:**

```js
const isWalletConnected = window.Grindery.WalletSDK.isWalletConnected();
```

---

### <a id="sdk-methods_setappid">WalletSDK.setAppId()</a>

Sets the App Id. See [app id obtaining](#obtain-app-id) section for details.

**Arguments:** String. App id.

**Returns:** App id

**Example code:**

```js
const appId = window.Grindery.WalletSDK.setAppId('your-app-id');
```

---

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

### <a id="sdk-methods_connect">WalletSDK.disconnect()</a>

Disconnects app from the Grindery Wallet.

**Arguments:** none

**Returns:** Empty promise resolving when the app is disconnected from the wallet.

**Example code:**

```js
window.Grindery.WalletSDK.disconnect().then(() => {
  console.log('disconnected');
});
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

## SDK events

- [connect](#sdk-events_connect)
- [disconnect](#sdk-events_disconnect)
- [accountsChanged](#sdk-events_accountschanged)
- [pair](#sdk-events_pair)

### <a id="sdk-events_connect">`connect`</a>

Event emitted when Wallet SDK is connected to the server and able to submit requests. We recommend listening to this event to determine when the SDK is connected.

**Event data:** Object. Information about current SDK connection.

- `chainId` String. Id of the currently connected blockchain in hex format.

**Example code:**

```js
window.Grindery.WalletSDK.on('connect', data => {
  console.log('connect', data);
});
```

---

### <a id="sdk-events_disconnect">`disconnect`</a>

Event emitted when Wallet SDK disconnected from the server and unable to submit requests.

**Event data:** Provider Error object.

**Example code:**

```js
window.Grindery.WalletSDK.on('disconnect', data => {
  console.log('disconnect', data);
});
```

---

### <a id="sdk-events_accountschanged">`accountsChanged`</a>

Event emitted when connected wallet address changes.

**Event data:** Array of Strings. Array of the wallet addresses.

**Example code:**

```js
window.Grindery.WalletSDK.on('accountsChanged', data => {
  console.log('accountsChanged', data);
});
```

---

### <a id="sdk-events_pair">`pair`</a>

Event emitted when SDK requests the wallet connection.

> SDK will try to automatically redirect user to the connection page when `WalletSDK.connect()` method is called. However we recommend to listen for this event to get the connection page URL and show it to the user.

**Event data:** Object:

- `connectUrl` String. Telegram URI.
- `connectUrlBrowser` String. Browser URL.
- `shortToken` String. Connection token.

**Example code:**

```js
window.Grindery.WalletSDK.on('pairing', data => {
  console.log('pairing', data);
});
```

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
