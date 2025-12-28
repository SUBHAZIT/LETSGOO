import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Mountain, Waves, Bike, Camera, Tent, TreePine, 
  Wind, Compass, Star, Clock, Users, MapPin, Flame
} from "lucide-react";

import heroImage from "@/assets/hero-mountains.jpg";
import ladakh from "@/assets/destination-ladakh.jpg";
import kerala from "@/assets/destination-kerala.jpg";
import goa from "@/assets/destination-goa.jpg";

const adventureCategories = [
  { id: "all", name: "All Adventures", icon: Compass },
  { id: "trekking", name: "Trekking", icon: Mountain },
  { id: "water", name: "Water Sports", icon: Waves },
  { id: "wildlife", name: "Wildlife", icon: TreePine },
  { id: "camping", name: "Camping", icon: Tent },
  { id: "cycling", name: "Cycling", icon: Bike },
  { id: "paragliding", name: "Paragliding", icon: Wind },
];

const adventures = [
  {
    id: 1,
    title: "Chadar Trek - Frozen River",
    location: "Ladakh",
    image: ladakh,
    category: "trekking",
    difficulty: "Extreme",
    duration: "9 Days",
    groupSize: "8-12",
    price: "₹48,000",
    rating: 4.9,
    reviews: 234,
    description: "Walk on the frozen Zanskar River in sub-zero temperatures. One of the most challenging and rewarding treks in the world.",
    includes: ["Guide", "Meals", "Camping Gear", "Permits"],
    bestTime: "Jan - Feb",
  },
  {
    id: 2,
    title: "Scuba Diving in Andaman",
    location: "Andaman Islands",
    image: goa,
    category: "water",
    difficulty: "Moderate",
    duration: "3 Days",
    groupSize: "4-6",
    price: "₹25,000",
    rating: 4.8,
    reviews: 567,
    description: "Explore vibrant coral reefs and marine life in crystal-clear waters. Perfect for beginners and experienced divers.",
    includes: ["Equipment", "PADI Instructor", "Boat Rides", "Underwater Photos"],
    bestTime: "Oct - May",
  },
  {
    id: 3,
    title: "Valley of Flowers Trek",
    location: "Uttarakhand",
    image: heroImage,
    category: "trekking",
    difficulty: "Moderate",
    duration: "6 Days",
    groupSize: "10-15",
    price: "₹18,000",
    rating: 4.7,
    reviews: 892,
    description: "Witness the stunning alpine meadows filled with endemic Himalayan flowers. A UNESCO World Heritage Site.",
    includes: ["Guide", "Meals", "Accommodation", "Permits"],
    bestTime: "Jul - Sep",
  },
  {
    id: 4,
    title: "Bir Billing Paragliding",
    location: "Himachal Pradesh",
    image: ladakh,
    category: "paragliding",
    difficulty: "Easy",
    duration: "1 Day",
    groupSize: "Individual",
    price: "₹3,500",
    rating: 4.9,
    reviews: 2341,
    description: "Soar over the Himalayas from Asia's highest paragliding site. Experience the thrill of flying like a bird.",
    includes: ["Tandem Flight", "Certified Pilot", "Video Recording", "Certificate"],
    bestTime: "Mar - Jun, Sep - Nov",
  },
  {
    id: 5,
    title: "Kerala Backwater Kayaking",
    location: "Kerala",
    image: kerala,
    category: "water",
    difficulty: "Easy",
    duration: "2 Days",
    groupSize: "6-10",
    price: "₹8,000",
    rating: 4.6,
    reviews: 423,
    description: "Paddle through serene backwaters, mangroves, and local villages. A peaceful yet adventurous experience.",
    includes: ["Kayak & Gear", "Guide", "Meals", "Homestay"],
    bestTime: "Sep - Mar",
  },
  {
    id: 6,
    title: "Jim Corbett Safari",
    location: "Uttarakhand",
    image: heroImage,
    category: "wildlife",
    difficulty: "Easy",
    duration: "3 Days",
    groupSize: "6-8",
    price: "₹22,000",
    rating: 4.8,
    reviews: 1567,
    description: "Track Bengal tigers in India's oldest national park. Spot elephants, leopards, and diverse birdlife.",
    includes: ["Jeep Safari", "Accommodation", "Meals", "Naturalist Guide"],
    bestTime: "Nov - Jun",
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-green-500/10 text-green-600 border-green-500/30",
  Moderate: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Extreme: "bg-red-500/10 text-red-600 border-red-500/30",
};

export default function Adventures() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredAdventures = adventures.filter(
    (adv) => selectedCategory === "all" || adv.category === selectedCategory
  );

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
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredAdventures.map((adventure) => (
              <article
                key={adventure.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                  <img
                    src={adventure.image}
                    alt={adventure.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:bg-gradient-to-t" />
                  
                  {/* Difficulty Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold border ${difficultyColors[adventure.difficulty]}`}>
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
                      <p className="text-sm font-semibold">{adventure.groupSize}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-secondary/50">
                      <Camera className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="text-xs text-muted-foreground">Best Time</p>
                      <p className="text-sm font-semibold">{adventure.bestTime.split(",")[0]}</p>
                    </div>
                  </div>

                  {/* Includes Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {adventure.includes.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{adventure.price}</p>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                    <Button variant="hero">Book Now</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredAdventures.length === 0 && (
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
