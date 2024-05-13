**Grindery Wallet SDK** is a JS library that provides a reliable, secure, and seamless connection from your dapp to the <a href="https://www.grindery.com">Grindery Smart-Wallet</a>.

<img src="cover.png" alt="Grindery Wallet Beta" style="max-width: 100%; width: 100%; height: auto;" />

[![GitHub package.json dynamic](https://img.shields.io/github/package-json/version/grindery-io/grindery-wallet-sdk)](https://github.com/grindery-io/grindery-wallet-sdk/blob/main/package.json#L4)
[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/grindery-io/grindery-wallet-sdk/main.yml)](https://github.com/grindery-io/grindery-wallet-sdk/actions)
[![GitHub Issues or Pull Requests](https://img.shields.io/github/issues/grindery-io/grindery-wallet-sdk)](https://github.com/grindery-io/grindery-wallet-sdk/issues)
![GitHub file size in bytes](https://img.shields.io/github/size/grindery-io/grindery-wallet-sdk/dist%2Fgrindery-wallet-sdk.cjs.production.min.js)
[![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/grindery-io/grindery-wallet-sdk/total)](https://github.com/grindery-io/grindery-wallet-sdk/releases)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fgrindery-io.github.io%2Fgrindery-wallet-sdk%2Fexample%2F&label=Example%20website&link=https%3A%2F%2Fgrindery-io.github.io%2Fgrindery-wallet-sdk%2Fexample%2F)](https://grindery-io.github.io/grindery-wallet-sdk/example)
[![GitHub License](https://img.shields.io/github/license/grindery-io/grindery-wallet-sdk)](https://github.com/grindery-io/grindery-wallet-sdk/blob/main/LICENSE)

The SDK enables your dapp to provide a seamless user experience for Grindery users, without relying on third-party libraries. By integrating your dapp using the SDK, millions of Telegram users can connect the dapp to their Grindery Smart-Wallet.

## Table of Contents:

- [Example implementation](#example-implementation)
- [Installing SDK](#installing-sdk)
  - [Browser](#browser)
  - [Node](#node)
- [Basic usage](#basic-usage)
  - [Server connection](#server-connection)
  - [Wallet connection](#wallet-connection)
  - [Sending transactions](#sending-transactions)
  - [Signing](#signing)
- [Advanced usage](#advanced-usage)
  - [Injected Ethereum Provider](#injected-ethereum-provider)
- [SDK development and building](#sdk-development-and-building)
- [License](#license)

# Example implementation

See an example implementation here: [https://grindery-io.github.io/grindery-wallet-sdk/example](https://grindery-io.github.io/grindery-wallet-sdk/example).

# Installing SDK

## Obtain App ID

To interact with Grindery Wallet your app needs to be registered first.

Go to the [Grindery Bot](https://t.me/GrinderyAIBot) and use `/checkout_registerapp` command to register an app obtain an App Id.

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

Once the script is loaded, a [`window.Grindery.WalletSDK`](https://grindery-io.github.io/grindery-wallet-sdk/classes/sdk_GrinderyWalletSDK.GrinderyWalletSDK.html) object will become available:

```typescript
const WalletSDK = window.Grindery?.WalletSDK;
```

> Make sure to configre your app id before calling SDK methods. See [here](#obtain-app-id) how to obtain an app id.

## Server connection

The SDK automatically connects to the server when page is loaded. You can check connection status using [`isConnected()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/sdk_GrinderyWalletSDK.GrinderyWalletSDK.html#isConnected) method:

```typescript
const isConnected: boolean = WalletSDK.isConnected();
```

You can listen for SDK [`connect`](https://grindery-io.github.io/grindery-wallet-sdk/enums/provider_WalletProviderEventEmitter.ProviderEvents.html#connect) event to catch server connection event:

```typescript
WalletSDK.on.('connect', (chainId: string) => {
  if(WalletSDK.isConnected()){
    console.log(`Wallet SDK is connected to ${chainId} chain`)
  }
});
```

## Wallet connection

To initiate connection to the Grindery Wallet use [`connect()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/sdk_GrinderyWalletSDK.GrinderyWalletSDK.html#connect) method:

```typescript
WalletSDK.on.('connect', async () => {
  const [address]: string[] = await WalletSDK.connect();
});
```

You can listen for SDK [`accountsChanged`](https://grindery-io.github.io/grindery-wallet-sdk/enums/provider_WalletProviderEventEmitter.ProviderEvents.html#accountsChanged) event, to catch when user's wallet is connected:

```typescript
WalletSDK.on.('accountsChanged', (addresses: string[]) => {
  console.log('accountsChanged', addresses);
});
```

To disconnect user's wallet use [`disconnect()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/sdk_GrinderyWalletSDK.GrinderyWalletSDK.html#disconnect) method (and you can listen for [`disconnect`](https://grindery-io.github.io/grindery-wallet-sdk/enums/provider_WalletProviderEventEmitter.ProviderEvents.html#disconnect) event):

```typescript
WalletSDK.on.('disconnect',  => {
  console.log('Wallet disconnected');
});

WalletSDK.disconnect();
```

## Sending transactions

To request transaction sending use [`sendTransaction()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/sdk_GrinderyWalletSDK.GrinderyWalletSDK.html#sendTransaction) method, once the wallet is connected:

```typescript
WalletSDK.on.('accountsChanged', async (addresses: string[]) => {
  const transactionHash = await WalletSDK.sendTransaction({
    to: "0x0", // required
    value: "", // optional
    data: "" // optional
  });
});
```

## Signing

To sing a custom message using personal signature use [`signMessage()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/sdk_GrinderyWalletSDK.GrinderyWalletSDK.html#signMessage) method, once the wallet is connected:

```typescript
WalletSDK.on.('accountsChanged', async (addresses: string[]) => {
  const signature = await WalletSDK.signMessage("Custom message to sign");
});
```

# Advanced usage

## Injected Ethereum Provider

Grindery Wallet SDK automatically injects Ethereum Provider API as specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

Provider API can be accessed via `window.ethereum` or `window.Grindery.WalletSDK.provider`.

### Multiple injected providers

If the user has multiple wallet browser extensions installed that inject ethereum providers (e.g., MetaMask or Coinbase Wallet), Grindery Wallet's injected provider will construct a "multiprovider" array at `window.ethereum.providers` containing the injected provider from each wallet. Grindery Wallet can be identified in this array by the `isGrinderyWallet` property.

### Provider Methods

- [eth_requestAccounts](#method-eth_requestaccounts)
- [eth_accounts](#method-eth_accounts)
- [eth_sendTransaction](#method-eth_sendtransaction)
- [personal_sign](#method-personal_sign)

#### Method: `eth_requestAccounts`

Connect a dApp to the Grindery Wallet.

This method must always be called first, to initate dApp connection and get user's wallet address.

**Request params:** none

**Response result:** Array of Strings. An array with user addresses.

---

#### Method: `eth_accounts`

Get connected user's wallet addresses.

**Request params:** none

**Response result:** Array of Strings. An array of user addresses.

---

#### Method: `eth_sendTransaction`

**Request params:**

- `to` String. Required.
- `value` String. Required.
- `data` String. Required.

**Response result:** String. The transaction hash.

---

#### Method: `personal_sign`

**Request params:**

- `data` String. Required.
- `fromAddress` String. Required.

**Response result:** String. The signature.

# SDK Development and building

The SDK library compiled using [DTS tool](https://github.com/weiran-zsd/dts-cli) (a fork of [TSDX](https://tsdx.io/)).

See full [development documentation here](https://github.com/grindery-io/grindery-wallet-sdk/blob/main/DEVELOPMENT.md).

# License

MIT
