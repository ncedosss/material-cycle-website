export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="#home" className="cursor-pointer">
            <h1 className="font-bold text-xl">Material Cycle</h1>
            <p className="text-xs text-gray-500">Smart Waste Management</p>
          </a>
        </div>

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

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="border border-green-600 text-green-700 hover:bg-green-50 transition-all px-5 py-2 rounded-xl font-medium"
          >
            Client Portal(Coming soon)
          </a>

          <a
            href="#quote"
            className="bg-green-600 hover:bg-green-700 transition-all text-white px-5 py-2 rounded-xl shadow-lg"
          >
            Request Consultation
          </a>
        </div>
      </div>
    </header>
  );
}