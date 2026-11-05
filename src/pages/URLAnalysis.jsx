
import { useEffect, useState } from "react";
import {
  Link,
  QrCode,
  Upload,
  Search,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Globe,
  FileImage,
  ExternalLink,
} from "lucide-react";
import "./URLAnalysis.css";

function URLAnalysis() {
  const [activeTab, setActiveTab] = useState("url");
  const [url, setUrl] = useState("");
  const [qrFile, setQrFile] = useState(null);
  const [qrPreview, setQrPreview] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      if (qrPreview) URL.revokeObjectURL(qrPreview);
    };
  }, [qrPreview]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage("");
    setSubmitted(false);
  };

  const handleURLAnalysis = (e) => {
    e.preventDefault();
    setMessage("");
    setSubmitted(false);

    try {
      const parsedURL = new URL(url.trim());

      if (!["http:", "https:"].includes(parsedURL.protocol)) {
        setMessage("Please enter a valid HTTP or HTTPS website URL.");
        return;
      }

      setSubmitted(true);
      setMessage(
        "URL format is valid. Connect the backend to perform security and phishing analysis."
      );
    } catch {
      setMessage("Please enter a valid website URL, including https://");
    }
  };

  const handleQRFile = (file) => {
    setMessage("");
    setSubmitted(false);

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please upload a valid QR code image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage("QR image size must be less than 10 MB.");
      return;
    }

    setQrFile(file);
    setQrPreview(URL.createObjectURL(file));
  };

  const handleQRAnalysis = () => {
    if (!qrFile) {
      setMessage("Please upload a QR code image first.");
      return;
    }

    setSubmitted(true);
    setMessage(
      "QR image uploaded successfully. Connect a QR decoding backend to extract and inspect its content."
    );
  };

  const handleReset = () => {
    setUrl("");
    setQrFile(null);
    setQrPreview("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="url-page">
      <div className="url-header">
        <div>
          <span className="url-eyebrow">MULTIMODAL FORENSICS</span>
          <h1>URL / QR Analysis</h1>
          <p>
            Examine website URLs and QR code images for suspicious links
            and potential security threats.
          </p>
        </div>

        <div className="url-header-icon">
          <Globe size={28} />
        </div>
      </div>

      <div className="url-info-grid">
        <div className="url-info-card">
          <div className="url-info-icon">
            <Link size={21} />
          </div>
          <div>
            <h3>URL Inspection</h3>
            <p>Website link examination</p>
          </div>
        </div>

        <div className="url-info-card">
          <div className="url-info-icon">
            <QrCode size={21} />
          </div>
          <div>
            <h3>QR Detection</h3>
            <p>QR image inspection</p>
          </div>
        </div>

        <div className="url-info-card">
          <div className="url-info-icon">
            <ShieldCheck size={21} />
          </div>
          <div>
            <h3>Threat Assessment</h3>
            <p>Phishing and risk detection</p>
          </div>
        </div>
      </div>

      <div className="url-workspace">
        <div className="url-section-heading">
          <div>
            <h2>Choose Analysis Type</h2>
            <p>Select URL or QR code analysis.</p>
          </div>
        </div>

        <div className="url-tabs">
          <button
            type="button"
            className={`url-tab ${activeTab === "url" ? "active" : ""}`}
            onClick={() => handleTabChange("url")}
          >
            <Link size={17} />
            URL Analysis
          </button>

          <button
            type="button"
            className={`url-tab ${activeTab === "qr" ? "active" : ""}`}
            onClick={() => handleTabChange("qr")}
          >
            <QrCode size={17} />
            QR Analysis
          </button>
        </div>

        {activeTab === "url" ? (
          <form className="url-form" onSubmit={handleURLAnalysis}>
            <label htmlFor="website-url">Website URL</label>

            <div className="url-input-wrapper">
              <Globe size={19} />
              <input
                id="website-url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setMessage("");
                  setSubmitted(false);
                }}
                required
              />
            </div>

            <p className="url-input-hint">
              Enter the complete website address starting with https://
            </p>

            <button className="url-analyze-button" type="submit">
              <Search size={18} />
              Inspect URL
            </button>
          </form>
        ) : (
          <div className="qr-form">
            {!qrFile ? (
              <label className="qr-upload-box">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleQRFile(e.target.files?.[0])}
                />

                <div className="qr-upload-icon">
                  <Upload size={29} />
                </div>

                <h3>Upload QR Code Image</h3>
                <p>Click here to browse and select an image.</p>

                <span>PNG · JPG · JPEG · WEBP</span>
                <small>Maximum file size: 10 MB</small>
              </label>
            ) : (
              <div className="qr-preview-card">
                <div className="qr-preview-image">
                  <img src={qrPreview} alt="Uploaded QR code preview" />
                </div>

                <div className="qr-file-details">
                  <div className="qr-file-icon">
                    <FileImage size={22} />
                  </div>

                  <div>
                    <h3>{qrFile.name}</h3>
                    <p>
                      {(qrFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              className="url-analyze-button"
              type="button"
              onClick={handleQRAnalysis}
              disabled={!qrFile}
            >
              <QrCode size={18} />
              Analyze QR Code
            </button>
          </div>
        )}

        {message && (
          <div className="url-message">
            {submitted ? (
              <ShieldCheck size={18} />
            ) : (
              <AlertTriangle size={18} />
            )}
            <span>{message}</span>
          </div>
        )}

        {submitted && activeTab === "url" && (
          <div className="url-submitted-preview">
            <span>Submitted URL</span>
            <p>{url}</p>
            <a href={url} target="_blank" rel="noreferrer">
              Open website <ExternalLink size={14} />
            </a>
            <small>
              Opening a website is not a security check. Only open links you trust.
            </small>
          </div>
        )}

        <div className="url-actions">
          <button
            className="url-reset-button"
            type="button"
            onClick={handleReset}
          >
            <RotateCcw size={17} />
            Reset
          </button>
        </div>
      </div>

      <div className="url-results-section">
        <div className="url-section-heading">
          <div>
            <h2>Security Analysis Results</h2>
            <p>URL and QR code threat assessment.</p>
          </div>

          <span className="url-pending-badge">Awaiting Analysis</span>
        </div>

        <div className="url-empty-results">
          <div className="url-empty-icon">
            <ShieldCheck size={32} />
          </div>

          <h3>No Security Results Yet</h3>

          <p>
            Submit a URL or QR image and connect the backend to view
            phishing indicators, extracted content, confidence score
            and security risk level.
          </p>

          <div className="url-result-preview">
            <div>
              <span>URL Status</span>
              <strong>--</strong>
            </div>
            <div>
              <span>Confidence Score</span>
              <strong>--</strong>
            </div>
            <div>
              <span>Risk Level</span>
              <strong>--</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default URLAnalysis;
