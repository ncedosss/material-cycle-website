import { Link } from "react-router-dom";

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* Left Side */}
        <div className="hidden lg:flex relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1600&auto=format&fit=crop"
            alt="Material Cycle"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-green-900/85 to-green-700/70" />

          <div className="relative z-10 p-16 flex flex-col justify-center text-white">
            <div className="uppercase tracking-widest text-green-300 font-semibold mb-4">
              Material Cycle Portal
            </div>

            <h1 className="text-6xl font-black leading-tight mb-8">
              Account
              <span className="block text-green-400">
                Created
              </span>
            </h1>

            <p className="text-xl text-green-100 max-w-xl">
              Thank you for registering with Material Cycle.
              Your account is almost ready.
            </p>

            <div className="mt-12 grid gap-4">
              <div>✓ Registration Complete</div>
              <div>✓ Verification Email Sent</div>
              <div>✓ Secure Client Portal</div>
              <div>✓ Waste Management Platform</div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-xl bg-white rounded-[32px] shadow-2xl border border-gray-100 p-10 text-center">

            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-5xl text-green-600">
                ✓
              </span>
            </div>

            <div className="text-green-600 font-semibold uppercase tracking-widest mb-3">
              Registration Successful
            </div>

            <h1 className="text-4xl font-black mb-6">
              Verify Your Email
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We've sent a verification email to your registered
              email address.
            </p>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-8">
              <p className="text-green-800 font-medium">
                Please check your inbox and click the verification
                link before logging in.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-bold mb-3">
                Didn't receive the email?
              </h3>

              <ul className="space-y-2 text-gray-600">
                <li>• Check your spam folder</li>
                <li>• Check your junk mail folder</li>
                <li>• Ensure your email address was entered correctly</li>
                <li>• Wait a few minutes for delivery</li>
              </ul>
            </div>

            <Link
              to="/"
              className="
                inline-block
                bg-green-600
                hover:bg-green-700
                text-white
                px-8
                py-4
                rounded-2xl
                text-lg
                font-bold
                shadow-lg
                transition-all
              "
            >
              Back to Login
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}