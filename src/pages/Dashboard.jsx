import "./Dashboard.css";

// TEMP mock data. Later this comes from the backend (GET /stats, GET /history).
const MODULES = [
  "Video (Deepfake)",
  "Image (Forgery)",
  "Audio (Voice)",
  "URL / QR (Scan)",
  "Forensic Tools",
];

const STATS = [
  { label: "Total analyses", value: 24 },
  { label: "Real", value: 16 },
  { label: "Fake", value: 3 },
  { label: "Suspicious", value: 5 },
];

const RECENT = [
  { file: "video_sample.mp4", type: "Video", result: "Real", confidence: "96.7%", date: "Oct 08, 10:24" },
  { file: "image_sample.jpg", type: "Image", result: "Fake", confidence: "88.6%", date: "Oct 08, 08:12" },
  { file: "audio_sample.wav", type: "Audio", result: "Suspicious", confidence: "68.3%", date: "Oct 07, 05:40" },
];

export default function Dashboard() {
  return (
    <div className="home">
      <h1 className="home-title">
        AI-Based Multimodal Digital Forensics and Media Authenticity Verification
      </h1>
      <p className="home-sub">Detect deepfakes, verify media and keep the evidence.</p>

      <ul className="home-modules">
        {MODULES.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <section className="home-stats">
        {STATS.map(({ label, value }) => (
          <div key={label} className="home-stat">
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="home-card">
        <h2>Recent activity</h2>
        <div className="home-table-wrap">
          <table className="home-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Type</th>
                <th>Result</th>
                <th>Confidence</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {RECENT.map((row) => (
                <tr key={row.file}>
                  <td>{row.file}</td>
                  <td>{row.type}</td>
                  <td>
                    <span className={`pill ${row.result.toLowerCase()}`}>
                      {row.result}
                    </span>
                  </td>
                  <td>{row.confidence}</td>
                  <td>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
