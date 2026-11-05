
import { useState } from "react";
import {
  FileSearch,
  ShieldCheck,
  Hash,
  Upload,
  Copy,
  RotateCcw,
  ClipboardList,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./ForensicTools.css";

function ForensicTools() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [referenceHash, setReferenceHash] = useState("");
  const [integrityResult, setIntegrityResult] = useState("");
  const [records, setRecords] = useState([]);
  const [recordText, setRecordText] = useState("");

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setHash("");
    setIntegrityResult("");
  };

  const generateHash = async () => {
    if (!file) {
      alert("Please upload an evidence file first.");
      return;
    }

    try {
      setLoading(true);
      const buffer = await file.arrayBuffer();
      const digest = await crypto.subtle.digest("SHA-256", buffer);

      const hashArray = Array.from(new Uint8Array(digest));
      const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      setHash(hashHex);
      setIntegrityResult("");
    } catch (error) {
      alert("Hash generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyIntegrity = () => {
    if (!hash || !referenceHash.trim()) {
      alert("Generate a hash and enter the reference hash first.");
      return;
    }

    const isMatch =
      hash.toLowerCase() === referenceHash.trim().toLowerCase();

    setIntegrityResult(isMatch ? "match" : "mismatch");
  };

  const copyHash = async () => {
    if (!hash) return;

    try {
      await navigator.clipboard.writeText(hash);
      alert("SHA-256 hash copied!");
    } catch {
      alert("Unable to copy hash.");
    }
  };

  const resetTool = () => {
    setFile(null);
    setHash("");
    setReferenceHash("");
    setIntegrityResult("");
    setLoading(false);
  };

  const addRecord = () => {
    if (!recordText.trim()) return;

    setRecords((previous) => [
      ...previous,
      {
        id: Date.now(),
        text: recordText.trim(),
        date: new Date().toLocaleString(),
      },
    ]);

    setRecordText("");
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} Bytes`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="forensic-page">
      <div className="forensic-header">
        <div>
          <h1>Forensic Tools</h1>
          <p>
            Analyze digital evidence and verify file integrity.
          </p>
        </div>
      </div>

      <div className="forensic-grid">
        {/* SHA-256 HASH GENERATOR */}
        <section className="forensic-card">
          <div className="forensic-card-title">
            <div className="forensic-icon">
              <Hash size={21} />
            </div>
            <div>
              <h2>SHA-256 Hash Generator</h2>
              <p>Generate a cryptographic hash of evidence.</p>
            </div>
          </div>

          <label className="forensic-upload">
            <Upload size={25} />
            <strong>Upload Evidence File</strong>
            <span>
              {file ? file.name : "Choose a file from your device"}
            </span>
            <input
              type="file"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>

          <button
            className="forensic-primary-btn"
            onClick={generateHash}
            disabled={!file || loading}
          >
            {loading ? "Generating..." : "Generate SHA-256 Hash"}
          </button>

          {hash && (
            <div className="hash-result">
              <label>Generated SHA-256 Hash</label>
              <div className="hash-value">{hash}</div>
              <button
                className="forensic-secondary-btn"
                onClick={copyHash}
              >
                <Copy size={15} /> Copy Hash
              </button>
            </div>
          )}
        </section>

        {/* FILE METADATA */}
        <section className="forensic-card">
          <div className="forensic-card-title">
            <div className="forensic-icon">
              <FileSearch size={21} />
            </div>
            <div>
              <h2>File Metadata</h2>
              <p>View basic properties of uploaded evidence.</p>
            </div>
          </div>

          {file ? (
            <div className="metadata-list">
              <div>
                <span>File Name</span>
                <strong>{file.name}</strong>
              </div>
              <div>
                <span>File Size</span>
                <strong>{formatSize(file.size)}</strong>
              </div>
              <div>
                <span>File Type</span>
                <strong>{file.type || "Unknown"}</strong>
              </div>
              <div>
                <span>Last Modified</span>
                <strong>
                  {new Date(file.lastModified).toLocaleString()}
                </strong>
              </div>
            </div>
          ) : (
            <div className="forensic-empty">
              <FileSearch size={32} />
              <p>Upload an evidence file to view its metadata.</p>
            </div>
          )}
        </section>

        {/* EVIDENCE INTEGRITY */}
        <section className="forensic-card">
          <div className="forensic-card-title">
            <div className="forensic-icon">
              <ShieldCheck size={21} />
            </div>
            <div>
              <h2>Evidence Integrity</h2>
              <p>Compare the generated hash with a reference hash.</p>
            </div>
          </div>

          <label className="forensic-label">
            Reference SHA-256 Hash
          </label>
          <input
            className="forensic-input"
            type="text"
            placeholder="Paste reference SHA-256 hash"
            value={referenceHash}
            onChange={(e) => setReferenceHash(e.target.value)}
          />

          <button
            className="forensic-primary-btn"
            onClick={verifyIntegrity}
          >
            Verify Integrity
          </button>

          {integrityResult === "match" && (
            <div className="integrity-result success">
              <CheckCircle size={19} />
              Hash Match — File integrity verified against the reference.
            </div>
          )}

          {integrityResult === "mismatch" && (
            <div className="integrity-result danger">
              <AlertCircle size={19} />
              Hash Mismatch — The hashes are different.
            </div>
          )}
        </section>

        {/* CHAIN OF CUSTODY */}
        <section className="forensic-card">
          <div className="forensic-card-title">
            <div className="forensic-icon">
              <ClipboardList size={21} />
            </div>
            <div>
              <h2>Chain of Custody</h2>
              <p>Maintain a basic evidence handling log.</p>
            </div>
          </div>

          <textarea
            className="forensic-textarea"
            placeholder="Enter evidence handling activity..."
            value={recordText}
            onChange={(e) => setRecordText(e.target.value)}
          />

          <button
            className="forensic-primary-btn"
            onClick={addRecord}
            disabled={!recordText.trim()}
          >
            Add Record
          </button>

          <div className="custody-records">
            {records.length === 0 ? (
              <p className="custody-empty">
                No custody records added yet.
              </p>
            ) : (
              records.map((record) => (
                <div className="custody-record" key={record.id}>
                  <strong>{record.text}</strong>
                  <span>{record.date}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <div className="forensic-footer">
        <button className="forensic-reset-btn" onClick={resetTool}>
          <RotateCcw size={16} /> Reset Evidence File
        </button>
        <p>
          Note: Metadata and custody records are currently handled
          in this browser session. Persistent forensic case management
          requires backend integration.
        </p>
      </div>
    </div>
  );
}

export default ForensicTools;
