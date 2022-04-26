const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

async function main() {

  await run("compile");

  // We get the contract to deploy
  const Votes = await ethers.getContractFactory("Votes");
  const VotesContract = await Votes.deploy();

  await VotesContract.deployed();

  console.log("Voting System deployed to:", VotesContract.address);

}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
