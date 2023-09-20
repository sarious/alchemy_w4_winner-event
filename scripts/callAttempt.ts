import { ethers } from "hardhat";

const CONTRACT_ADDRESS = ""; // TODO: add the address of deployed contract;

async function main() {
  const contract = await ethers.getContractAt("WinnerAgent", CONTRACT_ADDRESS);

  const tx = await contract.callAttempt();

  await tx.wait();

  console.log("Transaction hash: ", tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
