import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import logo from "../assets/logo.svg";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme =
      localStorage.getItem("theme") || "light";
  }, []);

  return (
    <div className="dash-page">
      <header className="dash-top">
        <div className="dash-brand">
          <img src={logo} alt="" />
          <span>
            MediaGuard <span className="dash-ai">AI</span>
          </span>
        </div>
        <button type="button" className="dash-logout" onClick={() => navigate("/")}>
          <LogOut size={16} /> Log out
        </button>
      </header>

      <main className="dash-main">
        <div className="dash-card">
          <h1>Welcome to MediaGuard AI</h1>
          <p>You are logged in. Your dashboard is coming soon.</p>
        </div>
      </main>
    </div>
  );
}