// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CreatorRegistry.sol";

contract CreatorRegistryTest is Test {
    CreatorRegistry public registry;

    function setUp() public {
        registry = new CreatorRegistry();
    }

    function testRegisterCreator() public {
        registry.registerCreator("Alice", "ipfs://QmExample");
        (string memory name,, bool registered) = registry.creators(address(this));
        assertEq(name, "Alice");
        assertTrue(registered);
    }

    function testFailDoubleRegister() public {
        registry.registerCreator("Alice", "ipfs://QmExample");
        registry.registerCreator("Alice2", "ipfs://QmExample2"); // Should fail
    }
}
