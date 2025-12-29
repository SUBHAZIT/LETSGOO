import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import tajmahalImg from "@/assets/destination-tajmahal.jpg";

interface Destination {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  image_url: string | null;
  rating: number;
  category: string;
}

const fallbackImage = tajmahalImg;

export function DestinationsSection() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("id, name, slug, tagline, image_url, rating, category")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching destinations:", error);
      } else {
        setDestinations(data || []);
      }
      setLoading(false);
    };

    fetchDestinations();
  }, []);

  // Don't render section if no destinations
  if (!loading && destinations.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Popular Destinations
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
              Explore India's Finest
            </h2>
          </div>
          <Link to="/destinations">
            <Button variant="outline" className="w-fit">
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Destinations Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-elevated transition-all duration-500 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image_url || fallbackImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                  
                  {/* Tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-semibold">
                    {dest.category}
                  </span>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-card/80 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-xs font-semibold text-foreground">{dest.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {dest.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Explore
                    </p>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}