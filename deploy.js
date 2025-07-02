const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  const MediaRegistry = await hre.ethers.getContractFactory("MediaRegistry");
  const mediaRegistry = await MediaRegistry.deploy(deployer.address);

  await mediaRegistry.deployed();

  console.log("MediaRegistry deployed to:", mediaRegistry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

