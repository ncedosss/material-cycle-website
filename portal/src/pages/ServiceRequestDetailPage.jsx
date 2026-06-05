import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PortalLayout from "../layouts/PortalLayout";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
    align-items: start;
  }

  @media (max-width: 1024px) {
    .detail-grid { grid-template-columns: 1fr; }
  }

  .detail-card {
    background: #fff;
    border-radius: 24px;
    border: 1px solid #ECEAE4;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .detail-card:last-child { margin-bottom: 0; }

  .detail-card-header {
    padding: 24px 28px 18px;
    border-bottom: 1px solid #F3F2EE;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .detail-card-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #F4F3EF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4A8C5D;
    flex-shrink: 0;
  }

  .detail-card-title {
    font-family: 'DM Serif Display', serif;
    font-size: 18px;
    color: #1A1F1C;
    letter-spacing: -0.01em;
  }

  .detail-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  .detail-field {
    padding: 20px 28px;
    border-bottom: 1px solid #F3F2EE;
    border-right: 1px solid #F3F2EE;
  }

  .detail-field:nth-child(even) { border-right: none; }
  .detail-field:last-child,
  .detail-field:nth-last-child(2):nth-child(odd) { border-bottom: none; }
  .detail-field.full {
    grid-column: 1 / -1;
    border-right: none;
  }

  @media (max-width: 640px) {
    .detail-fields { grid-template-columns: 1fr; }
    .detail-field { border-right: none; }
    .detail-field:last-child { border-bottom: none; }
  }

  .field-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9CA3AF;
    margin-bottom: 6px;
  }

  .field-value {
    font-size: 15px;
    font-weight: 500;
    color: #1A1F1C;
  }

  .field-value.mono {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
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

  .msds-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #F4F3EF;
    border: 1.5px solid #E5E4DF;
    border-radius: 10px;
    padding: 9px 14px;
    font-size: 13px;
    font-weight: 600;
    color: #4A8C5D;
    text-decoration: none;
    transition: all 0.16s ease;
  }

  .msds-link:hover {
    background: rgba(74,140,93,0.08);
    border-color: #4A8C5D;
  }

  /* ─── TIMELINE ─── */
  .timeline-card {
    background: #fff;
    border-radius: 24px;
    border: 1px solid #ECEAE4;
    overflow: hidden;
    position: sticky;
    top: 24px;
  }

  .timeline-header {
    padding: 24px 28px 18px;
    border-bottom: 1px solid #F3F2EE;
  }

  .timeline-title {
    font-family: 'DM Serif Display', serif;
    font-size: 18px;
    color: #1A1F1C;
  }

  .timeline-body {
    padding: 24px 28px;
  }

  .timeline-step {
    display: flex;
    gap: 16px;
    position: relative;
  }

  .timeline-step + .timeline-step {
    margin-top: 0;
  }

  .timeline-line-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .timeline-dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 13px;
    font-weight: 700;
    transition: all 0.2s ease;
    z-index: 1;
  }

  .timeline-dot.done {
    background: #1A1F1C;
    color: #F4F3EF;
    box-shadow: 0 0 0 4px rgba(26,31,28,0.08);
  }

  .timeline-dot.active {
    background: #4A8C5D;
    color: #fff;
    box-shadow: 0 0 0 4px rgba(74,140,93,0.18);
    animation: pulse-dot 2s ease infinite;
  }

  .timeline-dot.pending {
    background: #F4F3EF;
    color: #9CA3AF;
    border: 2px solid #E5E4DF;
  }

  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 4px rgba(74,140,93,0.18); }
    50% { box-shadow: 0 0 0 8px rgba(74,140,93,0.08); }
  }

  .timeline-connector {
    width: 2px;
    flex: 1;
    min-height: 28px;
    margin: 4px 0;
  }

  .timeline-connector.done { background: #1A1F1C; }
  .timeline-connector.pending { background: #E5E4DF; }

  .timeline-content {
    padding-bottom: 28px;
    padding-top: 4px;
  }

  .timeline-step:last-child .timeline-content { padding-bottom: 0; }

  .timeline-step-title {
    font-size: 14px;
    font-weight: 600;
    color: #1A1F1C;
    line-height: 1.3;
    margin-bottom: 3px;
  }

  .timeline-step-title.dim { color: #9CA3AF; }

  .timeline-step-sub {
    font-size: 12px;
    color: #9CA3AF;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #6B7280;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    margin-bottom: 24px;
    padding: 7px 0;
    transition: color 0.15s;
  }

  .back-link:hover { color: #1A1F1C; }

  .skeleton {
    background: linear-gradient(90deg, #F4F3EF 25%, #ECEAE4 50%, #F4F3EF 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s ease infinite;
    border-radius: 8px;
  }

  @keyframes shimmer { to { background-position: -200% 0; } }
`;

function getStatusClass(status) {
  const s = (status || "").toLowerCase();
  if (s === "pending") return "pending";
  if (s === "approved" || s === "accepted") return "approved";
  if (s.includes("manifest")) return "manifest";
  return "default";
}

function getStepState(request, stepKey) {
  const s = (request?.status || "").toLowerCase();
  if (stepKey === "submitted") return "done";
  if (stepKey === "approved") return (s === "approved" || s === "accepted") ? "done" : "pending";
  if (stepKey === "received") return (s === "approved" || s === "accepted") ? "active" : "pending";
  if (stepKey === "manifest") return s.includes("manifest") ? "done" : "pending";
  return "pending";
}

export default function ServiceRequestDetailPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => { loadRequest(); }, []);

  const loadRequest = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/service-requests/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    setRequest(data);
  };

  const sc = request ? getStatusClass(request.status) : "default";

  const timelineSteps = [
    { key: "submitted", title: "Request Submitted",  sub: "Your request has been received." },
    { key: "approved",  title: "Approved",            sub: "Reviewed and approved by the team." },
    { key: "received",  title: "Waste Received",      sub: "Waste collected at the facility." },
    { key: "manifest",  title: "Manifest Issued",     sub: "Official manifest document created." },
  ];

  const fields = request ? [
    { label: "Request Number", value: <span className="field-value mono">{request.request_number}</span> },
    { label: "Status", value: (
      <span className={`status-pill ${sc}`}>
        <span className="status-dot" />
        {request.status}
      </span>
    )},
    { label: "Waste Type", value: request.waste_type },
    { label: "Waste Form", value: request.waste_form || "—" },
    { label: "Volume", value: request.volume },
    { label: "WIR Number", value: request.wir_number || "—" },
    { label: "Driver", value: request.driver_name || "—" },
    { label: "Vehicle", value: request.vehicle_registration || "—" },
    { label: "Date Submitted", value: new Date(request.created_at).toLocaleDateString("en-ZA", { day: "2-digit", month: "long", year: "numeric" }) },
    { label: "Customer", value: request.customer_name || "—" },
  ] : [];

  return (
    <>
      <style>{styles}</style>
      <PortalLayout
        title={request ? request.request_number : "Loading…"}
        subtitle="Service Request Details"
      >
        <Link to="/services" className="back-link">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Services
        </Link>

        {!request ? (
          <div className="detail-card" style={{ padding: "40px 28px" }}>
            <div className="skeleton" style={{ height: "18px", width: "30%", marginBottom: "12px" }} />
            <div className="skeleton" style={{ height: "14px", width: "60%", marginBottom: "8px" }} />
            <div className="skeleton" style={{ height: "14px", width: "45%" }} />
          </div>
        ) : (
          <div className="detail-grid">
            {/* Left column */}
            <div>
              {/* Request Info */}
              <div className="detail-card">
                <div className="detail-card-header">
                  <div className="detail-card-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
                      <rect x="9" y="3" width="6" height="4" rx="1"/>
                    </svg>
                  </div>
                  <div className="detail-card-title">Request Information</div>
                </div>
                <div className="detail-fields">
                  {fields.map(({ label, value }) => (
                    <div key={label} className="detail-field">
                      <div className="field-label">{label}</div>
                      {typeof value === "string"
                        ? <div className="field-value">{value}</div>
                        : value}
                    </div>
                  ))}
                  {request.disposal_reason && (
                    <div className="detail-field full">
                      <div className="field-label">Reason for Disposal</div>
                      <div className="field-value" style={{ fontSize: "14px", lineHeight: "1.6", fontWeight: "400" }}>
                        {request.disposal_reason}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* MSDS Document */}
              {request.msds_document && (
                <div className="detail-card">
                  <div className="detail-card-header">
                    <div className="detail-card-icon">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <path d="M14 2v6h6"/>
                      </svg>
                    </div>
                    <div className="detail-card-title">Safety Data Sheet</div>
                  </div>
                  <div style={{ padding: "20px 28px" }}>
                    <a
                      href={`http://localhost:5000/${request.msds_document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="msds-link"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      View MSDS Document
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Right column — Timeline */}
            <div className="timeline-card">
              <div className="timeline-header">
                <div className="timeline-title">Progress</div>
              </div>
              <div className="timeline-body">
                {timelineSteps.map((step, i) => {
                  const state = getStepState(request, step.key);
                  const isLast = i === timelineSteps.length - 1;
                  const connectorDone = getStepState(request, timelineSteps[i + 1]?.key) === "done" || state === "done";
                  return (
                    <div key={step.key} className="timeline-step">
                      <div className="timeline-line-wrap">
                        <div className={`timeline-dot ${state}`}>
                          {state === "done" ? (
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          ) : state === "active" ? (
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          ) : (
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="4"/>
                            </svg>
                          )}
                        </div>
                        {!isLast && (
                          <div className={`timeline-connector ${state === "done" ? "done" : "pending"}`} />
                        )}
                      </div>
                      <div className="timeline-content">
                        <div className={`timeline-step-title ${state === "pending" ? "dim" : ""}`}>
                          {step.title}
                        </div>
                        <div className="timeline-step-sub">{step.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </PortalLayout>
    </>
  );
}
