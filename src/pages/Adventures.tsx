import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Mountain, Waves, Bike, Camera, Tent, TreePine, 
  Wind, Compass, Star, Clock, Users, MapPin, Flame, ArrowRight
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

export const adventures = [
  {
    id: "chadar-trek",
    title: "Chadar Trek - Frozen River",
    location: "Ladakh, Jammu & Kashmir",
    image: ladakh,
    category: "trekking",
    difficulty: "Extreme",
    duration: "9 Days",
    groupSize: "8-12 people",
    altitude: "3,850m - 3,950m",
    distance: "62 km",
    rating: 4.9,
    reviews: 234,
    description: "Walk on the frozen Zanskar River in sub-zero temperatures. One of the most challenging and rewarding treks in the world, the Chadar Trek offers an extraordinary experience of walking on a frozen river through deep gorges.",
    highlights: ["Walk on frozen Zanskar River", "Camp in caves and tents", "Witness stunning ice formations", "Experience Zanskari culture", "Spot wildlife like snow leopards"],
    itinerary: [
      { day: 1, title: "Arrival in Leh", description: "Arrive in Leh and acclimatize. Rest and explore the local market." },
      { day: 2, title: "Acclimatization Day", description: "Visit Leh Palace and Shanti Stupa. Light walks for altitude adjustment." },
      { day: 3, title: "Leh to Chilling", description: "Drive to Chilling (3,200m), the starting point of the Chadar Trek." },
      { day: 4, title: "Chilling to Tibb Cave", description: "Begin the Chadar walk. Trek 8 km on the frozen river to Tibb Cave." },
      { day: 5, title: "Tibb to Nyrak", description: "Trek 10 km through narrow gorges and frozen waterfalls." },
      { day: 6, title: "Nyrak to Lingshed", description: "The most challenging day - 12 km trek to Lingshed village." },
      { day: 7, title: "Explore Lingshed", description: "Rest day. Visit the ancient Lingshed monastery and interact with locals." },
      { day: 8, title: "Return to Chilling", description: "Trek back 18 km to Chilling via the frozen river." },
      { day: 9, title: "Chilling to Leh", description: "Drive back to Leh. Trek concludes." },
    ],
    essentials: ["High-altitude trekking boots", "Down jacket (-40°C rated)", "Sleeping bag (-20°C rated)", "Trekking poles", "UV protection sunglasses", "First aid kit"],
    bestTime: "January - February",
    physicalRequirement: "Excellent fitness required. Previous high-altitude trekking experience recommended."
  },
  {
    id: "scuba-andaman",
    title: "Scuba Diving in Andaman",
    location: "Andaman Islands",
    image: goa,
    category: "water",
    difficulty: "Moderate",
    duration: "3 Days",
    groupSize: "4-6 people",
    altitude: "Sea Level",
    distance: "Multiple dive sites",
    rating: 4.8,
    reviews: 567,
    description: "Explore vibrant coral reefs and marine life in crystal-clear waters of the Andaman Sea. Perfect for beginners and experienced divers, with PADI-certified instructors guiding you through underwater wonders.",
    highlights: ["Swim with manta rays and sea turtles", "Explore coral gardens", "Night diving experience", "Underwater photography", "Visit shipwreck sites"],
    itinerary: [
      { day: 1, title: "Introduction & Pool Training", description: "PADI briefing, equipment familiarization, and pool training session." },
      { day: 2, title: "Open Water Dives", description: "Two open water dives at Havelock Island. Explore coral reefs up to 12m depth." },
      { day: 3, title: "Advanced Dives & Night Dive", description: "Morning dive at a different site. Optional night dive to see nocturnal marine life." },
    ],
    essentials: ["Swimwear", "Sunscreen (reef-safe)", "Underwater camera", "Motion sickness medication", "Light clothing", "Waterproof bag"],
    bestTime: "October - May",
    physicalRequirement: "Basic swimming ability. No prior diving experience needed for beginners course."
  },
  {
    id: "valley-flowers",
    title: "Valley of Flowers Trek",
    location: "Uttarakhand",
    image: heroImage,
    category: "trekking",
    difficulty: "Moderate",
    duration: "6 Days",
    groupSize: "10-15 people",
    altitude: "3,658m",
    distance: "38 km",
    rating: 4.7,
    reviews: 892,
    description: "Witness the stunning alpine meadows filled with endemic Himalayan flowers. This UNESCO World Heritage Site transforms into a paradise of colors during monsoon with over 600 species of flowering plants.",
    highlights: ["UNESCO World Heritage Site", "600+ species of flowers", "Hemkund Sahib pilgrimage", "Stunning Himalayan views", "Rich biodiversity"],
    itinerary: [
      { day: 1, title: "Haridwar to Govindghat", description: "Drive from Haridwar to Govindghat (275 km). Overnight stay at guesthouse." },
      { day: 2, title: "Govindghat to Ghangaria", description: "Trek 13 km to Ghangaria (3,049m), the base camp for Valley of Flowers." },
      { day: 3, title: "Valley of Flowers", description: "Trek 5 km into the valley. Spend the day exploring and photographing flowers." },
      { day: 4, title: "Hemkund Sahib", description: "Trek 6 km to Hemkund Sahib, a sacred Sikh shrine at 4,329m." },
      { day: 5, title: "Ghangaria to Govindghat", description: "Descend back to Govindghat. Easier downhill trek." },
      { day: 6, title: "Return to Haridwar", description: "Drive back to Haridwar. Trek concludes." },
    ],
    essentials: ["Rain gear", "Trekking shoes", "Camera", "Binoculars", "Energy bars", "First aid kit"],
    bestTime: "July - September",
    physicalRequirement: "Moderate fitness level. Suitable for beginners with some trekking experience."
  },
  {
    id: "bir-billing",
    title: "Bir Billing Paragliding",
    location: "Himachal Pradesh",
    image: ladakh,
    category: "paragliding",
    difficulty: "Easy",
    duration: "1 Day",
    groupSize: "Individual",
    altitude: "2,400m takeoff",
    distance: "8-12 km flight",
    rating: 4.9,
    reviews: 2341,
    description: "Soar over the Himalayas from Asia's highest and world's second-highest paragliding site. Experience the thrill of flying like a bird with certified pilots, enjoying breathtaking views of the Dhauladhar range.",
    highlights: ["Asia's highest paragliding site", "20-30 minute flight", "Stunning Himalayan views", "HD video recording", "Certified pilots"],
    itinerary: [
      { day: 1, title: "Paragliding Experience", description: "Morning briefing at Bir. Drive to Billing takeoff site. Tandem flight with certified pilot. Land at Bir landing site. Receive flight video and certificate." },
    ],
    essentials: ["Comfortable clothing", "Sports shoes", "Sunglasses", "Light jacket", "Camera (GoPro recommended)", "Motion sickness medication if prone"],
    bestTime: "March - June, September - November",
    physicalRequirement: "No special fitness required. Weight limit typically 100kg. Not recommended for those with heart conditions or pregnancy."
  },
  {
    id: "kerala-kayaking",
    title: "Kerala Backwater Kayaking",
    location: "Kerala",
    image: kerala,
    category: "water",
    difficulty: "Easy",
    duration: "2 Days",
    groupSize: "6-10 people",
    altitude: "Sea Level",
    distance: "25-30 km paddling",
    rating: 4.6,
    reviews: 423,
    description: "Paddle through serene backwaters, mangroves, and local villages of Kerala. A peaceful yet adventurous experience that takes you through the heart of 'God's Own Country' at a relaxed pace.",
    highlights: ["Paddle through mangroves", "Visit local villages", "Traditional Kerala cuisine", "Sunset kayaking", "Homestay experience"],
    itinerary: [
      { day: 1, title: "Kayaking Introduction", description: "Meet at Alleppey. Kayaking basics and safety briefing. Paddle through narrow canals to a village homestay. Evening cultural program." },
      { day: 2, title: "Extended Exploration", description: "Early morning kayaking through mist-covered backwaters. Visit toddy shop and coir-making unit. Return by noon." },
    ],
    essentials: ["Quick-dry clothing", "Waterproof bag", "Sunscreen", "Hat", "Insect repellent", "Water bottle"],
    bestTime: "September - March",
    physicalRequirement: "Basic fitness. Swimming ability helpful but not required (life jackets provided)."
  },
  {
    id: "corbett-safari",
    title: "Jim Corbett Wildlife Safari",
    location: "Uttarakhand",
    image: heroImage,
    category: "wildlife",
    difficulty: "Easy",
    duration: "3 Days",
    groupSize: "6-8 people",
    altitude: "400m - 1,100m",
    distance: "Multiple safari zones",
    rating: 4.8,
    reviews: 1567,
    description: "Track Bengal tigers in India's oldest national park, established in 1936. Spot elephants, leopards, and over 600 bird species in this biodiverse haven at the foothills of the Himalayas.",
    highlights: ["Bengal tiger sightings", "Elephant herds", "600+ bird species", "Ramganga River views", "Sal and teak forests"],
    itinerary: [
      { day: 1, title: "Arrival & Evening Safari", description: "Check-in at jungle resort. Evening jeep safari in Bijrani or Jhirna zone." },
      { day: 2, title: "Full Day Safaris", description: "Early morning and late afternoon safaris. Visit Corbett Museum during midday." },
      { day: 3, title: "Final Safari & Departure", description: "Dawn safari for best tiger sighting chances. Breakfast and departure by noon." },
    ],
    essentials: ["Binoculars", "Camera with zoom lens", "Neutral colored clothing", "Light jacket", "Sunscreen", "Insect repellent"],
    bestTime: "November - June",
    physicalRequirement: "No special fitness required. Safari is conducted in jeeps."
  },
  {
    id: "spiti-cycling",
    title: "Spiti Valley Cycling Expedition",
    location: "Himachal Pradesh",
    image: ladakh,
    category: "cycling",
    difficulty: "Extreme",
    duration: "12 Days",
    groupSize: "8-10 people",
    altitude: "3,800m - 4,550m",
    distance: "450 km",
    rating: 4.9,
    reviews: 189,
    description: "Cycle through one of India's most remote and spectacular landscapes. The Spiti Valley expedition takes you through ancient monasteries, high passes, and lunar-like terrain in the trans-Himalayan region.",
    highlights: ["Cross Kunzum Pass (4,590m)", "Visit Key Monastery", "Chandratal Lake", "Remote village stays", "Stunning mountain scenery"],
    itinerary: [
      { day: 1, title: "Arrival in Manali", description: "Arrive in Manali. Bike fitting and route briefing." },
      { day: 2, title: "Manali Acclimatization", description: "Short cycling around Manali. Equipment check." },
      { day: 3, title: "Manali to Rohtang", description: "Cycle 51 km with 1,500m elevation gain to Rohtang Pass." },
      { day: 4, title: "Rohtang to Sissu", description: "Descend into Lahaul Valley. 40 km ride to Sissu." },
      { day: 5, title: "Sissu to Keylong", description: "Ride 25 km to Keylong, the district headquarters." },
      { day: 6, title: "Keylong to Jispa", description: "Short ride of 22 km. Rest and recovery day." },
      { day: 7, title: "Jispa to Sarchu", description: "Cross Baralacha La (4,892m). 85 km challenging ride." },
      { day: 8, title: "Sarchu to Pang", description: "Ride 78 km through spectacular gorges." },
      { day: 9, title: "Pang to Kaza", description: "Enter Spiti Valley. 60 km ride to Kaza." },
      { day: 10, title: "Explore Kaza", description: "Visit Key and Kibber monasteries. Rest day." },
      { day: 11, title: "Kaza to Chandratal", description: "Ride to the stunning Chandratal Lake. Camp by the lake." },
      { day: 12, title: "Return via Kunzum", description: "Final ride over Kunzum Pass. Transfer to Manali." },
    ],
    essentials: ["Cycling gear", "Helmet", "Padded shorts", "Warm layers", "Rain jacket", "Altitude medication", "Repair kit"],
    bestTime: "June - September",
    physicalRequirement: "Excellent cardiovascular fitness. Long-distance cycling experience essential."
  },
  {
    id: "ladakh-camping",
    title: "Pangong Lake Camping",
    location: "Ladakh",
    image: ladakh,
    category: "camping",
    difficulty: "Moderate",
    duration: "4 Days",
    groupSize: "8-12 people",
    altitude: "4,350m",
    distance: "Various excursions",
    rating: 4.8,
    reviews: 654,
    description: "Camp beside the mesmerizing Pangong Tso Lake, famous for its changing colors. Experience the magic of stargazing at high altitude and wake up to stunning sunrise views over the lake.",
    highlights: ["Camp by Pangong Lake", "Stargazing at high altitude", "Visit Thiksey Monastery", "Explore Chang La Pass", "Interact with nomadic tribes"],
    itinerary: [
      { day: 1, title: "Leh to Pangong", description: "Drive via Chang La (5,360m). Arrive at Pangong and set up camp." },
      { day: 2, title: "Pangong Exploration", description: "Explore different viewpoints. Interact with local nomads. Evening bonfire." },
      { day: 3, title: "Pangong to Leh", description: "Different route back via Shyok road. Visit Diskit Monastery." },
      { day: 4, title: "Leh Sightseeing", description: "Explore Leh Palace, Shanti Stupa. Trip concludes." },
    ],
    essentials: ["Warm sleeping bag", "Down jacket", "Sunscreen SPF 50+", "Lip balm", "Altitude medication", "Camera"],
    bestTime: "May - September",
    physicalRequirement: "Moderate fitness. Acclimatization to altitude essential before visiting Pangong."
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
              <Link 
                key={adventure.id} 
                to={`/adventures/${adventure.id}`}
                className="group"
              >
                <article className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 flex flex-col md:flex-row h-full">
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
                        <p className="text-sm font-semibold">{adventure.groupSize.split(" ")[0]}</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-secondary/50">
                        <Mountain className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <p className="text-xs text-muted-foreground">Altitude</p>
                        <p className="text-sm font-semibold">{adventure.altitude.split(" ")[0]}</p>
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
