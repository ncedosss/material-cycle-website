import { useState } from "react";

export default function QuoteSection() {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(
        "VITE_API_URL:",
        import.meta.env.VITE_API_URL
      );
      const response = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Consultation request submitted successfully.");

        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          service: "",
          location: "",
          message: ""
        });
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="py-28 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-green-600 font-semibold uppercase tracking-widest mb-4">
            Request a Consultation
          </div>

          <h2 className="text-5xl font-black mb-6">
            Let’s Build a Cleaner Future Together
          </h2>

          <p className="text-gray-600 text-lg">
            Tell us about your waste management requirements and we'll
            contact you shortly.
          </p>
        </div>

        <div className="bg-white rounded-[32px] shadow-xl border border-gray-100 p-10">
          <form
            className="grid md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Contact Number"
              className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 text-gray-600"
            >
              <option value="">
                Select Service
              </option>
              <option value="Waste Collection">
                Waste Collection
              </option>
              <option value="Waste Segregation">
                Waste Segregation
              </option>
              <option value="Recycling & Recovery">
                Recycling & Recovery
              </option>
              <option value="Waste Treatment">
                Waste Treatment
              </option>
              <option value="Certified Disposal">
                Certified Disposal
              </option>
              <option value="Environmental Compliance">
                Environmental Compliance
              </option>
            </select>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location / Site"
              className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />

            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your requirements..."
              className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 md:col-span-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-green-600 hover:bg-green-700 transition-all text-white py-4 rounded-2xl text-lg font-bold shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}

              {loading
                ? "Submitting Request..."
                : "Request Consultation"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}