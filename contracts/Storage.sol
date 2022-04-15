//SPDX-License-Identifier: CC0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Storage {
    uint256 public slot;

    function setSlot(uint256 value) external {
        slot = value;
    }
}
