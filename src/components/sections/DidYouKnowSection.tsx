import { useState } from "react";
import { Globe, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import didYouKnowBg from "@/assets/did-you-know-bg.jpg";

const facts = [
  {
    icon: Globe,
    title: "World's Largest Democracy",
    description: "Did you know India is home to the world's largest democracy with over 1.4 billion people?",
    cta: "LEARN MORE",
    href: "/blog/india-facts",
  },
  {
    icon: Globe,
    title: "Incredible Biodiversity",
    description: "Did you know India has 4 of the world's 36 biodiversity hotspots?",
    cta: "LEARN MORE",
    href: "/blog/biodiversity",
  },
  {
    icon: Globe,
    title: "Ancient Heritage",
    description: "Did you know India has 42 UNESCO World Heritage Sites spanning thousands of years?",
    cta: "LEARN MORE",
    href: "/blog/heritage-sites",
  },
];

export function DidYouKnowSection() {
  const [currentFact, setCurrentFact] = useState(0);

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFact((prev) => (prev - 1 + facts.length) % facts.length);
  };

  const fact = facts[currentFact];

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={didYouKnowBg}
          alt="Beautiful Indian rangoli art"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="text-primary-foreground">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Did you know?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              India is full of surprises, quirky facts, hidden gems, and stories you might not expect. 
              Flick through the cards to discover something new.
            </p>
          </div>

          {/* Fact Card */}
          <div className="flex items-center gap-4">
            <div className="bg-card rounded-3xl p-8 shadow-elevated max-w-md">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-6">
                <fact.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-card-foreground mb-4">
                {fact.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {fact.description}
              </p>
              <a
                href={fact.href}
                className="inline-flex items-center gap-2 text-foreground font-medium hover:gap-3 transition-all duration-300"
              >
                {fact.cta}
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Navigation Arrow */}
            <Button
              onClick={nextFact}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full bg-card border-0 shadow-elevated hover:bg-card"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-12">
          {facts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFact(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentFact ? "bg-primary-foreground" : "bg-primary-foreground/40"
              }`}
              aria-label={`Go to fact ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}