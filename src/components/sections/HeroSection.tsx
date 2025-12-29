import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plane, Bus, Hotel, MapPin, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-backpacker.jpg";
import itineraryKerala from "@/assets/itinerary-kerala.jpg";

export function HeroSection() {
  const [currentSlide] = useState(4);
  const totalSlides = 7;

  const quickLinks = [
    { icon: Plane, label: "VISA INFO", href: "/visa" },
    { icon: Bus, label: "TRANSPORT", href: "/transport" },
  ];

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Backpackers trekking in the Himalayas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-24 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left Content */}
          <div className="text-primary-foreground">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
              Find your pace
              <br />
              in India.
            </h1>
            <Link 
              to="/destinations" 
              className="inline-flex items-center gap-2 text-lg font-medium hover:gap-4 transition-all duration-300 group"
            >
              EXPLORE INDIA 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Cards Panel */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              {/* Slide Counter */}
              <div className="bg-foreground/30 backdrop-blur-sm rounded-2xl p-6 flex items-center">
                <span className="text-primary-foreground text-xl font-bold">
                  {currentSlide} / <span className="text-primary-foreground/50">{totalSlides}</span>
                </span>
              </div>

              {/* Featured Image */}
              <div className="rounded-2xl overflow-hidden h-32">
                <img 
                  src={itineraryKerala} 
                  alt="Kerala backwaters"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Links Row */}
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 hover:bg-card transition-colors group"
                >
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium text-sm text-card-foreground">{link.label}</span>
                </Link>
              ))}

              {/* Hotels Card */}
              <Link 
                to="/hotels"
                className="relative rounded-2xl overflow-hidden h-28 group"
              >
                <img 
                  src={itineraryKerala} 
                  alt="Hotels"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/40" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-primary-foreground">
                  <Hotel className="w-4 h-4" />
                  <span className="font-semibold">HOTELS</span>
                </div>
              </Link>

              {/* Map Card */}
              <Link 
                to="/map"
                className="bg-sand rounded-2xl p-4 flex flex-col justify-between h-28"
              >
                <MapPin className="w-5 h-5 text-sand-foreground" />
                <span className="font-semibold text-sand-foreground">MAP</span>
              </Link>

              {/* Build Itinerary CTA */}
              <Link 
                to="/ai-planner"
                className="col-span-2 bg-card/95 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-center gap-3 hover:bg-card transition-colors group"
              >
                <Calendar className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium text-card-foreground">BUILD YOUR ITINERARY</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}