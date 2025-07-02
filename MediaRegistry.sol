// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MediaRegistry is ERC721, Ownable {
    uint256 private nextId = 1;

    struct Media {
        uint256 id;
        string ipfsHash;
        string metadata;
        string license;
        address creator;
        uint256 timestamp;
    }

    mapping(uint256 => Media) public mediaById;
    mapping(string => bool) public hashUsed;

    constructor(address initialOwner)
        ERC721("MediaNFT", "MNFT")
        Ownable(initialOwner)
    {}

    function registerMedia(string memory ipfsHash, string memory metadata, string memory license) public {
        require(!hashUsed[ipfsHash], "Already registered");
        mediaById[nextId] = Media(nextId, ipfsHash, metadata, license, msg.sender, block.timestamp);
        _safeMint(msg.sender, nextId);
        hashUsed[ipfsHash] = true;
        nextId++;
    }

    function transferMedia(uint256 tokenId, address to) public {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        _transfer(msg.sender, to, tokenId);
    }
}
