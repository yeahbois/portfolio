'use client'

import { useState } from 'react'

export default function DriveCDN() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const extractFileId = (url: string) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const handleConvert = async () => {
    setError("");
    setResult(null);
    setLoading(true);

    const fileId = extractFileId(input);

    if (!fileId) {
      setError("INVALID_LINK_FORMAT: [EXPECTED_FORMAT: https://drive.google.com/file/d/FILE_ID/view]");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/drive?id=${fileId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setResult(data);
    } catch (err: any) {
      setError(`EXECUTION_ERROR: ${err.message.toUpperCase()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-outline/20 pb-6">
          <h1 className="text-2xl font-bold tracking-tighter uppercase glitch-effect">Drive_To_CDN_v1.0</h1>
          <p className="text-[10px] opacity-50 mt-2 tracking-widest uppercase">Convert Google Drive links to direct CDN access points.</p>
        </header>

        <div className="ascii-border p-6 bg-surface/30 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest opacity-50 block">Input_Source_URL</label>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className="flex-grow bg-background border border-outline/20 p-3 font-mono text-sm focus:outline-none focus:border-primary transition-all"
              />
              <button
                onClick={handleConvert}
                disabled={loading}
                className="bg-primary text-on-primary px-8 py-3 text-[10px] tracking-widest hover:opacity-90 disabled:opacity-50 transition-all uppercase whitespace-nowrap"
              >
                {loading ? 'Processing...' : 'Generate_CDN'}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono">
              {error}
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6 pt-6 border-t border-outline/10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-50 block">File_Name</span>
                    <p className="text-sm font-bold">{result.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-50 block">Mime_Type</span>
                    <p className="text-[10px] opacity-70 uppercase tracking-tighter">{result.mimeType}</p>
                  </div>
                  <div className="pt-4">
                    <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-2">Direct_CDN_URL</span>
                    <div className="flex gap-2">
                      <input
                        readOnly
                        value={result.cdn}
                        className="bg-background/50 border border-outline/10 p-2 text-[10px] flex-grow font-mono"
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText(result.cdn)}
                        className="border border-outline/20 px-3 py-1 text-[10px] hover:bg-surface transition-colors"
                      >
                        COPY
                      </button>
                    </div>
                  </div>
                </div>

                {result.mimeType.startsWith("image") && (
                  <div>
                    <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-2">Visual_Preview</span>
                    <div className="ascii-border p-2 bg-background inline-block">
                      <img src={result.cdn} className="max-w-full h-auto max-h-[300px] grayscale hover:grayscale-0 transition-all duration-700" alt="Preview" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-[9px] opacity-30 leading-relaxed font-mono uppercase italic">
            Note: Ensure file is shared with "Anyone with the link" or shared to the service account email (drivecdn@drive-as-cdn.iam.gserviceaccount.com).
          </p>
        </div>
      </div>
    </div>
  );
}
