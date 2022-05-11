# Etherdata Blockchain Dapps Demos
List of projects based on Etherdata Blockchain

![logo](./images/learn-blockchain.png)

- [x] [Simple File Upload](https://demos.file-upload.debugchain.net) (or https://demos-eta.vercel.app/) (source: [here](https://github.com/etherdata-blockchain/demos/tree/main/examples/file-upload/))

- [x] [Faucet](https://faucet.debugchain.net/) (source: [here](https://github.com/etherdata-blockchain/demos/tree/main/examples/faucet/)) 

- [x] [Transaction](https://demos.transaction.debugchain.net/) (source: [here](https://github.com/etherdata-blockchain/demos/tree/main/examples/transaction))

- [x] [File Storage](https://demos.personal-storage.debugchain.net/)(source: [here](./examples/personal_storage/) and smart contract: [here](https://github.com/etherdata-blockchain/demos/tree/main/packages/file_storage_contract/))

- [x] [New!] Voting System --- need to set the environment and deploy the contract first in [VotingDapp](packages//VotingDapp/) and set the environment in [Voting_System](examples//Voting_System/). See them in the corresponding file README file.


Install dependencies

```
yarn
```


Test

```
yarn test
```

Start dev server

```
yarn dev
```



## Project structure

```
examples/
├─ faucet/
├─ file-upload/
├─ personal_storage/
├─ transaction/
├─ Voting_System/
packages/
├─ ui/
├─ file_storage_contract/
├─ Voting_System/

```

## Development guide

For more monorepo development info, please refer to [Turbo repo's](https://turborepo.org/) official website. Or [monorepo.tools](https://monorepo.tools/) for more detail explained on monorepo.


1. Create any new smart contract under packages/ folder
2. Create any new app under examples/ folder
3. Add dependency under your examples/YOUR_APP/package.json

The frontend applications are written in React with typescript using [Next.js framework](https://nextjs.org/docs). And all examples are hosted on [Vercel](https://vercel.com/home?utm_source=next-site&utm_medium=banner&utm_campaign=next-website). Please check their offical documentations for more details.