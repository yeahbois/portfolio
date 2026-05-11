'use client'

import { useState } from 'react'

export default function DriveCDN() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const extractFileId = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const handleConvert = async () => {
    setError("");
    setResult(null);

    const fileId = extractFileId(input);

    if (!fileId) {
      setError("Invalid Google Drive link");
      return;
    }

    try {
      const res = await fetch(`/api/drive?id=${fileId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Drive CDN Generator</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste Google Drive link"
        style={{ width: "400px" }}
      />

      <button onClick={handleConvert}>Convert</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <p><b>Name:</b> {result.name}</p>

          <a href={result.cdn} target="_blank" rel="noreferrer">
            {result.cdn}
          </a>

          <br />
          <br />

          <button onClick={() => navigator.clipboard.writeText(result.cdn)}>
            Copy CDN Link
          </button>

          {result.mimeType.startsWith("image") && (
            <div style={{ marginTop: 20 }}>
              <img src={result.cdn} width="300" alt="Preview" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
