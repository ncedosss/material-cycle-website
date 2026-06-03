import { useEffect, useState } from "react";
export default function HeroSection() {
  const heroImages = [
    "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop"
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-200 px-4 py-2 rounded-full border border-green-400/20 mb-6 backdrop-blur-sm">
            ♻ Waste Diversion • Recycling • Treatment • Certified Disposal
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Responsible Waste Management
            <span className="text-green-400 block">
              Built Around Compliance & Sustainability
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
            Material Cycle provides end-to-end waste management solutions including
            waste collection, segregation, recycling, treatment, diversion, and
            certified disposal. We help businesses reduce environmental impact while
            ensuring full regulatory compliance and traceability.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#quote"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl transition-all hover:scale-105"
            >
              Request a Consultation
            </a>

            <a
              href="#about"
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}