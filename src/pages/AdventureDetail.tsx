import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  MapPin, Star, Clock, Users, Mountain, ArrowLeft,
  Calendar, AlertTriangle, Backpack, Route, Loader2
} from "lucide-react";
import type { Adventure } from "./Adventures";

import heroImage from "@/assets/hero-mountains.jpg";
import ladakh from "@/assets/destination-ladakh.jpg";
import kerala from "@/assets/destination-kerala.jpg";
import goa from "@/assets/destination-goa.jpg";

const fallbackImages: Record<string, string> = {
  "chadar-trek": ladakh,
  "scuba-andaman": goa,
  "valley-flowers": heroImage,
  "bir-billing": ladakh,
  "kerala-kayaking": kerala,
  "corbett-safari": heroImage,
  "spiti-cycling": ladakh,
  "ladakh-camping": ladakh,
};

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-600",
  Moderate: "bg-amber-500/10 text-amber-600",
  Extreme: "bg-red-500/10 text-red-600",
};

export default function AdventureDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdventure = async () => {
      if (!slug) {
        setAdventure(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("adventures")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error || !data) {
        console.error("Error fetching adventure:", error);
        setAdventure(null);
      } else {
        setAdventure({
          ...data,
          itinerary: (data.itinerary as unknown) as { day: number; title: string; description: string }[],
        });
      }
      setLoading(false);
    };

    fetchAdventure();
  }, [slug]);

  const getImage = (adv: Adventure) => {
    if (adv.image_url) return adv.image_url;
    return fallbackImages[adv.slug] || heroImage;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
          src={getImage(adventure)}
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
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[adventure.difficulty] || difficultyColors.Moderate}`}>
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
                <p className="font-semibold text-foreground">{adventure.group_size}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mountain className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Altitude</p>
                <p className="font-semibold text-foreground">{adventure.altitude || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Route className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Distance</p>
                <p className="font-semibold text-foreground">{adventure.distance || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Best Time</p>
                <p className="font-semibold text-foreground">{adventure.best_time}</p>
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
            {adventure.highlights.length > 0 && (
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
            )}

            {/* Itinerary */}
            {adventure.itinerary.length > 0 && (
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
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Essentials Card */}
            {adventure.essentials.length > 0 && (
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
            )}

            {/* Physical Requirements */}
            {adventure.physical_requirement && (
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  Physical Requirements
                </h3>
                <p className="text-muted-foreground text-sm">
                  {adventure.physical_requirement}
                </p>
              </div>
            )}

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
