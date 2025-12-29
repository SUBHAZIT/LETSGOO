import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { 
  Search, MapPin, Star, Clock, Sun, Thermometer, 
  Mountain, Waves, Building, TreePine, ArrowRight, Loader2
} from "lucide-react";

import heroImage from "@/assets/hero-mountains.jpg";
import tajmahal from "@/assets/destination-tajmahal.jpg";
import ladakh from "@/assets/destination-ladakh.jpg";
import kerala from "@/assets/destination-kerala.jpg";
import goa from "@/assets/destination-goa.jpg";

// Fallback images mapping
const fallbackImages: Record<string, string> = {
  rajasthan: tajmahal,
  kerala: kerala,
  ladakh: ladakh,
  goa: goa,
  varanasi: tajmahal,
  himachal: heroImage,
};

export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image_url: string | null;
  rating: number;
  reviews: number;
  category: string;
  best_time: string;
  temperature: string;
  ideal_duration: string;
  description: string;
  highlights: string[];
  attractions: { name: string; description: string }[];
  cuisine: string[];
  travel_tips: string[];
  is_published: boolean;
}

// Static fallback data for when database is empty
const staticDestinations: Destination[] = [
  {
    id: "static-1",
    slug: "rajasthan",
    name: "Rajasthan",
    tagline: "Land of Kings",
    image_url: null,
    rating: 4.8,
    reviews: 4523,
    category: "Heritage",
    best_time: "October - March",
    temperature: "15°C - 32°C",
    ideal_duration: "7-10 Days",
    description: "Rajasthan, the 'Land of Kings', is India's largest state and a kaleidoscope of vibrant culture, majestic forts, and golden deserts.",
    highlights: ["Amber Fort & Jaipur", "Udaipur Lake Palace", "Jaisalmer Desert Safari", "Jodhpur Blue City", "Pushkar Camel Fair"],
    attractions: [{ name: "Amber Fort", description: "A magnificent hilltop fort with stunning mirror work." }],
    cuisine: ["Dal Baati Churma", "Laal Maas", "Ghewar"],
    travel_tips: ["Book heritage hotels in advance", "Carry light cotton clothes"],
    is_published: true,
  },
  {
    id: "static-2",
    slug: "kerala",
    name: "Kerala",
    tagline: "God's Own Country",
    image_url: null,
    rating: 4.9,
    reviews: 5234,
    category: "Nature",
    best_time: "September - March",
    temperature: "22°C - 33°C",
    ideal_duration: "5-7 Days",
    description: "Kerala is a tropical paradise known for its palm-lined beaches, tranquil backwaters, and lush hill stations.",
    highlights: ["Alleppey Backwaters", "Munnar Tea Gardens", "Kovalam Beach"],
    attractions: [{ name: "Alleppey Backwaters", description: "A network of lagoons best explored on a houseboat." }],
    cuisine: ["Appam with Stew", "Kerala Fish Curry"],
    travel_tips: ["Book houseboats with Kerala Tourism"],
    is_published: true,
  },
  {
    id: "static-3",
    slug: "ladakh",
    name: "Ladakh",
    tagline: "Land of High Passes",
    image_url: null,
    rating: 4.9,
    reviews: 3876,
    category: "Adventure",
    best_time: "May - September",
    temperature: "-5°C - 25°C",
    ideal_duration: "7-10 Days",
    description: "Ladakh is a high-altitude cold desert known for its stark landscapes and ancient monasteries.",
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La Pass"],
    attractions: [{ name: "Pangong Tso Lake", description: "A stunning blue lake that changes colors." }],
    cuisine: ["Thukpa", "Momos", "Butter Tea"],
    travel_tips: ["Acclimatize for 2 days in Leh"],
    is_published: true,
  },
  {
    id: "static-4",
    slug: "goa",
    name: "Goa",
    tagline: "Beach Paradise",
    image_url: null,
    rating: 4.7,
    reviews: 8765,
    category: "Beach",
    best_time: "November - February",
    temperature: "25°C - 35°C",
    ideal_duration: "4-6 Days",
    description: "Goa is famous for its pristine beaches, Portuguese heritage, and vibrant nightlife.",
    highlights: ["Baga & Calangute Beaches", "Old Goa Churches", "Dudhsagar Falls"],
    attractions: [{ name: "Basilica of Bom Jesus", description: "A UNESCO World Heritage Site." }],
    cuisine: ["Fish Curry Rice", "Bebinca", "Vindaloo"],
    travel_tips: ["North Goa for nightlife, South for serenity"],
    is_published: true,
  },
];

const categories = ["All", "Heritage", "Nature", "Adventure", "Beach", "Spiritual", "Mountains"];

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching destinations:", error);
        setDestinations(staticDestinations);
      } else if (data && data.length > 0) {
        const typedData = data.map(d => ({
          ...d,
          attractions: (d.attractions as unknown) as { name: string; description: string }[],
        }));
        setDestinations(typedData);
      } else {
        setDestinations(staticDestinations);
      }
      setLoading(false);
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getImage = (dest: Destination) => {
    if (dest.image_url) return dest.image_url;
    return fallbackImages[dest.slug] || heroImage;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Heritage": return Building;
      case "Nature": return TreePine;
      case "Adventure": return Mountain;
      case "Beach": return Waves;
      case "Spiritual": return Sun;
      case "Mountains": return Mountain;
      default: return MapPin;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold">Explore India</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Discover Incredible <span className="text-gradient">Destinations</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From ancient temples to pristine beaches, explore the diverse beauty of India.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search destinations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-14 rounded-full text-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat);
              return (
                <Button key={cat} variant={selectedCategory === cat ? "hero" : "outline"} onClick={() => setSelectedCategory(cat)} className="rounded-full">
                  <Icon className="w-4 h-4 mr-2" />
                  {cat}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((destination) => (
                <Link key={destination.id} to={`/destinations/${destination.slug}`} className="group">
                  <article className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <img src={getImage(destination)} alt={destination.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">{destination.category}</span>
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{destination.rating}</span>
                        <span className="text-white/70 text-sm">({destination.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{destination.name}</h3>
                      <p className="text-accent font-medium text-sm mb-3">{destination.tagline}</p>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{destination.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Sun className="w-4 h-4 text-primary" /><span>{destination.best_time}</span></div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4 text-primary" /><span>{destination.ideal_duration}</span></div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground col-span-2"><Thermometer className="w-4 h-4 text-primary" /><span>{destination.temperature}</span></div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {destination.highlights.slice(0, 3).map((highlight) => (
                          <span key={highlight} className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">{highlight}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-primary font-medium group-hover:gap-3 transition-all">
                        <span>Explore {destination.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
          {!loading && filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
