import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function PortalLayout({ title, subtitle, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    )},
    { to: "/services", label: "Services Requested", icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
        <rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/>
      </svg>
    )},
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .portal-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #F4F3EF;
        }

        /* ─── SIDEBAR ─────────────────────────────── */
        .portal-sidebar {
          width: 280px;
          min-height: 100vh;
          background: #1A1F1C;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          flex-shrink: 0;
        }

        .sidebar-texture {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 20%, rgba(74,140,93,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(74,140,93,0.07) 0%, transparent 40%);
          pointer-events: none;
        }

        .sidebar-brand {
          padding: 36px 28px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          position: relative;
          z-index: 1;
        }

        .brand-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #4A8C5D;
          margin-bottom: 6px;
        }

        .brand-name {
          font-family: 'DM Serif Display', serif;
          font-size: 26px;
          color: #F4F3EF;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .brand-sub {
          font-size: 12px;
          color: rgba(244,243,239,0.35);
          margin-top: 4px;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .sidebar-nav {
          flex: 1;
          padding: 24px 16px;
          position: relative;
          z-index: 1;
        }

        .nav-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(244,243,239,0.25);
          padding: 0 12px;
          margin-bottom: 8px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          color: rgba(244,243,239,0.55);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.18s ease;
          margin-bottom: 2px;
        }

        .nav-link:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(244,243,239,0.9);
        }

        .nav-link.active {
          background: rgba(74,140,93,0.18);
          color: #6DC98A;
          border: 1px solid rgba(74,140,93,0.25);
        }

        .nav-link.active svg {
          color: #6DC98A;
        }

        .nav-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid rgba(255,255,255,0.07);
          position: relative;
          z-index: 1;
        }

        .user-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #4A8C5D, #2d6e44);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .user-info-name {
          font-size: 13px;
          font-weight: 600;
          color: rgba(244,243,239,0.85);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-info-email {
          font-size: 11px;
          color: rgba(244,243,239,0.35);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 1px;
        }

        .logout-btn {
          width: 100%;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          color: #f87171;
          padding: 11px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.01em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .logout-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.3);
          color: #fca5a5;
        }

        /* ─── MAIN ─────────────────────────────────── */
        .portal-main {
          flex: 1;
          overflow-y: auto;
          padding: 48px 52px;
          min-width: 0;
        }

        .portal-header {
          margin-bottom: 40px;
        }

        .header-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #4A8C5D;
          margin-bottom: 10px;
        }

        .header-title {
          font-family: 'DM Serif Display', serif;
          font-size: 46px;
          color: #1A1F1C;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }

        .header-subtitle {
          font-size: 16px;
          color: #6B7280;
          font-weight: 400;
          line-height: 1.5;
        }

        .header-divider {
          width: 48px;
          height: 3px;
          background: linear-gradient(90deg, #4A8C5D, transparent);
          border-radius: 2px;
          margin-top: 16px;
        }

        @media (max-width: 768px) {
          .portal-main { padding: 28px 20px; }
          .header-title { font-size: 32px; }
          .portal-sidebar { width: 240px; }
        }
      `}</style>

      <div className="portal-root">
        <aside className="portal-sidebar">
          <div className="sidebar-texture" />

          <div className="sidebar-brand">
            <div className="brand-eyebrow">Client Portal</div>
            <div className="brand-name">Material<br />Cycle</div>
            <div className="brand-sub">Waste Management Solutions</div>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Navigation</div>
            {navLinks.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname === to || location.pathname.startsWith(to + "/") ? "active" : ""}`}
              >
                <span className="nav-icon">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="user-avatar">
                {user ? user.firstName?.[0] : "?"}
              </div>
              <div style={{ minWidth: 0 }}>
                <div className="user-info-name">
                  {user ? `${user.firstName} ${user.lastName}` : "Loading…"}
                </div>
                <div className="user-info-email">{user?.email}</div>
              </div>
            </div>
            <button onClick={logout} className="logout-btn">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        <main className="portal-main">
          <div className="portal-header">
            <div className="header-eyebrow">Material Cycle</div>
            <h1 className="header-title">{title}</h1>
            {subtitle && <p className="header-subtitle">{subtitle}</p>}
            <div className="header-divider" />
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
