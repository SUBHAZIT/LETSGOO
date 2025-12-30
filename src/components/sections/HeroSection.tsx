import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import itineraryKerala from "@/assets/itinerary-kerala.jpg";
import itineraryLadakh from "@/assets/itinerary-ladakh.jpg";

const destinations = ["Kerala", "Ladakh", "Rajasthan", "Goa", "Himachal"];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-24 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Find your peace
              <br />
              in{" "}
              <span className="relative inline-block min-w-[200px] md:min-w-[280px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-primary"
                  >
                    {destinations[currentIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 text-lg font-medium hover:gap-4 transition-all duration-300 group"
            >
              EXPLORE INDIA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Cards Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Aesthetic Image Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-2xl overflow-hidden h-32 shadow-lg"
              >
                <img
                  src={itineraryKerala}
                  alt="Kerala backwaters"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="rounded-2xl overflow-hidden h-32 shadow-lg"
              >
                <img
                  src={itineraryLadakh}
                  alt="Ladakh mountains"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>


              {/* Build Itinerary CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="col-span-2"
              >
                <Link
                  to="/ai-planner"
                  className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-card transition-colors group w-full"
                >
                  <Calendar className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium text-card-foreground">BUILD YOUR ITINERARY</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
