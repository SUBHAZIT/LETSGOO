import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-mountains.jpg";

export function HeroSection() {
  const [destination, setDestination] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Majestic Himalayan mountains at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-[15%] w-20 h-20 rounded-full bg-accent/20 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-[10%] w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-primary-foreground font-medium">
              AI-Powered Trip Planning
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-slide-up">
            Discover India's
            <br />
            <span className="text-gradient bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent">
              Hidden Treasures
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            From the snow-capped Himalayas to tropical beaches. Plan your perfect 
            adventure with AI, explore treks, and create unforgettable memories.
          </p>

          {/* Search Box */}
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-2 shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {/* Destination */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
                <MapPin className="w-5 h-5 text-accent" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium">Where to?</p>
                  <input
                    type="text"
                    placeholder="Search destinations"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none text-sm"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
                <Calendar className="w-5 h-5 text-accent" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium">When?</p>
                  <p className="text-sm text-foreground">Select dates</p>
                </div>
              </div>

              {/* Travelers */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
                <Users className="w-5 h-5 text-accent" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium">Who?</p>
                  <p className="text-sm text-foreground">Add travelers</p>
                </div>
              </div>

              {/* Search Button */}
              <Button variant="hero" size="lg" className="h-full min-h-[56px]">
                <Search className="w-5 h-5" />
                Explore
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-8 mt-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "500+", label: "Destinations" },
              { value: "50K+", label: "Happy Travelers" },
              { value: "100+", label: "Trek Routes" },
            ].map((stat) => (
              <div key={stat.label} className="text-primary-foreground">
                <p className="text-2xl md:text-3xl font-display font-bold">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
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
