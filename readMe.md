# Solana Project

This project contains scripts for interacting with the Solana blockchain. It includes functionality for airdropping SOL, checking balances, transferring SOL, and managing custom SPL tokens.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- Typescript: `npm install -g typescript`
- ts-node: `npm install -g ts-node`

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Ensure you have the Solana CLI installed and configured.

## Scripts

### Airdrop SOL

Airdrop SOL to your wallet.

```bash
npm run airdrop
```

To test after building:

```bash
npm run airdrop:test
```

### Show Balance

Check the balance of your wallet.

```bash
npm run balance
```

To test after building:

```bash
npm run balance:test
```

### Transfer SOL

Transfer SOL between accounts.

```bash
npm run transfer-sol
```

To test after building:

```bash
npm run transfer-sol:test
```

### Manage SPL Token

Create, mint, or transfer SPL tokens.

```bash
npm run token
```

To test after building:

```bash
npm run token:test
```

### Running Solana Local Test Validator

To start a local Solana test validator:

```bash
npm run start-validator
```

Airdrop SOL to your local wallet on the test validator:

```bash
npm run airdrop-validator
```

## Notes

- All the scripts can be run against the Solana Devnet by default.
- Ensure you have enough SOL in your wallet for transactions.

## License

MIT
