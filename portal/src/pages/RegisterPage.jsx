import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const [formData, setFormData] =
        useState({
            firstName: "",
            lastName: "",
            companyName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });

    const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.companyName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    formData.password === formData.confirmPassword;

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
        setLoading(true);

        const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        );

        const data = await response.json();

        if (response.ok) {
        navigate("/registration-success");
        }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };
    const handleChange = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
    }));
    };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* Left Side */}
        <div className="hidden lg:flex relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop"
            alt="Recycling"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-green-900/85 to-green-700/70" />

          <div className="relative z-10 p-16 flex flex-col justify-center text-white">
            <div className="uppercase tracking-widest text-green-300 font-semibold mb-4">
              Material Cycle Portal
            </div>

            <h1 className="text-6xl font-black leading-tight mb-8">
              Join The
              <span className="block text-green-400">
                Circular Economy
              </span>
            </h1>

            <p className="text-xl text-green-100 max-w-xl">
              Create an account to access manifests,
              disposal certificates, invoices, reporting,
              and compliance records.
            </p>

            <div className="mt-12 grid gap-4">
              <div>✓ Secure Client Platform</div>
              <div>✓ Manifest Management</div>
              <div>✓ Waste Tracking</div>
              <div>✓ Compliance Reporting</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-gray-100 p-10">
            
            <div className="mb-10 text-center">
              <div className="text-green-600 font-semibold uppercase tracking-widest mb-3">
                Create Account
              </div>

              <h2 className="text-4xl font-black mb-3">
                Register
              </h2>

              <p className="text-gray-500">
                Start managing your waste operations online.
              </p>
            </div>

            <form className="grid md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
              
              <input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />

              <input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />

              <input
                placeholder="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="md:col-span-2 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="md:col-span-2 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            {
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword && (
                <div className="md:col-span-2 text-red-500 text-sm">
                Passwords do not match.
                </div>
            )
            }

            <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`
                md:col-span-2
                py-4
                rounded-2xl
                text-lg
                font-bold
                shadow-lg
                transition-all
                flex
                justify-center
                items-center
                gap-3

                ${
                !isFormValid || loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }
            `}
            >
            {loading ? (
                <>
                <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.25"
                    />
                    <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>

                Creating Account...
                </>
            ) : (
                "Create Account"
            )}
            </button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-gray-500">
                Already have an account?
              </span>

              <Link
                to="/"
                className="ml-2 text-green-600 font-semibold hover:text-green-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}