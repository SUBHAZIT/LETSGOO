import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Loader2, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-mountains.jpg";

interface Adventure {
  id: string;
  title: string;
  slug: string;
  location: string;
  duration: string;
  difficulty: string;
  image_url: string | null;
  rating: number;
  category: string;
}

const fallbackImage = heroImage;

export function AdventuresSection() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdventures = async () => {
      const { data, error } = await supabase
        .from("adventures")
        .select("id, title, slug, location, duration, difficulty, image_url, rating, category")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching adventures:", error);
      } else {
        setAdventures(data || []);
      }
      setLoading(false);
    };

    fetchAdventures();
  }, []);

  // Don't render section if no adventures
  if (!loading && adventures.length === 0) {
    return null;
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-600";
      case "moderate":
        return "bg-amber-500/10 text-amber-600";
      case "challenging":
        return "bg-red-500/10 text-red-600";
      default:
        return "bg-blue-500/10 text-blue-600";
    }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Find Your Thrill
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Adventure Awaits
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From mountain peaks to ocean depths, discover adventures 
            that match your spirit of exploration.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Adventures Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adventures.map((adventure, index) => (
              <Link
                key={adventure.id}
                to={`/adventures/${adventure.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 shadow-soft hover:shadow-elevated hover:border-primary/30 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={adventure.image_url || fallbackImage}
                    alt={adventure.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  
                  {/* Difficulty Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(adventure.difficulty)}`}>
                    {adventure.difficulty}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-card/80 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-xs font-semibold text-foreground">{adventure.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <span className="text-xs font-medium text-primary mb-2 block">
                    {adventure.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {adventure.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {adventure.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {adventure.duration}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm font-medium text-foreground">
                      View Details
                    </span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        {adventures.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/adventures">
              <Button variant="hero" size="lg">
                Explore All Adventures
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}