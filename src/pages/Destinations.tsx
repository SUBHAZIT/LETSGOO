import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Clock, Users, Search, Filter, Heart } from "lucide-react";

import heroImage from "@/assets/hero-mountains.jpg";
import tajmahal from "@/assets/destination-tajmahal.jpg";
import kerala from "@/assets/destination-kerala.jpg";
import ladakh from "@/assets/destination-ladakh.jpg";
import goa from "@/assets/destination-goa.jpg";

const destinations = [
  {
    id: 1,
    name: "Taj Mahal, Agra",
    image: tajmahal,
    rating: 4.9,
    reviews: 12500,
    price: "₹2,500",
    duration: "1-2 days",
    category: "Heritage",
    description: "Marvel at the iconic symbol of eternal love, a UNESCO World Heritage Site and one of the New Seven Wonders of the World.",
    highlights: ["Sunrise View", "Mughal Architecture", "Garden Walk"],
  },
  {
    id: 2,
    name: "Backwaters of Kerala",
    image: kerala,
    rating: 4.8,
    reviews: 8900,
    price: "₹15,000",
    duration: "3-5 days",
    category: "Nature",
    description: "Cruise through serene backwaters on traditional houseboats, experiencing the lush greenery and local culture.",
    highlights: ["Houseboat Stay", "Ayurveda Spa", "Local Cuisine"],
  },
  {
    id: 3,
    name: "Ladakh",
    image: ladakh,
    rating: 4.9,
    reviews: 7200,
    price: "₹35,000",
    duration: "7-10 days",
    category: "Adventure",
    description: "Experience the breathtaking landscapes of the Himalayas, ancient monasteries, and thrilling mountain passes.",
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La Pass"],
  },
  {
    id: 4,
    name: "Goa Beaches",
    image: goa,
    rating: 4.7,
    reviews: 15600,
    price: "₹12,000",
    duration: "4-6 days",
    category: "Beach",
    description: "Relax on pristine beaches, explore Portuguese heritage, and enjoy vibrant nightlife in India's party capital.",
    highlights: ["Beach Parties", "Water Sports", "Portuguese Churches"],
  },
  {
    id: 5,
    name: "Rajasthan Heritage",
    image: heroImage,
    rating: 4.8,
    reviews: 9400,
    price: "₹25,000",
    duration: "5-7 days",
    category: "Heritage",
    description: "Explore majestic forts, vibrant markets, and experience royal Rajasthani hospitality across Jaipur, Udaipur, and Jodhpur.",
    highlights: ["Palace Stay", "Desert Safari", "Cultural Shows"],
  },
  {
    id: 6,
    name: "Andaman Islands",
    image: kerala,
    rating: 4.8,
    reviews: 5600,
    price: "₹45,000",
    duration: "5-7 days",
    category: "Beach",
    description: "Discover pristine beaches, crystal-clear waters, and world-class diving spots in this tropical paradise.",
    highlights: ["Scuba Diving", "Island Hopping", "Water Sports"],
  },
];

const categories = ["All", "Heritage", "Nature", "Adventure", "Beach", "Spiritual"];

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Explore <span className="text-gradient">Incredible India</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From snow-capped Himalayas to tropical beaches, discover destinations that will leave you breathless.
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg rounded-xl"
                />
              </div>
              <Button variant="hero" size="lg" className="h-14 px-8">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "hero" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <article
                key={dest.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium">
                    {dest.category}
                  </span>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(dest.id)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      favorites.includes(dest.id)
                        ? "bg-accent text-accent-foreground"
                        : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/40"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(dest.id) ? "fill-current" : ""}`} />
                  </button>
                  
                  {/* Price */}
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-bold text-xl">{dest.price}</p>
                    <p className="text-white/80 text-sm">per person</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{dest.rating}</span>
                      <span className="text-muted-foreground">({dest.reviews.toLocaleString()})</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {dest.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dest.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {dest.duration}
                    </div>
                    <Button variant="hero" size="sm">
                      Explore
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No destinations found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
