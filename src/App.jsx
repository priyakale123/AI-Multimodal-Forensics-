import ImageAnalysis from "./pages/ImageAnalysis";
import VideoAnalysis from "./pages/VideoAnalysis";
import AudioAnalysis from "./pages/AudioAnalysis";
import URLAnalysis from "./pages/URLAnalysis";
import ForensicTools from "./pages/ForensicTools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";

// Placeholder for pages we have not built yet (Video, Image, Audio...)
function ComingSoon() {
  return (
    <div className="page">
      <p style={{ color: "var(--text-muted)" }}>This page is coming soon.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<ComingSoon />} />
          <Route path="/image" element={<ImageAnalysis />} />
          <Route path="/video" element={<VideoAnalysis />} />
          <Route path="/audio" element={<AudioAnalysis />} />
          <Route path="/url" element={<URLAnalysis />} />
          <Route path="/forensics" element={<ForensicTools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;