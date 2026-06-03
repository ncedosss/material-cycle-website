import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError("");

        const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        );

        const data = await response.json();

        if (!response.ok) {
        setError(data.message);
        return;
        }

        localStorage.setItem(
        "token",
        data.token
        );

        localStorage.setItem(
        "user",
        JSON.stringify(data.user)
        );

        navigate("/dashboard");

    } catch (err) {
        setError("Login failed");
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
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Hero Section */}
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1600&auto=format&fit=crop"
          alt="Material Cycle"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-green-900/80 to-green-700/70" />

        <div className="relative z-10 flex h-full flex-col justify-center px-16 text-white">
          <div className="uppercase tracking-widest text-green-300 font-semibold mb-4">
            Material Cycle Portal
          </div>

          <h1 className="text-6xl font-black leading-tight mb-6">
            Smart Waste
            <span className="block text-green-400">
              Management Platform
            </span>
          </h1>

          <p className="text-xl text-green-100 max-w-xl">
            Access manifests, disposal certificates,
            invoices, reporting and compliance records
            through a secure client portal.
          </p>

          <div className="mt-12 space-y-4">
            <div>✓ Waste Tracking</div>
            <div>✓ Manifest Management</div>
            <div>✓ Disposal Certificates</div>
            <div>✓ Compliance Reporting</div>
          </div>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl border border-gray-100 p-10">
          <div className="text-center mb-8">
            <div className="text-green-600 font-semibold uppercase tracking-widest mb-3">
              Welcome Back
            </div>

            <h2 className="text-4xl font-black">
              Login
            </h2>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            {
            error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4">
                {error}
                </div>
            )
            }

            <button
            type="submit"
            disabled={loading}
            className="
                w-full
                bg-green-600
                hover:bg-green-700
                text-white
                py-4
                rounded-2xl
                text-lg
                font-bold
                shadow-lg
                disabled:opacity-50
            "
            >
            {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/forgot-password"
              className="text-green-600 hover:text-green-700"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mt-8 text-center">
            <span className="text-gray-500">
              Don't have an account?
            </span>

            <Link
              to="/register"
              className="ml-2 text-green-600 font-semibold"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}