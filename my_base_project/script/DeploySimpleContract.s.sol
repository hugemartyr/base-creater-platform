// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {SimpleContract} from "../src/SimpleContract.sol";

contract DeploySimpleContract is Script {
    function run() external {
        vm.startBroadcast();
        new SimpleContract();
        vm.stopBroadcast();
    }
}
