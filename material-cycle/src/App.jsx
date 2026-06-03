import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import ServicesSection from './components/ServicesSection'
import SustainabilitySection from './components/SustainabilitySection'
import AboutSection from './components/AboutSection'
import QuoteSection from './components/QuoteSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <SustainabilitySection />
      <AboutSection />
      <QuoteSection />
      <Footer />
    </div>
  )
}