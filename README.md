# Winner Event Project

The goal is simple: emit the winner event on this smart contract on the Goerli testnet: https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502#code

# Solution 1.

The simplest way to communicate with another contract is by defining the contract we're interacting with. It possible to do with interface.
So, the iterface for Winner contract we can define in the following way:

```
interface IWinner {
  function attempt() external;
}
```

So we can use the `IWinner` interface and the `_winnerContractAddress` address passed to `constructor` of `WinnerAgent`.
After that we can invoke the `callAttempt()` function of `WinerAgent` contract that invoke `attempt()` function from `Winner`.

1. Deploy `WinnerAgent` contract with running `npx hardhat run scripts/WinnerAgent/deploy.ts --network goerli`
2. Set `DEPLOYED_AGENT_CONTRACT_ADDRESS` constant with the hash address of deployed contract on previous step.
3. Invoke the script that invoke `callAttempt()` method of `WinnerAgent` with running: `npx hardhat run scripts/WinnerAgent/invoke1.ts --network goerli`

We can also invoke `Winner` `attempt()` function with following ways:

1. By forming calldata manually:

```
bytes4 signature = bytes4(keccak256("attempt()"));
(bool success, ) = winnerContractAddress.call(abi.encodePacked(signature));
```

2. By encoding with signature:

```
bytes memory payload = abi.encodeWithSignature("attempt()");
(bool success, ) = winnerContractAddress.call(payload);
```

# Solution 2.

This solution based on `FakeInvoker` smartcontract that allows to invoke any function of smartcontract by address and calldata. See method definition:

```
function invokeFakeContract(address winnerCaller, bytes memory data) external {
```

This allow for sender to decide which function to call and with what arguments.

1. Deploy `FakeInvoker` contract with running `npx hardhat run scripts/FakeInvoker/deploy.ts --network goerli`
2. Set `FAKE_INVOKER_CONTRACT_ADDRESS` constant with the hash address of deployed contract on previous step.
3. So now we can call the function `invokeFakeContract` of `FakeInvoker` with the first argument `0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502` (address of Winner contract), and calldata as the second parameter, that we can send in several ways:

- send calldata manualy `0x732b7a8d` (`0x + 4bytes(keccak256("attemp()"))`)
  Invoke the script with running: `npx hardhat run scripts/FakeInvoker/invokeWithCalldata.ts --network goerli`
- get calldata encoded from ABI
  Invoke the script with running: `npx hardhat run scripts/FakeInvoker/invokeWithAbi.ts --network goerli`
