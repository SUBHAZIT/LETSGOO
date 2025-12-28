import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { DestinationsSection } from "@/components/sections/DestinationsSection";
import { AITripPlannerSection } from "@/components/sections/AITripPlannerSection";
import { CurrencyConverterSection } from "@/components/sections/CurrencyConverterSection";
import { AdventuresSection } from "@/components/sections/AdventuresSection";
import { TripPlannerFeatures } from "@/components/sections/TripPlannerFeatures";
import { BlogSection } from "@/components/sections/BlogSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DestinationsSection />
      <AITripPlannerSection />
      <AdventuresSection />
      <CurrencyConverterSection />
      <TripPlannerFeatures />
      <BlogSection />
      <Footer />
    </main>
  );
};

export default Index;
