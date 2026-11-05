import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Video, Image as ImageIcon, AudioLines,
  QrCode, Fingerprint, History, LogOut, Sun, Moon,
} from "lucide-react";
import logo from "../assets/logo.svg";
import "./Layout.css";

const NAV = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/video", label: "Video Analysis", icon: Video },
  { to: "/image", label: "Image Analysis", icon: ImageIcon },
  { to: "/audio", label: "Audio Analysis", icon: AudioLines },
  { to: "/url", label: "URL / QR Analysis", icon: QrCode },
  { to: "/forensics", label: "Forensic Tools", icon: Fingerprint },
  { to: "/history", label: "History", icon: History },
];

export default function Layout() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <img src={logo} alt="" />
          <div>
            <strong>MediaGuard AI</strong>
            <span>Digital forensics &amp; authenticity</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " active" : "")
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="sidebar-btn" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
          </button>
          <button
            type="button"
            className="sidebar-btn"
            onClick={() => navigate("/")}
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}