# Voting System Demo Using Etherdata Blockchain

This package use [VotingDapp](../../packages//VotingDapp/) to support voting on the blockchain.

## Set up
Create a `.env` file with following fields

```
RPC_URL=
NEXT_PUBLIC_FILE_URL=
NEXT_PUBLIC_CONTRACT_ADDRESS=
```

## Quick run the demo
Install dependencies
```
yarn
```

Start dev server

```
yarn dev
```

## Supported Functions
1. Initialize candidates on the blockchain
2. Iteract with the front-end to obtain total number of candidtes and their details
3. Vote for a specific candidate using the Etherdata blockchain
