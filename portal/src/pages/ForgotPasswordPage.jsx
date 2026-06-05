import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isFormValid = emailRegex.test(email);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
        setLoading(true);

        const response =
        await fetch(
            `${API_URL}/api/auth/forgot-password`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
            }
        );

        if (response.ok) {
        setSuccess(true);
        }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* Left Side */}
        <div className="hidden lg:flex relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
            alt="Forgot Password"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-green-900/85 to-green-700/70" />

          <div className="relative z-10 p-16 flex flex-col justify-center text-white">
            <div className="uppercase tracking-widest text-green-300 font-semibold mb-4">
              Material Cycle Portal
            </div>

            <h1 className="text-6xl font-black leading-tight mb-8">
              Reset Your
              <span className="block text-green-400">
                Password
              </span>
            </h1>

            <p className="text-xl text-green-100 max-w-xl">
              Don't worry. Enter your email address and we'll send
              you a secure password reset link.
            </p>

            <div className="mt-12 space-y-4">
              <div>✓ Secure Account Recovery</div>
              <div>✓ Email Verification</div>
              <div>✓ Enterprise Security</div>
              <div>✓ Fast Access Restoration</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-gray-100 p-10">

            <div className="text-center mb-10">
              <div className="text-green-600 font-semibold uppercase tracking-widest mb-3">
                Account Recovery
              </div>

              <h2 className="text-4xl font-black mb-4">
                Forgot Password
              </h2>

              <p className="text-gray-500">
                Enter your email address below and we'll send you
                instructions to reset your password.
              </p>
            </div>
            {success ? (
                <div className="text-center">

                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl text-green-600">
                    ✓
                    </span>
                </div>

                <h2 className="text-3xl font-black text-green-600 mb-4">
                    Email Sent
                </h2>

                <p className="text-gray-500 mb-6">
                    If an account exists for this email address,
                    a password reset link has been sent.
                </p>

                <Link
                    to="/"
                    className="
                    inline-block
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                    "
                >
                    Back To Login
                </Link>

                </div>
            ):(
            <form className="space-y-6" onSubmit={handleSubmit}>
            <input
            type="email"
            value={email}
            onChange={(e) =>
                setEmail(e.target.value)
            }
            placeholder="Email Address"
            className="
                w-full
                border
                border-gray-200
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-green-500
                focus:ring-4
                focus:ring-green-100
            "
            />
            {
            email &&
            !emailRegex.test(email) && (
                <div className="text-red-500 text-sm">
                Please enter a valid email address.
                </div>
            )
            }

            <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`
                w-full
                py-4
                rounded-2xl
                text-lg
                font-bold
                shadow-lg
                transition-all
                flex
                items-center
                justify-center
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

                Sending Reset Link...
                </>
            ) : (
                "Send Reset Link"
            )}
            </button>
            </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}