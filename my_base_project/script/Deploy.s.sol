// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {CreatorRegistry} from  "../src/CreatorRegistry.sol";
import {console} from "forge-std/console.sol";

contract Deploy is Script {
    function run() external returns (CreatorRegistry) {
        vm.startBroadcast();
        // new CreatorRegistry();
        CreatorRegistry registry = new CreatorRegistry();
        console.log("CreatorRegistry deployed at:", address(registry));
        vm.stopBroadcast();
        return registry;
    }
}
