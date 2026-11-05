
import { useState } from "react";
import {
  Upload, Image as ImageIcon, X, ScanSearch,
  ShieldCheck, AlertTriangle, FileImage
} from "lucide-react";
import "./ImageAnalysis.css";

export default function ImageAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload JPG, PNG or WEBP image.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Image size must be less than 10 MB.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    setError("");
  };

  return (
    <div className="image-page">
      <div className="image-header">
        <div>
          <h1>Image Forensics</h1>
          <p>
            Analyze images to identify possible manipulation
            and verify media authenticity.
          </p>
        </div>
        <div className="image-header-icon">
          <ImageIcon size={25} />
        </div>
      </div>

      <div className="image-info-grid">
        <div className="image-info-card">
          <ImageIcon size={21} />
          <div>
            <strong>Image Analysis</strong>
            <span>Digital image verification</span>
          </div>
        </div>

        <div className="image-info-card">
          <ShieldCheck size={21} />
          <div>
            <strong>Forgery Detection</strong>
            <span>Identify suspicious alterations</span>
          </div>
        </div>

        <div className="image-info-card">
          <ScanSearch size={21} />
          <div>
            <strong>Forensic Examination</strong>
            <span>Evidence-based analysis</span>
          </div>
        </div>
      </div>

      <section className="image-upload-card">
        <div className="image-section-heading">
          <h2>Upload Image</h2>
          <span>Maximum file size: 10 MB</span>
        </div>

        {!preview ? (
          <label className="image-dropzone">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={(e) => handleFile(e.target.files?.[0])}
              hidden
            />

            <div className="image-upload-icon">
              <Upload size={27} />
            </div>

            <h3>Drag and drop your image here</h3>
            <p>or click to browse files</p>
            <span className="image-file-types">
              JPG · JPEG · PNG · WEBP
            </span>
          </label>
        ) : (
          <div className="image-preview-area">
            <div className="image-preview-top">
              <div>
                <FileImage size={19} />
                <span>{file?.name}</span>
              </div>

              <button
                type="button"
                onClick={removeImage}
                aria-label="Remove image"
              >
                <X size={18} />
              </button>
            </div>

            <img
              src={preview}
              alt="Uploaded preview"
              className="image-preview"
            />

            <div className="image-file-details">
              <span>File size: {(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              <span>Format: {file.type.split("/")[1].toUpperCase()}</span>
            </div>
          </div>
        )}

        {error && (
          <p className="image-error">
            <AlertTriangle size={16} /> {error}
          </p>
        )}

        <div className="image-actions">
          <button
            type="button"
            className="image-reset-btn"
            onClick={removeImage}
            disabled={!file}
          >
            Reset
          </button>

          <button
            type="button"
            className="image-analyze-btn"
            disabled={!file}
            onClick={() => setError(
              "Backend analysis is not connected yet. Image preview is working."
            )}
          >
            <ScanSearch size={18} />
            Analyze Image
          </button>
        </div>
      </section>

      <section className="image-result-card">
        <div className="image-section-heading">
          <h2>Analysis Results</h2>
          <span>Waiting for analysis</span>
        </div>

        <div className="image-empty-result">
          <div className="image-result-icon">
            <ShieldCheck size={30} />
          </div>
          <h3>No analysis available</h3>
          <p>
            Upload an image and connect the analysis backend
            to view authenticity results, confidence score and
            forensic details.
          </p>
        </div>
      </section>
    </div>
  );
}
