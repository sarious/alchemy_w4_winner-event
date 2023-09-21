//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract FakeInvoker {
  address private owner;

  constructor() {
    owner = msg.sender;
  }

  function invokeFakeContract(address winnerCaller, bytes memory data) external {
    require(msg.sender == owner, "Only owner can invoke this method");

    (bool success,) = winnerCaller.call(data);

    require(success);
  }
}