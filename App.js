// File: client/src/App.js

import React from "react";
import UploadMedia from "./UploadMedia";
import VerifyMedia from "./VerifyMedia";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Blockchain Media Auth & Provenance</h1>
      <UploadMedia />
      <hr />
      <VerifyMedia />
    </div>
  );
}

export default App;
