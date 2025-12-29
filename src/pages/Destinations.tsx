import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, MapPin, Star, Clock, Sun, Thermometer, 
  Mountain, Waves, Building, TreePine, ArrowRight
} from "lucide-react";

import heroImage from "@/assets/hero-mountains.jpg";
import tajmahal from "@/assets/destination-tajmahal.jpg";
import ladakh from "@/assets/destination-ladakh.jpg";
import kerala from "@/assets/destination-kerala.jpg";
import goa from "@/assets/destination-goa.jpg";

export const destinations = [
  {
    id: "rajasthan",
    name: "Rajasthan",
    tagline: "Land of Kings",
    image: tajmahal,
    rating: 4.8,
    reviews: 4523,
    category: "Heritage",
    bestTime: "October - March",
    temperature: "15°C - 32°C",
    idealDuration: "7-10 Days",
    description: "Rajasthan, the 'Land of Kings', is India's largest state and a kaleidoscope of vibrant culture, majestic forts, and golden deserts.",
    highlights: ["Amber Fort & Jaipur", "Udaipur Lake Palace", "Jaisalmer Desert Safari", "Jodhpur Blue City", "Pushkar Camel Fair"],
    attractions: [
      { name: "Amber Fort", description: "A magnificent hilltop fort with stunning mirror work and panoramic views." },
      { name: "City Palace, Udaipur", description: "A grand complex on the banks of Lake Pichola." },
      { name: "Mehrangarh Fort", description: "One of India's largest forts, rising 400 feet above Jodhpur." },
      { name: "Jaisalmer Fort", description: "A living fort in the Thar Desert." },
    ],
    cuisine: ["Dal Baati Churma", "Laal Maas", "Ghewar", "Ker Sangri", "Pyaaz Kachori"],
    travelTips: ["Book heritage hotels in advance", "Carry light cotton clothes", "Hire a local guide", "Try camel safari at sunset"]
  },
  {
    id: "kerala",
    name: "Kerala",
    tagline: "God's Own Country",
    image: kerala,
    rating: 4.9,
    reviews: 5234,
    category: "Nature",
    bestTime: "September - March",
    temperature: "22°C - 33°C",
    idealDuration: "5-7 Days",
    description: "Kerala is a tropical paradise known for its palm-lined beaches, tranquil backwaters, and lush hill stations.",
    highlights: ["Alleppey Backwaters", "Munnar Tea Gardens", "Kovalam Beach", "Wayanad Wildlife", "Kathakali Performances"],
    attractions: [
      { name: "Alleppey Backwaters", description: "A network of lagoons best explored on a houseboat." },
      { name: "Munnar Hill Station", description: "Rolling hills covered with tea plantations." },
      { name: "Periyar Wildlife Sanctuary", description: "Home to elephants and tigers." },
      { name: "Fort Kochi", description: "Historic port town with colonial architecture." },
    ],
    cuisine: ["Appam with Stew", "Kerala Fish Curry", "Puttu & Kadala", "Sadhya Feast", "Banana Chips"],
    travelTips: ["Book houseboats with Kerala Tourism", "Monsoon offers lush scenery", "Ayurvedic treatments need 14+ days", "Respect local customs"]
  },
  {
    id: "ladakh",
    name: "Ladakh",
    tagline: "Land of High Passes",
    image: ladakh,
    rating: 4.9,
    reviews: 3876,
    category: "Adventure",
    bestTime: "May - September",
    temperature: "-5°C - 25°C",
    idealDuration: "7-10 Days",
    description: "Ladakh is a high-altitude cold desert known for its stark landscapes, ancient monasteries, and Tibetan Buddhist culture.",
    highlights: ["Pangong Lake", "Nubra Valley", "Khardung La Pass", "Hemis Monastery", "Magnetic Hill"],
    attractions: [
      { name: "Pangong Tso Lake", description: "A stunning blue lake that changes colors." },
      { name: "Nubra Valley", description: "Known for Bactrian camels and sand dunes." },
      { name: "Leh Palace", description: "A 17th-century royal palace." },
      { name: "Thiksey Monastery", description: "A 12-story complex resembling Potala Palace." },
    ],
    cuisine: ["Thukpa", "Momos", "Skyu", "Butter Tea", "Chhurpi"],
    travelTips: ["Acclimatize for 2 days in Leh", "Carry altitude sickness medication", "Inner Line Permit required", "Road trips best June-September"]
  },
  {
    id: "goa",
    name: "Goa",
    tagline: "Beach Paradise",
    image: goa,
    rating: 4.7,
    reviews: 8765,
    category: "Beach",
    bestTime: "November - February",
    temperature: "25°C - 35°C",
    idealDuration: "4-6 Days",
    description: "Goa is famous for its pristine beaches, Portuguese heritage, vibrant nightlife, and laid-back coastal vibe.",
    highlights: ["Baga & Calangute Beaches", "Old Goa Churches", "Dudhsagar Falls", "Spice Plantations", "Fontainhas Latin Quarter"],
    attractions: [
      { name: "Basilica of Bom Jesus", description: "A UNESCO World Heritage Site." },
      { name: "Anjuna Flea Market", description: "Vibrant Wednesday market." },
      { name: "Dudhsagar Waterfalls", description: "Magnificent four-tiered waterfall." },
      { name: "Aguada Fort", description: "17th-century Portuguese fort." },
    ],
    cuisine: ["Fish Curry Rice", "Bebinca", "Vindaloo", "Xacuti", "Feni"],
    travelTips: ["North Goa for nightlife, South for serenity", "Rent a scooter", "Monsoon transforms Goa", "Respect beach rules"]
  },
  {
    id: "varanasi",
    name: "Varanasi",
    tagline: "Spiritual Capital of India",
    image: tajmahal,
    rating: 4.6,
    reviews: 3421,
    category: "Spiritual",
    bestTime: "October - March",
    temperature: "15°C - 35°C",
    idealDuration: "2-3 Days",
    description: "Varanasi, one of the world's oldest cities, is the spiritual heart of India on the banks of the sacred Ganges.",
    highlights: ["Ganga Aarti", "Sunrise Boat Ride", "Kashi Vishwanath Temple", "Sarnath", "Narrow Lanes & Bazaars"],
    attractions: [
      { name: "Dashashwamedh Ghat", description: "Main ghat for evening Ganga Aarti." },
      { name: "Kashi Vishwanath Temple", description: "One of the 12 Jyotirlingas." },
      { name: "Sarnath", description: "Where Buddha gave his first sermon." },
      { name: "Manikarnika Ghat", description: "Principal cremation ghat." },
    ],
    cuisine: ["Banarasi Paan", "Kachori Sabzi", "Lassi", "Malaiyo", "Chaat"],
    travelTips: ["Wake up early for sunrise boat ride", "Dress modestly at temples", "No photography at cremation ghats", "Hire a local guide"]
  },
  {
    id: "himachal",
    name: "Himachal Pradesh",
    tagline: "Abode of Snow",
    image: heroImage,
    rating: 4.8,
    reviews: 6543,
    category: "Mountains",
    bestTime: "March - June, Sept - Nov",
    temperature: "0°C - 25°C",
    idealDuration: "7-12 Days",
    description: "Himachal Pradesh is a Himalayan wonderland of snow-capped peaks, verdant valleys, and ancient temples.",
    highlights: ["Manali & Rohtang Pass", "Shimla Colonial Architecture", "Dharamshala & McLeodganj", "Spiti Valley", "Great Himalayan National Park"],
    attractions: [
      { name: "Rohtang Pass", description: "High mountain pass with stunning snow views." },
      { name: "Dalai Lama Temple", description: "Residence of the Dalai Lama in McLeodganj." },
      { name: "Spiti Valley", description: "Cold desert with ancient monasteries." },
      { name: "Solang Valley", description: "Adventure hub for paragliding and skiing." },
    ],
    cuisine: ["Siddu", "Dham", "Madra", "Chha Gosht", "Babru"],
    travelTips: ["Book Spiti trips in advance", "Carry warm clothes even in summer", "Check road conditions", "Respect Tibetan settlements"]
  }
];

const categories = ["All", "Heritage", "Nature", "Adventure", "Beach", "Spiritual", "Mountains"];

export default function Destinations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <Link key={destination.id} to={`/destinations/${destination.id}`} className="group">
                <article className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img src={destination.image} alt={destination.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Sun className="w-4 h-4 text-primary" /><span>{destination.bestTime}</span></div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4 text-primary" /><span>{destination.idealDuration}</span></div>
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
          {filteredDestinations.length === 0 && (
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