import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "../layouts/PortalLayout";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .form-card {
    background: #fff;
    border-radius: 24px;
    border: 1px solid #ECEAE4;
    overflow: hidden;
  }

  .form-section {
    padding: 32px 36px;
    border-bottom: 1px solid #F3F2EE;
  }

  .form-section:last-of-type {
    border-bottom: none;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 28px;
  }

  .section-num {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: #1A1F1C;
    color: #F4F3EF;
    font-size: 13px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: 'DM Serif Display', serif;
  }

  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: #1A1F1C;
    letter-spacing: -0.01em;
  }

  .section-sub {
    font-size: 13px;
    color: #9CA3AF;
    margin-top: 2px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 768px) {
    .form-grid { grid-template-columns: 1fr; }
    .form-section { padding: 24px 20px; }
  }

  .field-wrap {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-label {
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .field-input,
  .field-select,
  .field-textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid #E5E4DF;
    border-radius: 12px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    background: #FAFAF8;
    color: #1A1F1C;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    outline: none;
  }

  .field-input::placeholder,
  .field-textarea::placeholder { color: #B0AEAD; }

  .field-input:focus,
  .field-select:focus,
  .field-textarea:focus {
    border-color: #4A8C5D;
    box-shadow: 0 0 0 3px rgba(74,140,93,0.12);
    background: #fff;
  }

  .field-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%239CA3AF' strokeWidth='2' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-color: #FAFAF8;
    cursor: pointer;
    padding-right: 36px;
  }

  .field-select option { background: #fff; }

  .field-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }

  .date-field-wrap {
    position: relative;
    cursor: pointer;
  }

  .date-field-wrap .field-input {
    cursor: pointer;
    padding-right: 40px;
  }

  .date-icon {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
    pointer-events: none;
  }

  .file-upload-area {
    border: 2px dashed #D1D0CB;
    border-radius: 14px;
    padding: 28px 20px;
    text-align: center;
    transition: border-color 0.18s, background 0.18s;
    cursor: pointer;
    background: #FAFAF8;
    position: relative;
  }

  .file-upload-area:hover {
    border-color: #4A8C5D;
    background: rgba(74,140,93,0.03);
  }

  .file-upload-area.has-file {
    border-color: #4A8C5D;
    background: rgba(74,140,93,0.04);
  }

  .file-upload-area input[type="file"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .file-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #F4F3EF;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    color: #6B7280;
  }

  .file-upload-title { font-weight: 600; font-size: 14px; color: #1A1F1C; margin-bottom: 4px; }
  .file-upload-sub { font-size: 12px; color: #9CA3AF; }
  .file-name { font-size: 13px; font-weight: 600; color: #4A8C5D; margin-top: 8px; }

  /* Declaration */
  .declaration-box {
    background: #F4F3EF;
    border: 1px solid #E5E4DF;
    border-radius: 14px;
    padding: 16px 20px;
    font-size: 13px;
    color: #6B7280;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .sig-input {
    font-style: italic;
    font-family: Georgia, serif;
    font-size: 16px;
    letter-spacing: 0.03em;
    color: #1A1F1C;
  }

  /* Submit row */
  .form-actions {
    padding: 28px 36px;
    background: #FAFAF8;
    border-top: 1px solid #F3F2EE;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }

  .cancel-btn {
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    color: #6B7280;
    background: transparent;
    border: 1.5px solid #E5E4DF;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.16s ease;
  }

  .cancel-btn:hover { background: #F4F3EF; color: #374151; }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    background: #1A1F1C;
    color: #F4F3EF;
    border: none;
    cursor: pointer;
    transition: all 0.18s ease;
    letter-spacing: 0.01em;
  }

  .submit-btn:hover {
    background: #4A8C5D;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(74,140,93,0.3);
  }

  .field-input.error,
  .field-select.error,
  .field-textarea.error {
    border-color: #E5534B;
    box-shadow: 0 0 0 3px rgba(229,83,75,0.1);
  }

  .field-error-msg {
    font-size: 11px;
    color: #E5534B;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 2px;
  }

  .field-hint {
    font-size: 11px;
    color: #9CA3AF;
    margin-top: 2px;
  }

  .required-star { color: #E5534B; margin-left: 2px; }

  .form-progress-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-right: 16px;
  }

  .form-progress-label {
    font-size: 11px;
    color: #9CA3AF;
    font-weight: 500;
  }

  .form-progress-label.ready { color: #4A8C5D; font-weight: 700; }

  .form-progress-track {
    height: 3px;
    background: #E5E4DF;
    border-radius: 4px;
    overflow: hidden;
  }

  .form-progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease, background 0.3s ease;
  }

  .form-progress-fill.partial  { background: linear-gradient(90deg, #D97706, #F59E0B); }
  .form-progress-fill.complete { background: linear-gradient(90deg, #4A8C5D, #6DC98A); }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export default function CreateServiceRequestPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const declarationDateRef = useRef(null);
  const etaRef = useRef(null);
  const [msdsFile, setMsdsFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    vehicleRegistration: "",
    driverName: "",
    wirNumber: "",
    wasteType: "",
    wasteForm: "",
    volume: "",
    eta: "",
    disposalReason: "",
    signature: "",
    declarationDate: ""
  });

  const [contactNumberError, setContactNumberError] = useState("");
  const [touched, setTouched] = useState({});

  const validatePhone = (value) => {
    const digits = value.replace(/\D/g, "");
    if (!value.trim()) return "Contact number is required.";
    if (digits.length < 10) return "Must be at least 10 digits.";
    if (digits.length > 15) return "Too long — max 15 digits.";
    // Accept formats: 0xxxxxxxxx, +27xxxxxxxxx, international with country code
    if (!/^[+]?[0-9\s\-()]{10,}$/.test(value.trim())) return "Invalid phone number format.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "contactNumber") {
      setContactNumberError(validatePhone(value));
    }
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
    if (e.target.name === "contactNumber") {
      setContactNumberError(validatePhone(e.target.value));
    }
  };

  // Required fields (MSDS excluded)
  const REQUIRED_FIELDS = [
    "vehicleRegistration", "driverName", "eta",
    "wasteType", "wasteForm", "volume", "disposalReason",
    "customerName", "contactNumber",
    "signature", "declarationDate",
  ];

  const filledCount = REQUIRED_FIELDS.filter(k => (formData[k] || "").toString().trim() !== "").length;
  const totalRequired = REQUIRED_FIELDS.length;

  const isFormValid =
    REQUIRED_FIELDS.every(k => (formData[k] || "").toString().trim() !== "") &&
    validatePhone(formData.contactNumber) === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("token");
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (msdsFile) form.append("msdsFile", msdsFile);
    const response = await fetch(`${API_URL}/api/service-requests`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form
    });
    setSubmitting(false);
    if (response.ok) navigate("/services");
  };

  return (
    <>
      <style>{styles}</style>
      <PortalLayout title="New Service Request" subtitle="Complete the Waste Verification Form to submit a new request.">

        <form onSubmit={handleSubmit}>
          <div className="form-card">

            {/* Section 1 — Vehicle & Driver */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-num">1</div>
                <div>
                  <div className="section-title">Vehicle & Driver</div>
                  <div className="section-sub">Details of the vehicle and driver assigned to this collection.</div>
                </div>
              </div>
              <div className="form-grid">
                <div className="field-wrap">
                  <label className="field-label">Vehicle Registration</label>
                  <input className="field-input" name="vehicleRegistration" placeholder="e.g. CA 123-456" value={formData.vehicleRegistration} onChange={handleChange} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Driver Name</label>
                  <input className="field-input" name="driverName" placeholder="Full name" value={formData.driverName} onChange={handleChange} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">WIR Number</label>
                  <input className="field-input" name="wirNumber" placeholder="WIR reference" value={formData.wirNumber} onChange={handleChange} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Estimated Time of Arrival</label>
                  <div className="date-field-wrap" onClick={() => etaRef.current?.showPicker()}>
                    <input
                      ref={etaRef}
                      type="datetime-local"
                      name="eta"
                      value={formData.eta}
                      onChange={handleChange}
                      className="field-input"
                      style={{ cursor: "pointer" }}
                    />
                    <span className="date-icon">
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 — Waste Details */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-num">2</div>
                <div>
                  <div className="section-title">Waste Details</div>
                  <div className="section-sub">Classification and volume of the waste being disposed.</div>
                </div>
              </div>
              <div className="form-grid">
                <div className="field-wrap">
                  <label className="field-label">Waste Type</label>
                  <select className="field-select" name="wasteType" value={formData.wasteType} onChange={handleChange}>
                    <option value="">Select waste type</option>
                    <option value="Hazardous">Hazardous</option>
                    <option value="Non-Hazardous">Non-Hazardous</option>
                    <option value="Recyclable">Recyclable</option>
                  </select>
                </div>
                <div className="field-wrap">
                  <label className="field-label">Waste Form</label>
                  <select className="field-select" name="wasteForm" value={formData.wasteForm} onChange={handleChange}>
                    <option value="">Select waste form</option>
                    <option value="Solid">Solid</option>
                    <option value="Sludge">Sludge</option>
                    <option value="Liquid">Liquid</option>
                  </select>
                </div>
                <div className="field-wrap">
                  <label className="field-label">Volume</label>
                  <input type="number" className="field-input" name="volume" placeholder="e.g. 500" value={formData.volume} onChange={handleChange} />
                </div>
              </div>
              <div style={{ marginTop: "16px" }}>
                <div className="field-wrap">
                  <label className="field-label">Reason for Disposal</label>
                  <textarea
                    className="field-textarea"
                    name="disposalReason"
                    placeholder="Describe the reason this waste is being disposed of..."
                    value={formData.disposalReason}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Section 3 — MSDS */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-num">3</div>
                <div>
                  <div className="section-title">Safety Data Sheet</div>
                  <div className="section-sub">Upload the Material Safety Data Sheet (MSDS) for this waste.</div>
                </div>
              </div>
              <div className={`file-upload-area ${msdsFile ? "has-file" : ""}`}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={(e) => setMsdsFile(e.target.files[0])}
                />
                <div className="file-icon">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                {msdsFile ? (
                  <>
                    <div className="file-upload-title">File selected</div>
                    <div className="file-name">{msdsFile.name}</div>
                  </>
                ) : (
                  <>
                    <div className="file-upload-title">Click or drag to upload MSDS</div>
                    <div className="file-upload-sub">PDF, DOC, DOCX, PNG, JPG accepted</div>
                  </>
                )}
              </div>
            </div>

            {/* Section 4 — Contact */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-num">4</div>
                <div>
                  <div className="section-title">Contact Information</div>
                  <div className="section-sub">Primary contact for this service request.</div>
                </div>
              </div>
              <div className="form-grid">
                <div className="field-wrap">
                  <label className="field-label">Customer Name</label>
                  <input className="field-input" name="customerName" placeholder="Full name" value={formData.customerName} onChange={handleChange} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">
                    Contact Number<span className="required-star">*</span>
                  </label>
                  <input
                    className={`field-input ${touched.contactNumber && contactNumberError ? "error" : ""}`}
                    name="contactNumber"
                    placeholder="+27 00 000 0000"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.contactNumber && contactNumberError
                    ? <span className="field-error-msg">
                        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                        {contactNumberError}
                      </span>
                    : <span className="field-hint">e.g. 0731234567 or +27 73 123 4567</span>
                  }
                </div>
              </div>
            </div>

            {/* Section 5 — Declaration */}
            <div className="form-section">
              <div className="section-header">
                <div className="section-num">5</div>
                <div>
                  <div className="section-title">Declaration</div>
                  <div className="section-sub">By signing, you confirm that the information provided is accurate.</div>
                </div>
              </div>
              <div className="declaration-box">
                I declare that the information provided in this Waste Verification Form is true and accurate to the best of my knowledge. I understand that providing false information may result in legal consequences.
              </div>
              <div className="form-grid">
                <div className="field-wrap">
                  <label className="field-label">Electronic Signature</label>
                  <input
                    className={`field-input sig-input`}
                    name="signature"
                    placeholder="Type your full name"
                    value={formData.signature}
                    onChange={handleChange}
                  />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Declaration Date</label>
                  <div className="date-field-wrap" onClick={() => declarationDateRef.current?.showPicker()}>
                    <input
                      ref={declarationDateRef}
                      type="date"
                      name="declarationDate"
                      value={formData.declarationDate}
                      onChange={handleChange}
                      className="field-input"
                      style={{ cursor: "pointer" }}
                    />
                    <span className="date-icon">
                      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="form-actions">
            {/* Progress indicator */}
            <div className="form-progress-wrap">
              <div className={`form-progress-label ${isFormValid ? "ready" : ""}`}>
                {isFormValid ? "Ready to submit" : `${filledCount} of ${totalRequired} fields complete`}
              </div>
              <div className="form-progress-track">
                <div
                  className={`form-progress-fill ${isFormValid ? "complete" : "partial"}`}
                  style={{ width: `${Math.round((filledCount / totalRequired) * 100)}%` }}
                />
              </div>
            </div>
            <button type="button" className="cancel-btn" onClick={() => navigate("/services")}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={submitting || !isFormValid} title={!isFormValid ? "Please complete all required fields" : ""}>
              {submitting ? (
                <>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M12 2a10 10 0 0110 10"/>
                  </svg>
                  Submitting…
                </>
              ) : (
                <>
                  Submit Request
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </PortalLayout>
    </>
  );
}
