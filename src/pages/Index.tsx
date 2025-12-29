import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ThingsToDoSection } from "@/components/sections/ThingsToDoSection";
import { GetInspiredSection } from "@/components/sections/GetInspiredSection";
import { DidYouKnowSection } from "@/components/sections/DidYouKnowSection";
import { PlanYourTimeSection } from "@/components/sections/PlanYourTimeSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ThingsToDoSection />
      <GetInspiredSection />
      <DidYouKnowSection />
      <PlanYourTimeSection />
      <Footer />
    </main>
  );
};

export default Index;