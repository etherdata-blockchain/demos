import { ethers, run } from "hardhat";

async function main() {

  await run("compile");

  // We get the contract to deploy
  const FileStorage = await ethers.getContractFactory("FileStorage");
  const file = await FileStorage.deploy();

  await file.deployed();

  console.log("FileStorage deployed to:", file.address);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
