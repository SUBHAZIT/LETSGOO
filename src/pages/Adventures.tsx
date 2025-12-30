import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  Mountain, Waves, Bike, Camera, Tent, TreePine, 
  Wind, Compass, Star, Clock, Users, MapPin, Flame, ArrowRight, Loader2
} from "lucide-react";

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

const adventureCategories = [
  { id: "all", name: "All Adventures", icon: Compass },
  { id: "trekking", name: "Trekking", icon: Mountain },
  { id: "water", name: "Water Sports", icon: Waves },
  { id: "wildlife", name: "Wildlife", icon: TreePine },
  { id: "camping", name: "Camping", icon: Tent },
  { id: "cycling", name: "Cycling", icon: Bike },
  { id: "paragliding", name: "Paragliding", icon: Wind },
];

export interface Adventure {
  id: string;
  slug: string;
  title: string;
  location: string;
  image_url: string | null;
  category: string;
  difficulty: string;
  duration: string;
  group_size: string;
  altitude: string | null;
  distance: string | null;
  rating: number;
  reviews: number;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  essentials: string[];
  best_time: string;
  physical_requirement: string | null;
  is_published: boolean;
}

// Static fallback data
const staticAdventures: Adventure[] = [
  {
    id: "static-1",
    slug: "chadar-trek",
    title: "Chadar Trek - Frozen River",
    location: "Ladakh, Jammu & Kashmir",
    image_url: null,
    category: "trekking",
    difficulty: "Extreme",
    duration: "9 Days",
    group_size: "8-12 people",
    altitude: "3,850m - 3,950m",
    distance: "62 km",
    rating: 4.9,
    reviews: 234,
    description: "Walk on the frozen Zanskar River in sub-zero temperatures. One of the most challenging and rewarding treks in the world.",
    highlights: ["Walk on frozen Zanskar River", "Camp in caves and tents", "Witness stunning ice formations"],
    itinerary: [{ day: 1, title: "Arrival in Leh", description: "Arrive and acclimatize." }],
    essentials: ["High-altitude trekking boots", "Down jacket"],
    best_time: "January - February",
    physical_requirement: "Excellent fitness required.",
    is_published: true,
  },
  {
    id: "static-2",
    slug: "bir-billing",
    title: "Bir Billing Paragliding",
    location: "Himachal Pradesh",
    image_url: null,
    category: "paragliding",
    difficulty: "Easy",
    duration: "1 Day",
    group_size: "Individual",
    altitude: "2,400m takeoff",
    distance: "8-12 km flight",
    rating: 4.9,
    reviews: 2341,
    description: "Soar over the Himalayas from Asia's highest paragliding site.",
    highlights: ["Asia's highest paragliding site", "20-30 minute flight", "Stunning Himalayan views"],
    itinerary: [{ day: 1, title: "Paragliding Experience", description: "Morning briefing and tandem flight." }],
    essentials: ["Comfortable clothing", "Sports shoes"],
    best_time: "March - June, September - November",
    physical_requirement: "No special fitness required.",
    is_published: true,
  },
  {
    id: "static-3",
    slug: "kerala-kayaking",
    title: "Kerala Backwater Kayaking",
    location: "Kerala",
    image_url: null,
    category: "water",
    difficulty: "Easy",
    duration: "2 Days",
    group_size: "6-10 people",
    altitude: "Sea Level",
    distance: "25-30 km paddling",
    rating: 4.6,
    reviews: 423,
    description: "Paddle through serene backwaters, mangroves, and local villages of Kerala.",
    highlights: ["Paddle through mangroves", "Visit local villages", "Traditional Kerala cuisine"],
    itinerary: [{ day: 1, title: "Kayaking Introduction", description: "Basics and first paddle." }],
    essentials: ["Quick-dry clothing", "Waterproof bag"],
    best_time: "September - March",
    physical_requirement: "Basic fitness.",
    is_published: true,
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-600 border-green-500/30",
  Moderate: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Extreme: "bg-red-500/10 text-red-600 border-red-500/30",
};

export default function Adventures() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdventures = async () => {
      const { data, error } = await supabase
        .from("adventures")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching adventures:", error);
        setAdventures([]);
      } else {
        const typedData = (data || []).map(a => ({
          ...a,
          itinerary: (a.itinerary as unknown) as { day: number; title: string; description: string }[],
        }));
        setAdventures(typedData);
      }
      setLoading(false);
    };

    fetchAdventures();
  }, []);

  const filteredAdventures = adventures.filter(
    (adv) => selectedCategory === "all" || adv.category === selectedCategory
  );

  const getImage = (adv: Adventure) => {
    if (adv.image_url) return adv.image_url;
    return fallbackImages[adv.slug] || heroImage;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6">
              <Flame className="w-4 h-4" />
              <span className="text-sm font-semibold">Push Your Limits</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Epic <span className="text-gradient">Adventures</span> Await
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From frozen river treks to paragliding over mountains, discover adventures that will test your limits and create lifelong memories.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {adventureCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "hero" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="rounded-full"
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Adventures Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredAdventures.map((adventure) => (
                <Link 
                  key={adventure.id} 
                  to={`/adventures/${adventure.slug}`}
                  className="group"
                >
                  <article className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 flex flex-col md:flex-row h-full">
                    {/* Image */}
                    <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                      <img
                        src={getImage(adventure)}
                        alt={adventure.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t" />
                      
                      {/* Difficulty Badge */}
                      <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold border ${difficultyColors[adventure.difficulty] || difficultyColors.Moderate}`}>
                        {adventure.difficulty}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {adventure.title}
                          </h3>
                          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                            <MapPin className="w-4 h-4" />
                            {adventure.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-sm">{adventure.rating}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {adventure.description}
                      </p>

                      {/* Meta Grid */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 rounded-lg bg-secondary/50">
                          <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="text-sm font-semibold">{adventure.duration}</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-secondary/50">
                          <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                          <p className="text-xs text-muted-foreground">Group</p>
                          <p className="text-sm font-semibold">{adventure.group_size.split(" ")[0]}</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-secondary/50">
                          <Mountain className="w-4 h-4 mx-auto mb-1 text-primary" />
                          <p className="text-xs text-muted-foreground">Altitude</p>
                          <p className="text-sm font-semibold">{adventure.altitude?.split(" ")[0] || "N/A"}</p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {adventure.highlights.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* View More */}
                      <div className="mt-auto flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all pt-4 border-t border-border">
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredAdventures.length === 0 && (
            <div className="text-center py-16">
              <Compass className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No adventures found</h3>
              <p className="text-muted-foreground">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
