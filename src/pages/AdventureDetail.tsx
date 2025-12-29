import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  MapPin, Star, Clock, Users, Mountain, ArrowLeft,
  Calendar, AlertTriangle, Backpack, Route
} from "lucide-react";
import { adventures } from "./Adventures";

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-600",
  Moderate: "bg-amber-500/10 text-amber-600",
  Extreme: "bg-red-500/10 text-red-600",
};

export default function AdventureDetail() {
  const { id } = useParams();
  const adventure = adventures.find((a) => a.id === id);

  if (!adventure) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Adventure Not Found</h1>
          <p className="text-muted-foreground mb-8">The adventure you're looking for doesn't exist.</p>
          <Link to="/adventures">
            <Button variant="hero">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Adventures
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={adventure.image}
          alt={adventure.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container mx-auto px-4">
            <Link to="/adventures" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Adventures
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[adventure.difficulty]}`}>
                {adventure.difficulty}
              </span>
              <div className="flex items-center gap-1 text-white">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{adventure.rating}</span>
                <span className="text-white/70 text-sm">({adventure.reviews} reviews)</span>
              </div>
            </div>
            
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
              {adventure.title}
            </h1>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span>{adventure.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold text-foreground">{adventure.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Group Size</p>
                <p className="font-semibold text-foreground">{adventure.groupSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mountain className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Altitude</p>
                <p className="font-semibold text-foreground">{adventure.altitude}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Route className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="font-semibold text-foreground">{adventure.distance}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Best Time</p>
                <p className="font-semibold text-foreground">{adventure.bestTime}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                About This Adventure
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {adventure.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Highlights
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {adventure.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/5"
                  >
                    <Star className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-4">
                {adventure.itinerary.map((day, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0">
                      D{day.day}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{day.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Essentials Card */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Backpack className="w-5 h-5 text-primary" />
                What to Pack
              </h3>
              <ul className="space-y-2">
                {adventure.essentials.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Physical Requirements */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Physical Requirements
              </h3>
              <p className="text-muted-foreground text-sm">
                {adventure.physicalRequirement}
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Interested in this adventure?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Let our AI help you plan the perfect itinerary including this adventure.
              </p>
              <Link to="/ai-planner">
                <Button variant="hero" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Plan with AI
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
