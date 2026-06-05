import { useState } from "react";
import logo from "../assets/favicon.ico";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
<div className="flex items-center">
  <a
    href="#home"
    className="flex items-center"
  >
    <img
      src={logo}
      alt="Material Cycle"
      className="h-12 md:h-16 w-auto"
    />
  </a>
</div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#home" className="hover:text-green-600 transition-colors">
            Home
          </a>

          <a href="#services" className="hover:text-green-600 transition-colors">
            Services
          </a>

          <a href="#about" className="hover:text-green-600 transition-colors">
            About
          </a>

          <a href="#sustainability" className="hover:text-green-600 transition-colors">
            Sustainability
          </a>

          <a href="#contact" className="hover:text-green-600 transition-colors">
            Contact
          </a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
        <a
          href={`${API_URL}/portal`}
          className="
            border border-green-600
            text-green-700
            hover:bg-green-50
            transition-all
            px-5 py-2
            rounded-xl
            font-medium
          "
        >
          Client Portal
        </a>

          <a
            href="#quote"
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-5 py-2
              rounded-xl
              font-medium
              transition-all
            "
          >
            Request Consultation
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col p-6 space-y-4">

            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              Home
            </a>

            <a
              href="#services"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              Services
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              About
            </a>

            <a
              href="#sustainability"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              Sustainability
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="font-medium"
            >
              Contact
            </a>

            <button
              className="
                w-full
                border border-green-600
                text-green-700
                py-3
                rounded-xl
                font-medium
                opacity-60
                cursor-not-allowed
              "
            >
              Client Portal
            </button>

            <a
              href="#quote"
              onClick={() => setMenuOpen(false)}
              className="
                w-full
                text-center
                bg-green-600
                hover:bg-green-700
                text-white
                py-3
                rounded-xl
                font-medium
              "
            >
              Request Consultation
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}