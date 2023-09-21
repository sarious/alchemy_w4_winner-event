import { ethers } from "hardhat";

const FAKE_INVOKER_CONTRACT_ADDRESS = "0x..."; // TODO: add the address of deployed contract;
const WINNER_CONTRACT_ADDRESS = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";

async function main() {
  const contract = await ethers.getContractAt(
    "FakeInvoker",
    FAKE_INVOKER_CONTRACT_ADDRESS
  );

  const tx = await contract.invokeFakeContract(
    WINNER_CONTRACT_ADDRESS,
    "0x732b7a8d" // 0x + 4bytes(keccak256("attemp()"))
  );

  await tx.wait();

  console.log("Transaction hash: ", tx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
