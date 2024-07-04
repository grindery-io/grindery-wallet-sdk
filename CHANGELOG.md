# Grindery Wallet SDK Changelog

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
