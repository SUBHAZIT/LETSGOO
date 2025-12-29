import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
  const { ref, isVisible } = useScrollAnimation();

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
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
      <div ref={ref} className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-primary-foreground"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Did you know?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              India is full of surprises, quirky facts, hidden gems, and stories you might not expect. 
              Flick through the cards to discover something new.
            </p>
          </motion.div>

          {/* Fact Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-3xl p-8 shadow-elevated max-w-md"
              >
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
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrow */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={nextFact}
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full bg-card border-0 shadow-elevated hover:bg-card"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-2 mt-12"
        >
          {facts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFact(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentFact 
                  ? "bg-primary-foreground w-6" 
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Go to fact ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}