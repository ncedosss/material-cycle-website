import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPasswordPage() {
    const { token } = useParams();
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const isPasswordValid = password.length >= 8;

    const passwordsMatch = password === confirmPassword;

    const isFormValid = isPasswordValid && passwordsMatch && confirmPassword !== "";

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
        setLoading(true);

        const response =
        await fetch(
            `${API_URL}/api/auth/reset-password/${token}`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password
            })
            }
        );

        if (response.ok) {
        setSuccess(true);

        setTimeout(() => {
            navigate("/");
        }, 3000);
        }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">

      <div className="bg-white p-10 rounded-[32px] shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-black mb-8">
          Reset Password
        </h1>

        {
        success ? (
            <div className="text-center">

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-green-600">
                ✓
                </span>
            </div>

            <h2 className="text-3xl font-black text-green-600 mb-4">
                Password Updated
            </h2>

            <p className="text-gray-500 mb-6">
                Your password has been successfully reset.
            </p>

            <p className="text-sm text-gray-400">
                Redirecting to login...
            </p>

            </div>
        ) : (

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

        <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) =>
            setPassword(e.target.value)
        }
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
        password &&
        password.length < 8 && (
            <div className="text-red-500 text-sm">
            Password must be at least 8 characters.
            </div>
        )
        }

        <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) =>
            setConfirmPassword(e.target.value)
        }
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
        confirmPassword &&
        !passwordsMatch && (
            <div className="text-red-500 text-sm">
            Passwords do not match.
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
            font-bold
            text-lg
            flex
            items-center
            justify-center
            gap-3
            transition-all

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

            Updating Password...
            </>
        ) : (
            "Update Password"
        )}
        </button>

        </form>
        )}
      </div>

    </div>
  );
}