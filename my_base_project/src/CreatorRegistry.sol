// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CreatorRegistry {
    struct Creator {
        string name;
        string profileURI;
        bool registered;
    }

    mapping(address => Creator) public creators;
    address[] public creatorList;

    event CreatorRegistered(address indexed creator, string name, string profileURI);

    function registerCreator(string calldata name, string calldata profileURI) external {
        require(!creators[msg.sender].registered, "Already registered");

        creators[msg.sender] = Creator({
            name: name,
            profileURI: profileURI,
            registered: true
        });

        creatorList.push(msg.sender);

        emit CreatorRegistered(msg.sender, name, profileURI);
    }

    function getAllCreators() external view returns (address[] memory) {
        return creatorList;
    }

    function getCreator(address creatorAddr) external view returns (Creator memory) {
        return creators[creatorAddr];
    }
}
