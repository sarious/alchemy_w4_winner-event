//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

contract FakeWinner {
  event Winner(address);

  function attempt() external {
    emit Winner(tx.origin);
  }
}