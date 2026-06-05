import { useEffect, useState } from "react";
import PortalLayout from "../layouts/PortalLayout";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .dash-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 36px;
  }

  @media (max-width: 900px) {
    .dash-cards { grid-template-columns: 1fr; }
  }

  .stat-card {
    background: #fff;
    border-radius: 24px;
    padding: 32px 28px;
    border: 1px solid #ECEAE4;
    position: relative;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(26,31,28,0.08);
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 24px 24px 0 0;
  }

  .stat-card.yellow::before { background: linear-gradient(90deg, #D97706, #F59E0B); }
  .stat-card.green::before  { background: linear-gradient(90deg, #4A8C5D, #6DC98A); }
  .stat-card.blue::before   { background: linear-gradient(90deg, #2563EB, #60A5FA); }

  .stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .stat-icon.yellow { background: #FEF3C7; color: #D97706; }
  .stat-icon.green  { background: #DCFCE7; color: #4A8C5D; }
  .stat-icon.blue   { background: #DBEAFE; color: #2563EB; }

  .stat-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9CA3AF;
    margin-bottom: 8px;
  }

  .stat-value {
    font-family: 'DM Serif Display', serif;
    font-size: 52px;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .stat-value.yellow { color: #D97706; }
  .stat-value.green  { color: #4A8C5D; }
  .stat-value.blue   { color: #2563EB; }

  .stat-footer {
    margin-top: 12px;
    font-size: 12px;
    color: #9CA3AF;
    font-weight: 400;
  }

  /* ─── TABLE CARD ─── */
  .table-card {
    background: #fff;
    border-radius: 24px;
    border: 1px solid #ECEAE4;
    overflow: hidden;
  }

  .table-card-header {
    padding: 28px 32px 20px;
    border-bottom: 1px solid #F3F2EE;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .table-card-title {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: #1A1F1C;
    letter-spacing: -0.02em;
  }

  .table-card-badge {
    background: #F4F3EF;
    border: 1px solid #ECEAE4;
    border-radius: 20px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
  }

  .dash-table {
    width: 100%;
    border-collapse: collapse;
  }

  .dash-table thead tr {
    background: #FAFAF8;
  }

  .dash-table th {
    padding: 14px 20px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9CA3AF;
    border-bottom: 1px solid #F3F2EE;
  }

  .dash-table th:first-child { padding-left: 32px; }
  .dash-table th:last-child  { padding-right: 32px; }

  .dash-table tbody tr {
    transition: background 0.15s ease;
  }

  .dash-table tbody tr:hover {
    background: #FAFAF8;
  }

  .dash-table td {
    padding: 18px 20px;
    border-bottom: 1px solid #F3F2EE;
    font-size: 14px;
    color: #374151;
    font-weight: 400;
  }

  .dash-table tbody tr:last-child td { border-bottom: none; }
  .dash-table td:first-child { padding-left: 32px; }
  .dash-table td:last-child  { padding-right: 32px; }

  .req-number {
    font-weight: 600;
    color: #1A1F1C;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.01em;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .status-pill.pending  { background: #FEF3C7; color: #92400E; }
  .status-pill.approved { background: #DCFCE7; color: #166534; }
  .status-pill.manifest { background: #DBEAFE; color: #1E40AF; }
  .status-pill.default  { background: #F3F4F6; color: #374151; }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .status-pill.pending  .status-dot { background: #D97706; }
  .status-pill.approved .status-dot { background: #16A34A; }
  .status-pill.manifest .status-dot { background: #2563EB; }
  .status-pill.default  .status-dot { background: #9CA3AF; }

  .date-text {
    color: #9CA3AF;
    font-size: 13px;
  }

  .empty-state {
    padding: 60px 32px;
    text-align: center;
    color: #9CA3AF;
  }

  .empty-icon {
    width: 48px;
    height: 48px;
    background: #F4F3EF;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
  }

  .empty-title { font-weight: 600; font-size: 15px; color: #4B5563; margin-bottom: 6px; }
  .empty-sub   { font-size: 13px; }
`;

function getStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "pending") return "pending";
  if (s === "approved" || s === "accepted") return "approved";
  if (s.includes("manifest")) return "manifest";
  return "default";
}

export default function DashboardPage() {
  const [summary, setSummary] = useState({
    pendingRequests: 0,
    approvedRequests: 0,
    manifestsCreated: 0,
    recentRequests: []
  });

  useEffect(() => { loadDashboard(); }, []);

  const loadDashboard = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/dashboard/summary", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setSummary(data);
  };

  const stats = [
    {
      label: "Pending Requests",
      value: summary.pendingRequests,
      color: "yellow",
      footer: "Awaiting review",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
      )
    },
    {
      label: "Approved Requests",
      value: summary.approvedRequests,
      color: "green",
      footer: "Ready to process",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
        </svg>
      )
    },
    {
      label: "Manifests Created",
      value: summary.manifestsCreated,
      color: "blue",
      footer: "Documents issued",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
      )
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <PortalLayout title="Dashboard" subtitle="Overview of your waste services and activity.">

        <div className="dash-cards">
          {stats.map(({ label, value, color, footer, icon }) => (
            <div key={label} className={`stat-card ${color}`}>
              <div className={`stat-icon ${color}`}>{icon}</div>
              <div className="stat-label">{label}</div>
              <div className={`stat-value ${color}`}>{value}</div>
              <div className="stat-footer">{footer}</div>
            </div>
          ))}
        </div>

        <div className="table-card">
          <div className="table-card-header">
            <div className="table-card-title">Recent Service Requests</div>
            <span className="table-card-badge">
              {summary.recentRequests.length} records
            </span>
          </div>

          {summary.recentRequests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="22" height="22" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                  <rect x="9" y="3" width="6" height="4" rx="1"/>
                </svg>
              </div>
              <div className="empty-title">No recent requests</div>
              <div className="empty-sub">Your recent service requests will appear here.</div>
            </div>
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Request #</th>
                  <th>Waste Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {summary.recentRequests.map((request) => {
                  const sc = getStatusClass(request.status);
                  return (
                    <tr key={request.request_number}>
                      <td><span className="req-number">{request.request_number}</span></td>
                      <td>{request.waste_type}</td>
                      <td>
                        <span className={`status-pill ${sc}`}>
                          <span className="status-dot" />
                          {request.status}
                        </span>
                      </td>
                      <td><span className="date-text">{new Date(request.created_at).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

      </PortalLayout>
    </>
  );
}
