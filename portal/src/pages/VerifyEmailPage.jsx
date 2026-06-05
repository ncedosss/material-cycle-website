import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function VerifyEmailPage() {
  const { token } = useParams();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [verified, setVerified] =
    useState(false);

  useEffect(() => {
    const verify = async () => {
      const response =
        await fetch(
          `${API_URL}/api/auth/verify-email/${token}`
        );

      if (response.ok) {
        setVerified(true);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-[32px] shadow-xl p-10 max-w-md text-center">

        {verified ? (
          <>
            <h1 className="text-4xl font-black text-green-600 mb-4">
              Email Verified
            </h1>

            <p className="text-gray-500 mb-8">
              Your account has been successfully verified.
            </p>

            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl inline-block font-bold"
            >
              Proceed to Login
            </Link>
          </>
        ) : (
          <h1 className="text-3xl font-bold">
            Verifying...
          </h1>
        )}

      </div>
    </div>
  );
}