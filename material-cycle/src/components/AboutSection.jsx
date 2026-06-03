export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop"
            alt="Team"
            className="rounded-3xl shadow-2xl"
          />
        </div>

        <div>
          <div className="text-green-600 font-semibold uppercase tracking-widest mb-4">
            About Us
          </div>

          <h2 className="text-5xl font-black mb-8 leading-tight">
            Modern Waste Management Backed by Innovation
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Material Cycle is a South African waste management company committed to
            responsible waste handling through innovative recycling, treatment,
            diversion, and disposal solutions. Our operations are designed around
            environmental compliance, safety, and sustainability.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We manage the complete waste lifecycle—from collection and waste
            assessment to segregation, treatment, recycling, recovery, and final
            disposal at approved facilities. Every waste stream is tracked through
            documented processes, ensuring transparency and full traceability.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed">
            Through our circular economy approach, we help organisations reduce
            landfill dependency, maximise resource recovery, and achieve their
            environmental sustainability goals.
          </p>
        </div>
      </div>
    </section>
  )
}