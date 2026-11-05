
import { useEffect, useRef, useState } from "react";
import {
  Upload,
  Music,
  Play,
  Pause,
  RotateCcw,
  FileAudio,
  ShieldCheck,
  AlertTriangle,
  Activity,
} from "lucide-react";
import "./AudioAnalysis.css";

function AudioAnalysis() {
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
    };
  }, [audioURL]);

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleFile = (file) => {
    setMessage("");
    setIsPlaying(false);

    if (!file) return;

    const allowedTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/x-wav",
      "audio/mp4",
      "audio/x-m4a",
      "audio/aac",
      "audio/ogg",
      "audio/webm",
    ];

    const allowedExtensions = /\.(mp3|wav|m4a|aac|ogg|webm)$/i;

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.test(file.name)
    ) {
      setMessage("Unsupported audio format. Please upload MP3, WAV, M4A, AAC, OGG or WEBM.");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setMessage("File size must be less than 50 MB.");
      return;
    }

    setAudioFile(file);
    setDuration(0);
    setAudioURL(URL.createObjectURL(file));
  };

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setMessage("Unable to play this audio file. Please try another file.");
      }
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setAudioFile(null);
    setAudioURL("");
    setDuration(0);
    setIsPlaying(false);
    setIsAnalyzing(false);
    setMessage("");
  };

  const handleAnalyze = () => {
    if (!audioFile) {
      setMessage("Please upload an audio file first.");
      return;
    }

    setIsAnalyzing(true);
    setMessage(
      "Audio upload is ready. Backend integration is required to run forensic analysis."
    );
    setIsAnalyzing(false);
  };

  return (
    <div className="audio-page">
      <div className="audio-header">
        <div>
          <span className="audio-eyebrow">MULTIMODAL FORENSICS</span>
          <h1>Audio Analysis</h1>
          <p>
            Analyze audio files to identify possible voice manipulation,
            synthetic speech and audio tampering.
          </p>
        </div>

        <div className="audio-header-icon">
          <Music size={28} />
        </div>
      </div>

      <div className="audio-info-grid">
        <div className="audio-info-card">
          <div className="audio-info-icon">
            <FileAudio size={21} />
          </div>
          <div>
            <h3>Audio Upload</h3>
            <p>MP3, WAV, M4A, AAC, OGG</p>
          </div>
        </div>

        <div className="audio-info-card">
          <div className="audio-info-icon">
            <Activity size={21} />
          </div>
          <div>
            <h3>Voice Analysis</h3>
            <p>Speech and audio examination</p>
          </div>
        </div>

        <div className="audio-info-card">
          <div className="audio-info-icon">
            <ShieldCheck size={21} />
          </div>
          <div>
            <h3>Forensic Detection</h3>
            <p>Manipulation risk assessment</p>
          </div>
        </div>
      </div>

      <div className="audio-workspace">
        <div className="audio-section-heading">
          <div>
            <h2>Upload Audio File</h2>
            <p>Select an audio file for forensic examination.</p>
          </div>
        </div>

        {!audioFile ? (
          <label className="audio-upload-box">
            <input
              type="file"
              accept=".mp3,.wav,.m4a,.aac,.ogg,.webm,audio/*"
              onChange={(e) => handleFile(e.target.files?.[0])}
              hidden
            />

            <div className="audio-upload-icon">
              <Upload size={30} />
            </div>

            <h3>Drag and drop your audio file</h3>
            <p>or click here to browse files</p>

            <span className="audio-upload-formats">
              MP3 · WAV · M4A · AAC · OGG · WEBM
            </span>

            <span className="audio-upload-limit">
              Maximum file size: 50 MB
            </span>
          </label>
        ) : (
          <div className="audio-preview-card">
            <div className="audio-file-details">
              <div className="audio-file-icon">
                <FileAudio size={25} />
              </div>

              <div className="audio-file-text">
                <h3>{audioFile.name}</h3>
                <p>
                  {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                  {" · "}
                  {audioFile.name.split(".").pop().toUpperCase()}
                </p>
              </div>

              <button
                className="audio-reset-button"
                onClick={handleReset}
                title="Remove audio"
                type="button"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            <div className="audio-player">
              <button
                className="audio-play-button"
                onClick={handlePlayPause}
                type="button"
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
              >
                {isPlaying ? <Pause size={21} /> : <Play size={21} />}
              </button>

              <div className="audio-player-info">
                <div className="audio-player-label">
                  <span>{isPlaying ? "Playing audio" : "Audio preview"}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <audio
                  ref={audioRef}
                  src={audioURL}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                  onEnded={() => setIsPlaying(false)}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  className="audio-native-player"
                  controls
                />
              </div>
            </div>

            <div className="audio-ready-status">
              <span className="audio-status-dot"></span>
              Audio file uploaded successfully
            </div>
          </div>
        )}

        {message && (
          <div className="audio-message">
            <AlertTriangle size={17} />
            <span>{message}</span>
          </div>
        )}

        <div className="audio-actions">
          <button
            className="audio-analyze-button"
            onClick={handleAnalyze}
            disabled={!audioFile || isAnalyzing}
            type="button"
          >
            <Activity size={18} />
            {isAnalyzing ? "Processing..." : "Analyze Audio"}
          </button>

          <button
            className="audio-clear-button"
            onClick={handleReset}
            disabled={!audioFile}
            type="button"
          >
            <RotateCcw size={17} />
            Reset
          </button>
        </div>
      </div>

      <div className="audio-results-section">
        <div className="audio-section-heading">
          <div>
            <h2>Forensic Analysis Results</h2>
            <p>Audio authenticity and manipulation assessment.</p>
          </div>
          <span className="audio-pending-badge">Awaiting Analysis</span>
        </div>

        <div className="audio-empty-results">
          <div className="audio-empty-icon">
            <ShieldCheck size={32} />
          </div>

          <h3>No Analysis Results Yet</h3>

          <p>
            Upload an audio file and connect the forensic analysis backend
            to view authenticity, confidence score and risk assessment.
          </p>

          <div className="audio-result-preview">
            <div>
              <span>Authenticity</span>
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

export default AudioAnalysis;
