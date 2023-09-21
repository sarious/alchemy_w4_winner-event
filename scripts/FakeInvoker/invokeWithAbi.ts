import { ethers } from "hardhat";

const FAKE_INVOKER_CONTRACT_ADDRESS = "0x..."; // TODO: add the address of deployed contract;
const WINNER_CONTRACT_ADDRESS = "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502";
const CONTRACT_ABI = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "", type: "address" },
    ],
    name: "Winner",
    type: "event",
  },
  {
    inputs: [],
    name: "attempt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const contract = await ethers.getContractAt(
    "FakeInvoker",
    FAKE_INVOKER_CONTRACT_ADDRESS
  );

  const wallet = new ethers.Wallet(
    process.env.ACCOUNT_PRIVATE_KEY ?? "",
    ethers.provider
  );
  const contractWinner = new ethers.Contract(
    WINNER_CONTRACT_ADDRESS,
    CONTRACT_ABI,
    wallet
  );

  const calldata = contractWinner.interface.encodeFunctionData("attempt");
  const tx = await contract.invokeFakeContract(
    WINNER_CONTRACT_ADDRESS,
    calldata
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
