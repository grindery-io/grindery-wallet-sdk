# Grindery Wallet SDK

<img src="docs/cover.png" alt="Grindery Wallet Beta" width="320" />

Grindery Wallet SDK is a library that provides a reliable, secure, and seamless connection from your dapp to the Grindery Smart-Wallet.

Grindery Wallet SDK enables your dapp to provide a seamless user experience for Grindery users, without relying on third-party libraries. By integrating your dapp using the SDK, millions of Telegram users can connect to their preferred Grindery Smart-Wallet.

## Table of Contents:

- [Installing SDK](#installing-sdk)
- [Basic usage](#basic-usage)
- [Injected Ethereum Provider](#injected-ethereum-provider)
  - [eth_requestAccounts](#method_eth_requestaccounts)
  - [checkout_requestPairing](#method_checkout_requestpairing)
  - [checkout_waitForPairingResult](#method_checkout_waitforpairingresult)
  - [eth_accounts](#method_eth_accounts)
  - [eth_sendTransaction](#method_eth_sendtransaction)
  - [personal_sign](#method_personal_sign)
- [Example implementation](#example-implementation)
- [SDK Development](#sdk-development)
  - [Commands](#commands)
  - [Configuration](#configuration)
    - [Jest](#jest)
    - [Bundle Analysis](#bundle-analysis)
      - [Setup Files](#setup-files)
    - [Rollup](#rollup)
    - [TypeScript](#typescript)
  - [Continuous Integration](#continuous-integration)
    - [GitHub Actions](#github-actions)
  - [Optimizations](#optimizations)
  - [Module Formats](#module-formats)
  - [Named Exports](#named-exports)
  - [Including Styles](#including-styles)
  - [Publishing to NPM](#publishing-to-npm)
- [License](#license)

# Installing SDK

Place the script before the closing `</head>` tag, using this code:

```html
<script src="grindery-wallet-sdk.umd.production.min.js"></script>
```

> If you are building a [Telegram Mini App](https://core.telegram.org/bots/webapps) - make sure to put Grindery script tag BELOW Telegram script.

# Basic usage

Once the script is loaded, a `window.Grindery.WalletSDK` object will become available.

## Wallet SDK properties

---

### WalletSDK.provider

Provides access to [Grindery Wallet Injected Ethereum Provider](#injected-ethereum-provider) API as specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

> More SDK documentation coming soon.

# Injected Ethereum Provider

Grindery Wallet SDK automatically injects an Ethereum Provider,

Provider can be accessed via `window.ethereum` or `window.Grindery.WalletSDK.provider`.

## Multiple injected providers

If the user has multiple wallet browser extensions installed that inject ethereum providers (e.g., MetaMask or Coinbase Wallet), Grindery Wallet's injected provider will construct a "multiprovider" array at `window.ethereum.providers` containing the injected provider from each wallet. Grindery Wallet can be identified in this array by the `isGrinderyWallet` property.

## Provider Methods

- [eth_requestAccounts](#method_eth_requestaccounts)
- [checkout_requestPairing](#method_checkout_requestpairing)
- [checkout_waitForPairingResult](#method_checkout_waitforpairingresult)
- [eth_accounts](#method_eth_accounts)
- [eth_sendTransaction](#method_eth_sendtransaction)
- [personal_sign](#method_personal_sign)

---

### Method: <a id="method_eth_requestaccounts">`eth_requestAccounts`</a>

Connect a dApp to the Grindery Wallet.

This method must always be called first, to initate dApp connection and get user's wallet address.

> The method internally uses `checkout_requestPairing` and `checkout_waitForPairingResult` methods.

**Request params:** none

**Response result:** Array of Strings. An array with user addresses.

---

### Method: <a id="method_eth_accounts">`eth_accounts`</a>

Get connected user's wallet addresses.

**Request params:** none

**Response result:** Array of Strings. An array of user addresses.

---

### Method: <a id="method_checkout_requestpairing">`checkout_requestPairing`</a>

Connect new dApp.

**Request params:** none

**Response result:**

- `pairingToken` String. A token required to request pairing result.
- `connectUrl` String. An URL to redirect user to initiate dApp connection.
- `connectUrlBrowser` String. An URL to redirect user to initiate dApp connection.

---

### Method: <a id="method_checkout_waitforpairingresult">`checkout_waitForPairingResult`</a>

Wait for pairing requst to be approved by user and get result.

**Request params:**

- `pairingToken` String. Required. A pairing token received from [checkout_requestPairing](#method_checkout_requestpairing) method.
- `timeout` Number. Optional. Polling timeout.

**Response result:**

- `sessionId` String. A session ID required to identify provider requests.

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

---

# Example implementation

See an example implementation in [docs/example/index.html](docs/example/index.html)

# SDK Development

The SDK library compiled using [TSDX tool](https://tsdx.io/).

## Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).

# License

[MIT](LICENSE)
