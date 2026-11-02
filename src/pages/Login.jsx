import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck, Eye, EyeOff, Mail, Lock, LogIn,
  Image as ImageIcon, Video, AudioLines, Link2, QrCode, Sun, Moon,
} from "lucide-react";
import logo from "../assets/logo.svg";
import hero from "../assets/hero.svg";
import "./Login.css";
// TEMP fake login. Replace with the real backend API call later.
const DEMO_PASSWORD = "demo123";
const FEATURES = [
  { title: "Image", desc: "Authenticity Detection", icon: ImageIcon, color: "#a78bfa" },
  { title: "Video", desc: "Deepfake Detection", icon: Video, color: "#60a5fa" },
  { title: "Audio", desc: "AI-Generated Detection", icon: AudioLines, color: "#2dd4bf" },
  { title: "URL", desc: "Suspicious Link Scanner", icon: Link2, color: "#fb923c" },
  { title: "QR Code", desc: "Verification", icon: QrCode, color: "#c084fc" },
];

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);


  const fail = (message) => {
    setError(message);
    setShake(true);
  };

  const handleGoogle = () => {
    setSuccess(false);
    setError("Google login will be available soon.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setSuccess(false);

    if (!email.trim() || !password) {
      fail("Enter your email and password.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      fail("Enter a valid email address.");
      return;
    }

        setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (password === DEMO_PASSWORD) {
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 700);
      } else {
        fail("Invalid email or password. Check your details and try again.");
      }
    }, 900);
  };

  return (
    <div className="login-page">
      <aside className="login-brand">
        <div className="login-top">
          <div className="login-logo">
            <span className="login-logo-mark" aria-hidden="true">
  <img src={logo} alt="" />
</span>
            <div>
              <span className="login-logo-text">
                MediaGuard <span className="login-ai">AI</span>
              </span>
              <p className="login-logo-sub">
                AI-Based Multimodal Digital Forensics and Media Authenticity Verification
              </p>
            </div>
          </div>
          <p className="login-tagline">Safer Media | Smarter Verification | A Trusted Tomorrow</p>
        </div>
        <div>
        <h1 className="login-headline">
          Verify media.
          <span className="login-headline-accent">Trust what you see.</span>
        </h1>
        <p className="login-sub">
          Detect deepfakes, AI-generated content and manipulation across images,
          videos, audio and URLs/QR codes using advanced AI models.
        </p>
        </div>
        <ul className="login-features">
          {FEATURES.map(({ title, desc, icon: Icon, color }) => (
            <li key={title}>
              <span
                className="login-feature-icon"
                style={{ background: color + "33", color: color }}
              >
                <Icon size={22} />
              </span>
              <strong>{title}</strong>
              <span className="login-feature-desc">{desc}</span>
            </li>
          ))}
        </ul>
       <img className="login-hero" src={hero} alt="" />
        <p className="login-motto">
          <ShieldCheck size={18} /> Because what you see isn&apos;t always real.
        </p>
      </aside>

      <main className="login-panel">
        <div className="login-card">
                  <div className="theme-toggle" role="group" aria-label="Theme">
          <button
            type="button"
            className={theme === "light" ? "active" : ""}
            onClick={() => setTheme("light")}
            aria-label="Light mode"
          >
            <Sun size={16} />
          </button>
          <button
            type="button"
            className={theme === "dark" ? "active" : ""}
            onClick={() => setTheme("dark")}
            aria-label="Dark mode"
          >
            <Moon size={16} />
          </button>
        </div>
        
          <form
            className={`login-form${shake ? " shake" : ""}`}
            onSubmit={handleSubmit}
            onAnimationEnd={() => setShake(false)}
            noValidate
          > 
                  
            <div className="login-card-logo">
              <span className="login-logo-mark" aria-hidden="true">
  <img src={logo} alt="" />
</span>
              <span className="login-card-brand">
                MediaGuard <span className="login-ai">AI</span>
              </span>
            </div>

            <h2 className="login-title">Welcome back!</h2>
            <p className="login-lead">Log in to analyze media and verify your reports.</p>

            {error && (
              <div className="login-alert login-alert-error" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="login-alert login-alert-success" role="status">
                Logged in. The Dashboard will open here.
              </div>
            )}

            <div className="login-field">
              <Mail size={20} className="login-field-icon" />
              <div className="login-field-body">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  className="login-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="login-field">
              <Lock size={20} className="login-field-icon" />
              <div className="login-field-body">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="login-eye"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="login-row">
              <label className="login-remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#forgot" className="login-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-button">
              {loading ? (
                <span className="login-spinner" aria-hidden="true" />
              ) : (
                <LogIn size={18} />
              )}
              {loading ? "Logging in…" : "Log in"}
            </button>

            <div className="login-divider">
              <span>OR</span>
            </div>

            <button type="button" className="login-google" onClick={handleGoogle}>
              <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Continue with Google
            </button>

            <p className="login-foot">
              New here? <a href="#signup" className="login-link">Create an account</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}