
import { useEffect, useState } from "react";
import {
  Upload,
  Video,
  X,
  ScanSearch,
  ShieldCheck,
  AlertTriangle,
  FileVideo,
} from "lucide-react";
import "./VideoAnalysis.css";

export default function VideoAnalysis() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (selectedFile) => {
    setError("");
    setDuration(null);

    if (!selectedFile) return;

    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please upload an MP4, WEBM or MOV video.");
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      setError("Video size must be less than 100 MB.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const removeVideo = () => {
    setFile(null);
    setPreview("");
    setDuration(null);
    setError("");
  };

  const formatDuration = (seconds) => {
    if (!Number.isFinite(seconds)) return "Unknown";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${String(secs).padStart(2, "0")} min`;
  };

  return (
    <div className="video-page">
      <div className="video-header">
        <div>
          <h1>Video Forensics</h1>
          <p>
            Examine videos to identify possible deepfakes,
            manipulated frames and suspicious media.
          </p>
        </div>

        <div className="video-header-icon">
          <Video size={25} />
        </div>
      </div>

      <div className="video-info-grid">
        <div className="video-info-card">
          <Video size={21} />
          <div>
            <strong>Video Analysis</strong>
            <span>Digital video verification</span>
          </div>
        </div>

        <div className="video-info-card">
          <ShieldCheck size={21} />
          <div>
            <strong>Deepfake Detection</strong>
            <span>Identify manipulated video content</span>
          </div>
        </div>

        <div className="video-info-card">
          <ScanSearch size={21} />
          <div>
            <strong>Frame Examination</strong>
            <span>Forensic video inspection</span>
          </div>
        </div>
      </div>

      <section className="video-upload-card">
        <div className="video-section-heading">
          <h2>Upload Video</h2>
          <span>Maximum file size: 100 MB</span>
        </div>

        {!preview ? (
          <label className="video-dropzone">
            <input
              type="file"
              accept=".mp4,.webm,.mov,video/mp4,video/webm,video/quicktime"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            <div className="video-upload-icon">
              <Upload size={27} />
            </div>

            <h3>Drag and drop your video here</h3>
            <p>or click to browse files</p>
            <span className="video-file-types">
              MP4 · WEBM · MOV
            </span>
          </label>
        ) : (
          <div className="video-preview-area">
            <div className="video-preview-top">
              <div>
                <FileVideo size={19} />
                <span>{file?.name}</span>
              </div>

              <button
                type="button"
                onClick={removeVideo}
                aria-label="Remove video"
              >
                <X size={18} />
              </button>
            </div>

            <video
              key={preview}
              className="video-preview"
              src={preview}
              controls
              onLoadedMetadata={(e) =>
                setDuration(e.currentTarget.duration)
              }
            >
              Your browser does not support video playback.
            </video>

            <div className="video-file-details">
              <span>
                Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
              <span>
                Format: {file.type.split("/")[1].toUpperCase()}
              </span>
              <span>
                Duration: {formatDuration(duration)}
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="video-error">
            <AlertTriangle size={16} />
            {error}
          </p>
        )}

        <div className="video-actions">
          <button
            type="button"
            className="video-reset-btn"
            onClick={removeVideo}
            disabled={!file}
          >
            Reset
          </button>

          <button
            type="button"
            className="video-analyze-btn"
            disabled={!file}
            onClick={() =>
              setError(
                "Backend analysis is not connected yet. Video preview is working."
              )
            }
          >
            <ScanSearch size={18} />
            Analyze Video
          </button>
        </div>
      </section>

      <section className="video-result-card">
        <div className="video-section-heading">
          <h2>Analysis Results</h2>
          <span>Waiting for analysis</span>
        </div>

        <div className="video-empty-result">
          <div className="video-result-icon">
            <ShieldCheck size={30} />
          </div>

          <h3>No analysis available</h3>
          <p>
            Upload a video and connect the analysis backend
            to view deepfake detection results, confidence
            score, risk level and forensic details.
          </p>
        </div>
      </section>
    </div>
  );
}
