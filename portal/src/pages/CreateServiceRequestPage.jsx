import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PortalLayout from "../layouts/PortalLayout";
import WasteVerificationForm, { EMPTY_FORM } from "../components/WasteVerificationForm";

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
    if (digits.length !== 10) return "Must be exactly 10 digits.";
    if (!/^0[0-9]{9}$/.test(digits)) return "Must start with 0 (e.g. 0731234567).";
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
    "wasteType", "wasteForm", "disposalReason",
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
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "wasteStreams" || key === "checklistComments") return;
      form.append(key, value ?? "");
    });
    form.append("wasteStreams", JSON.stringify(formData.wasteStreams));
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
    <PortalLayout title="Waste Verification Form" subtitle="SOP0012/14-1 — complete Section A and submit.">
      <WasteVerificationForm
        mode="customer"
        data={formData}
        onChange={(patch) => setFormData(prev => ({ ...prev, ...patch }))}
        msdsFile={msdsFile}
        onMsdsChange={setMsdsFile}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </PortalLayout>
  );
}
