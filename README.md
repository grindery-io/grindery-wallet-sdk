**Grindery Wallet SDK** is a JS library that provides a reliable, secure, and seamless connection from your dapp to the <a href="https://www.grindery.com">Grindery Smart-Wallet</a>.

<img src="cover.png" alt="Grindery Wallet Beta" style="max-width: 100%; width: 100%; height: auto;" />

The SDK enables your dapp to provide a seamless user experience for Grindery users, without relying on third-party libraries. By integrating your dapp using the SDK, millions of users can connect the dapp to their Grindery Smart-Wallet.

## Table of Contents:

- [Example implementation](#example-implementation)
- [Installing SDK](#installing-sdk)
  - [Browser](#browser)
  - [Node](#node)
- [Basic usage](#basic-usage)
  - [Server connection](#server-connection)
  - [Wallet connection](#wallet-connection)
  - [Silently getting wallet address](#silently-getting-wallet-address)
  - [Sending transactions](#sending-transactions)
  - [Signing](#signing)
  - [Chain switching](#chain-switching)
  - [Getting user information](#getting-user-information)
- [Advanced usage](#advanced-usage)
  - [Full documentation](#full-documentation)
  - [Injected Ethereum Provider](#injected-ethereum-provider)
  - [Using Wallet API](#using-wallet-api)
- [Changelog](#changelog)
- [SDK development and building](#sdk-development-and-building)
- [License](#license)

# Example implementation

See an example implementation here: [https://grindery-io.github.io/grindery-wallet-sdk/example](https://grindery-io.github.io/grindery-wallet-sdk/example).

# Installing SDK

## Obtain App ID

To interact with Grindery Wallet your app needs to be registered first.

Go to the [Grindery Wallet](https://t.me/GrinderyAIBot) and use `/checkout_registerapp` command to register an app obtain an App Id.

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

Once the script is loaded, a [`window.Grindery.WalletSDK`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html) object will become available:

```typescript
const WalletSDK = window.Grindery?.WalletSDK;
```

> Make sure to configre your app id before calling SDK methods. See [here](#obtain-app-id) how to obtain an app id.

## Server connection

The SDK automatically connects to the server when page is loaded. You can check connection status using [`isConnected()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#isConnected) method:

```typescript
const isConnected: boolean = WalletSDK.isConnected();
```

You can listen for SDK [`connect`](https://grindery-io.github.io/grindery-wallet-sdk/enums/classes_EventEmitter.ProviderEvents.html#connect) event to catch server connection event:

```typescript
WalletSDK.on('connect', (chainId: string) => {
  if (WalletSDK.isConnected()) {
    console.log(`Wallet SDK is connected to ${chainId} chain`);
  }
});
```

## Wallet connection

To initiate connection to the Grindery Wallet use [`connect()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#connect) method, in response to user's action:

```typescript
// Get your "connect" button element
const button = document.getElementById('your-connect-button-id');

// Add event listener to handle button clicks
button.addEventListener('click', async () => {
  // Call `connect` method in response to user's click
  const [address]: string[] = await WalletSDK.connect();
});
```

> It is important to use `connect()` method only in response to user's action, to avoid connection approval popup being blocked by the browser.

In case the popup has been blocked, it is recommended to listen for `pairing` event and show a connection link to the user. For example:

```typescript
WalletSDK.on(
  'pair',
  ({
    config,
    shortToken,
    connectUrl,
    connectUrlBrowser,
    miniAppPairingToken,
  }: {
    config: WalletSDKConfig;
    shortToken: string;
    connectUrl: string;
    connectUrlBrowser: string;
    miniAppPairingToken: string;
  }) => {
    document.getElementById(
      'connect-link'
    ).innerHTML = `<a href="${connectUrlBrowser}" target="_blank">Click here if you weren't redirected automatically</a>`;
  }
);
```

Listen for SDK [`accountsChanged`](https://grindery-io.github.io/grindery-wallet-sdk/enums/classes_EventEmitter.ProviderEvents.html#accountsChanged) event, to catch when user's wallet is connected:

```typescript
WalletSDK.on('accountsChanged', (addresses: string[]) => {
  console.log('accountsChanged', addresses);
});
```

To disconnect user's wallet use [`disconnect()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#disconnect) method (and you can listen for [`disconnect`](https://grindery-io.github.io/grindery-wallet-sdk/enums/classes_EventEmitter.ProviderEvents.html#disconnect) event):

```typescript
WalletSDK.on('disconnect',  => {
  console.log('Wallet disconnected');
});

WalletSDK.disconnect();
```

## Silently getting wallet address

The SDK allows dApps to exchange user ID to user's EVM wallet address.

The method doesn't require user to go through the [wallet connection process](#wallet-connection), and can be executed silently in the background. However, without fully connected wallet a dApp has read-only access, and can't request message signing or transactions sending. To do this ask user to connect the wallet first.

```typescript
WalletSDK.on('connect', async () => {
  const userId = '123456';
  const userWallet = await WalletSDK.getUserWalletAddress(userId);
});
```

## Sending transactions

To request transaction sending use [`sendTransaction()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#sendTransaction) method, once the wallet is connected:

```typescript
WalletSDK.on('accountsChanged', async (addresses: string[]) => {
  const transactionHash = await WalletSDK.sendTransaction({
    to: '0x0', // required
    value: '', // optional
    data: '', // optional
  });
});
```

## Signing

To sing a custom message using personal signature use [`signMessage()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#signMessage) method, once the wallet is connected:

```typescript
WalletSDK.on('accountsChanged', async (addresses: string[]) => {
  const signature = await WalletSDK.signMessage('Custom message to sign');
});
```

## Chain switching

To switch the network use [`switchChain()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#switchChain) method, once the wallet is connected:

```typescript
WalletSDK.on('chainChanged', (chainId: string) => {
  console.log('chainId', chainId);
});
WalletSDK.switchChain('eip155:137');
```

To get the current network use [`getChain()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#getChain) method, once the wallet is connected:

```typescript
WalletSDK.on('accountsChanged', () => {
  console.log('chainId', WalletSDK.getChain());
});
```

## Getting user information

To get information about connected Grindery Wallet User use [`getUser()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#getUser) method, once the wallet is connected:

```typescript
WalletSDK.on('accountsChanged', async () => {
  console.log('user', await WalletSDK.getUser());
});
```

# Advanced usage

## Full documentation

See full documentation here: [https://grindery-io.github.io/grindery-wallet-sdk](https://grindery-io.github.io/grindery-wallet-sdk)

## Injected Ethereum Provider

Grindery Wallet SDK automatically injects Ethereum Provider API as specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

Provider API can be accessed via `window.ethereum` or `window.Grindery.WalletSDK.provider`.

### Multiple injected providers

If the user has multiple wallet browser extensions installed that inject ethereum providers (e.g., MetaMask or Coinbase Wallet), Grindery Wallet's injected provider will construct a "multiprovider" array at `window.ethereum.providers` containing the injected provider from each wallet. Grindery Wallet can be identified in this array by the `isGrinderyWallet` property.

Alternativelly you can detect wallet by listenting to provider announcement events as specified by [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963).

### Provider Methods

- [eth_requestAccounts](#method-eth_requestaccounts)
- [eth_accounts](#method-eth_accounts)
- [eth_sendTransaction](#method-eth_sendtransaction)
- [personal_sign](#method-personal_sign)
- [eth_chainId](#method-eth_chainid)
- [wallet_switchEthereumChain](#method-wallet_switchethereumchain)

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

#### Method: `eth_chainId`

**Request params:** none

**Response result:** String. Integer ID of the chain as a hexadecimal string, per the `eth_chainId` Ethereum RPC method.

#### Method: `wallet_switchEthereumChain`

**Request params:**

- `chainId` String. Required. Integer ID of the chain as a hexadecimal string, per the `eth_chainId` Ethereum RPC method.

**Response result:** `null` on success.

## Using Wallet API

You can use the SDK to make requests to the Grindery Wallet JSON-RPC API. Use [`sendWalletApiRequest()`](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletSDK.WalletSDK.html#sendWalletApiRequest) method, once the wallet is connected:

```typescript
WalletSDK.on('accountsChanged', async () => {
  // send `gw_getMe` method request
  console.log('result', await WalletSDK.sendWalletApiRequest('gw_getMe', {}));
});
```

> The full list of available JSON-RPC API methods and parameters are coming soon.

# Changelog

See full [changelog here](https://github.com/grindery-io/grindery-wallet-sdk/blob/main/CHANGELOG.md).

# SDK Development and building

The SDK library compiled using [DTS tool](https://github.com/weiran-zsd/dts-cli) (a fork of [TSDX](https://tsdx.io/)).

See full [development documentation here](https://github.com/grindery-io/grindery-wallet-sdk/blob/main/DEVELOPMENT.md).

# License

MIT
