import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  MapPin, Star, Clock, Sun, Thermometer, ArrowLeft,
  Utensils, Lightbulb, Camera, Mountain, Loader2
} from "lucide-react";
import type { Destination } from "./Destinations";

import heroImage from "@/assets/hero-mountains.jpg";
import tajmahal from "@/assets/destination-tajmahal.jpg";
import ladakh from "@/assets/destination-ladakh.jpg";
import kerala from "@/assets/destination-kerala.jpg";
import goa from "@/assets/destination-goa.jpg";

const fallbackImages: Record<string, string> = {
  rajasthan: tajmahal,
  kerala: kerala,
  ladakh: ladakh,
  goa: goa,
  varanasi: tajmahal,
  himachal: heroImage,
};

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      if (!slug) {
        setDestination(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error || !data) {
        console.error("Error fetching destination:", error);
        setDestination(null);
      } else {
        setDestination({
          ...data,
          attractions: (data.attractions as unknown) as { name: string; description: string }[],
        });
      }
      setLoading(false);
    };

    fetchDestination();
  }, [slug]);

  const getImage = (dest: Destination) => {
    if (dest.image_url) return dest.image_url;
    return fallbackImages[dest.slug] || heroImage;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground mb-8">The destination you're looking for doesn't exist.</p>
          <Link to="/destinations">
            <Button variant="hero">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Destinations
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
          src={getImage(destination)}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container mx-auto px-4">
            <Link to="/destinations" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Destinations
            </Link>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm font-medium">
                {destination.category}
              </span>
              <div className="flex items-center gap-1 text-white">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{destination.rating}</span>
                <span className="text-white/70 text-sm">({destination.reviews.toLocaleString()} reviews)</span>
              </div>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <p className="text-xl text-accent font-medium">{destination.tagline}</p>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Best Time</p>
                <p className="font-semibold text-foreground">{destination.best_time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Ideal Duration</p>
                <p className="font-semibold text-foreground">{destination.ideal_duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="font-semibold text-foreground">{destination.temperature}</p>
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
                About {destination.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {destination.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                Top Highlights
              </h2>
              <div className="flex flex-wrap gap-3">
                {destination.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </section>

            {/* Attractions */}
            {destination.attractions.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Mountain className="w-6 h-6 text-primary" />
                  Must-Visit Attractions
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.attractions.map((attraction) => (
                    <div
                      key={attraction.name}
                      className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                    >
                      <h3 className="font-semibold text-foreground mb-2">{attraction.name}</h3>
                      <p className="text-muted-foreground text-sm">{attraction.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Local Cuisine */}
            {destination.cuisine.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-primary" />
                  Local Cuisine to Try
                </h2>
                <div className="flex flex-wrap gap-3">
                  {destination.cuisine.map((dish) => (
                    <span
                      key={dish}
                      className="px-4 py-2 rounded-full bg-accent/10 text-accent font-medium"
                    >
                      {dish}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Travel Tips Card */}
            {destination.travel_tips.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
                <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Travel Tips
                </h3>
                <ul className="space-y-3">
                  {destination.travel_tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-muted-foreground text-sm">{tip}</p>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border">
                  <Link to="/ai-planner">
                    <Button variant="hero" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      Plan Your Trip with AI
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
