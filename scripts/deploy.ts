import { ethers } from "hardhat";

const WINNER_CONTRACT_ADDRESS = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";

async function main() {
  const contract = await ethers.deployContract("WinnerAgent", [
    WINNER_CONTRACT_ADDRESS,
  ]);

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
