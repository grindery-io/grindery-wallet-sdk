# Grindery Wallet SDK Changelog

## v0.5.0 (2024-09-27)

- Added [`WalletAPI` class](https://grindery-io.github.io/grindery-wallet-sdk/classes/classes_WalletAPI.WalletAPI.html), a simple wrapper for Grindery Wallet API
- Added [`getUser` SDK method](https://github.com/grindery-io/grindery-wallet-sdk#getting-user-information), allowing to get information about connected Grindery user

## v0.4.2 (2024-08-03)

- Added client events tracking

## v0.4.1 (2024-07-17)

### Fixed

- Fixed Telegram Mini App auto-closing [issue](https://github.com/grindery-io/grindery-wallet-sdk/issues/4) on wallet connection.

## v0.4.0 (2024-07-05)

### Features

- Added `getUserWalletAddress` SDK method, allowing to silently exchange Telegram user ID to EVM wallet address

## v0.3.0 (2024-06-18)

### Added support for BNB and opBNB chains

- Added `eth_chainId` provider method, as specified by [EIP-695](https://eips.ethereum.org/EIPS/eip-695)
- Added `wallet_addEthereumChain` provider method, as specified by [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085)
- Added `wallet_switchEthereumChain` provider method, as specified by [EIP-3326](https://eips.ethereum.org/EIPS/eip-3326)
- Added `chainChanged` provider event, as specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)

## v0.2.0 (2024-05-16)

### Improvements

- Code refactored
- Bundle size reduced

## v0.1.1 (2024-05-15)

### Features

- Added `window` events to announce injected Wallet Provider, as specified by [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963)
