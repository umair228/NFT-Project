import React, { useState } from "react";
import { ethers } from "ethers";
import MediaRegistry from "./contracts/MediaRegistry.json";

const CONTRACT_ADDRESS = "<REPLACE_WITH_DEPLOYED_CONTRACT_ADDRESS>";

function UploadMedia() {
  const [fileHash, setFileHash] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    try {
      setStatus("Connecting to wallet...");

      if (!window.ethereum) {
        alert("MetaMask not found. Please install it.");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, MediaRegistry.abi, signer);

      setStatus("Registering hash on blockchain...");
      const tx = await contract.registerMedia(fileHash);
      await tx.wait();

      setStatus("Media hash successfully registered!");
    } catch (error) {
      console.error(error);
      setStatus("Upload failed. Check console for details.");
    }
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <input
        type="text"
        value={fileHash}
        onChange={(e) => setFileHash(e.target.value)}
        placeholder="Enter IPFS hash or media hash"
      />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
}

export default UploadMedia;
