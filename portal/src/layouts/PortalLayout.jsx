import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PortalLayout({
  title,
  subtitle,
  children
}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    };
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex">

      <aside className="w-72 bg-white border-r border-gray-100 shadow-sm flex flex-col">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-2xl font-black">
            Material Cycle
          </h1>

          <p className="text-sm text-gray-500">
            Client Portal
          </p>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <Link
            to="/dashboard"
            className="block w-full text-left hover:bg-gray-100 px-5 py-4 rounded-2xl transition-all"
          >
            Dashboard
          </Link>

          <Link
            to="/manifests"
            className="block w-full text-left hover:bg-gray-100 px-5 py-4 rounded-2xl transition-all"
          >
            Manifests
          </Link>
        </nav>
        <div className="p-6 border-t border-gray-100">
        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <div className="font-semibold">
            {user
                ? `${user.firstName} ${user.lastName}`
                : "Loading..."}
            </div>

            <div className="text-sm text-gray-500 break-all">
            {user?.email}
            </div>
        </div>

        <button
            onClick={logout}
            className="
            w-full
            bg-red-50
            hover:bg-red-100
            text-red-600
            py-3
            rounded-2xl
            font-semibold
            transition-all
            "
        >
            Logout
        </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">

        <div className="mb-10">
          <div className="text-green-600 font-semibold uppercase tracking-widest mb-2">
            Material Cycle
          </div>

          <h1 className="text-5xl font-black mb-3">
            {title}
          </h1>

          <p className="text-gray-600 text-lg">
            {subtitle}
          </p>
        </div>

        {children}

      </main>

    </div>
  );
}