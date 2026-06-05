import { useEffect, useState } from "react";
import PortalLayout from "../layouts/PortalLayout";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .svc-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 28px;
  }

  .svc-filters {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    flex: 1;
  }

  .search-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
    max-width: 300px;
  }

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
    pointer-events: none;
  }

  .svc-input {
    width: 100%;
    padding: 11px 14px 11px 40px;
    border: 1.5px solid #E5E4DF;
    border-radius: 12px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    background: #fff;
    color: #1A1F1C;
    transition: border-color 0.18s, box-shadow 0.18s;
    outline: none;
  }

  .svc-input::placeholder { color: #9CA3AF; }
  .svc-input:focus {
    border-color: #4A8C5D;
    box-shadow: 0 0 0 3px rgba(74,140,93,0.12);
  }

  .svc-select {
    padding: 11px 36px 11px 14px;
    border: 1.5px solid #E5E4DF;
    border-radius: 12px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%239CA3AF' strokeWidth='2' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E") no-repeat right 14px center;
    appearance: none;
    color: #1A1F1C;
    cursor: pointer;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    min-width: 160px;
  }

  .svc-select:focus {
    border-color: #4A8C5D;
    box-shadow: 0 0 0 3px rgba(74,140,93,0.12);
  }

  .new-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #1A1F1C;
    color: #F4F3EF;
    padding: 11px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.18s ease;
    white-space: nowrap;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.01em;
  }

  .new-btn:hover {
    background: #4A8C5D;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(74,140,93,0.3);
  }

  .table-card {
    background: #fff;
    border-radius: 24px;
    border: 1px solid #ECEAE4;
    overflow: hidden;
  }

  .svc-table {
    width: 100%;
    border-collapse: collapse;
  }

  .svc-table thead tr {
    background: #FAFAF8;
  }

  .svc-table th {
    padding: 14px 20px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9CA3AF;
    border-bottom: 1px solid #F3F2EE;
  }

  .svc-table th:first-child { padding-left: 28px; }
  .svc-table th:last-child  { padding-right: 28px; }

  .svc-table tbody tr {
    transition: background 0.14s ease;
  }

  .svc-table tbody tr:hover { background: #FAFAF8; }

  .svc-table td {
    padding: 18px 20px;
    border-bottom: 1px solid #F3F2EE;
    font-size: 14px;
    color: #374151;
    vertical-align: middle;
  }

  .svc-table tbody tr:last-child td { border-bottom: none; }
  .svc-table td:first-child { padding-left: 28px; }
  .svc-table td:last-child  { padding-right: 28px; }

  .req-number {
    font-weight: 600;
    color: #1A1F1C;
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
  }

  .waste-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    background: #F4F3EF;
    color: #4B5563;
    border: 1px solid #E5E4DF;
  }

  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .status-pill.pending  { background: #FEF3C7; color: #92400E; }
  .status-pill.pending  .status-dot { background: #D97706; }
  .status-pill.approved { background: #DCFCE7; color: #166534; }
  .status-pill.approved .status-dot { background: #16A34A; }
  .status-pill.manifest { background: #DBEAFE; color: #1E40AF; }
  .status-pill.manifest .status-dot { background: #2563EB; }
  .status-pill.default  { background: #F3F4F6; color: #374151; }
  .status-pill.default  .status-dot { background: #9CA3AF; }

  .date-text { color: #9CA3AF; font-size: 13px; }

  .view-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: #4A8C5D;
    font-weight: 600;
    font-size: 13px;
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1.5px solid rgba(74,140,93,0.25);
    transition: all 0.16s ease;
  }

  .view-link:hover {
    background: rgba(74,140,93,0.08);
    border-color: #4A8C5D;
  }

  .vol-text { font-variant-numeric: tabular-nums; }

  .empty-state {
    padding: 64px 32px;
    text-align: center;
    color: #9CA3AF;
  }
  .empty-icon {
    width: 52px; height: 52px;
    background: #F4F3EF;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
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

export default function ServicesRequestedPage() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch]     = useState("");
  const [status, setStatus]     = useState("");

  useEffect(() => { loadRequests(); }, []);
  useEffect(() => { loadRequests(); }, [search, status]);

  const loadRequests = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/service-requests?search=${search}&status=${status}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await response.json();
    setRequests(data);
  };

  return (
    <>
      <style>{styles}</style>
      <PortalLayout title="Services Requested" subtitle="Track and manage all waste service requests.">

        <div className="svc-toolbar">
          <div className="svc-filters">
            <div className="search-wrap">
              <span className="search-icon">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </span>
              <input
                className="svc-input"
                placeholder="Search Request #"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="svc-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Manifest Issued</option>
            </select>
          </div>

          <Link to="/services/new" className="new-btn">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Request
          </Link>
        </div>

        <div className="table-card">
          {requests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="24" height="24" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                  <rect x="9" y="3" width="6" height="4" rx="1"/>
                </svg>
              </div>
              <div className="empty-title">No requests found</div>
              <div className="empty-sub">Try adjusting your filters or create a new service request.</div>
            </div>
          ) : (
            <table className="svc-table">
              <thead>
                <tr>
                  <th>Request #</th>
                  <th>Waste Type</th>
                  <th>Volume</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => {
                  const sc = getStatusClass(request.status);
                  return (
                    <tr key={request.id}>
                      <td><span className="req-number">{request.request_number}</span></td>
                      <td><span className="waste-badge">{request.waste_type}</span></td>
                      <td><span className="vol-text">{request.volume}</span></td>
                      <td>
                        <span className={`status-pill ${sc}`}>
                          <span className="status-dot" />
                          {request.status}
                        </span>
                      </td>
                      <td>
                        <span className="date-text">
                          {new Date(request.created_at).toLocaleDateString("en-ZA", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </td>
                      <td>
                        <Link to={`/services/${request.id}`} className="view-link">
                          View
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </td>
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
