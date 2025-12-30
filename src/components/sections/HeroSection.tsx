import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Plane, Bus, Hotel, MapPin, Calendar, Volume2, VolumeX } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import itineraryKerala from "@/assets/itinerary-kerala.jpg";
export function HeroSection() {
  const [currentSlide] = useState(4);
  const totalSlides = 7;
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const quickLinks = [{
    icon: Plane,
    label: "VISA INFO",
    href: "/visa"
  }, {
    icon: Bus,
    label: "TRANSPORT",
    href: "/transport"
  }];
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  return <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      {/* Mute Button */}
      <button onClick={toggleMute} className="absolute bottom-8 right-8 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors" aria-label={isMuted ? "Unmute video" : "Mute video"}>
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-24 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left Content */}
          <motion.div initial={{
          opacity: 0,
          y: 50
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          ease: "easeOut"
        }} className="text-primary-foreground">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Find your peace
              <br />
              in India.
            </h1>
            <Link to="/destinations" className="inline-flex items-center gap-2 text-lg font-medium hover:gap-4 transition-all duration-300 group">
              EXPLORE INDIA 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Cards Panel */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeOut"
        }} className="hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              {/* Slide Counter */}
              

              {/* Featured Image */}
              <div className="rounded-2xl overflow-hidden h-32">
                <img src={itineraryKerala} alt="Kerala backwaters" className="w-full h-full object-cover" />
              </div>

              {/* Quick Links Row */}
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.href} className="rounded-xl bg-background/10 backdrop-blur-sm p-3 flex items-center gap-2 hover:bg-background/20 transition-colors">
                  <link.icon className="w-4 h-4 text-primary-foreground" />
                  <span className="text-sm text-primary-foreground">{link.label}</span>
                </Link>
              ))}

              {/* Hotels Card */}
              

              {/* Map Card */}
              

              {/* Build Itinerary CTA */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.9
            }} className="col-span-2">
                <Link to="/ai-planner" className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-card transition-colors group w-full">
                  <Calendar className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium text-card-foreground">BUILD YOUR ITINERARY</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 1,
      delay: 1.2
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </motion.div>
    </section>;
}