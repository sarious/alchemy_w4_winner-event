//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

interface IWinner {
  function attempt() external;
}

contract WinnerAgent {
  address public owner;
  IWinner private winnerContract;

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner of this contract allowed to perform this action.");
    _;
  }

  constructor(address _winnerContractAddress) {
    owner = msg.sender;
    winnerContract = IWinner(_winnerContractAddress);
  }

  function callAttempt() external onlyOwner {
    winnerContract.attempt();
  }

  function getOwner() external view returns (address) {
    return owner;
  }
}