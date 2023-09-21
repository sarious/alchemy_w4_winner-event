import { ethers } from "hardhat";

async function main() {
  const contract = await ethers.deployContract("FakeWinner");

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`Contract was deployed to ${contractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
