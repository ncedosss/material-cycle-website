export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="relative py-32 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1600&auto=format&fit=crop"
        alt="Sustainability"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-green-900/80"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
      <h2 className="text-5xl md:text-6xl font-black leading-tight mb-8">
        Diverting Waste From Landfill Through
        Recycling, Recovery & Responsible Disposal
      </h2>

        <a
          href="#services"
          className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl transition-all hover:scale-105 inline-block"
        >
          Explore Our Sustainability Impact
        </a>
      </div>
    </section>
  )
}