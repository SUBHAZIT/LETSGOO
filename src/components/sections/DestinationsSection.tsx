import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import tajmahalImg from "@/assets/destination-tajmahal.jpg";
import keralaImg from "@/assets/destination-kerala.jpg";
import ladakhImg from "@/assets/destination-ladakh.jpg";
import goaImg from "@/assets/destination-goa.jpg";

const destinations = [
  {
    id: 1,
    name: "Taj Mahal, Agra",
    description: "Marvel at India's iconic symbol of love",
    image: tajmahalImg,
    rating: 4.9,
    price: "₹2,500",
    tag: "Heritage",
  },
  {
    id: 2,
    name: "Kerala Backwaters",
    description: "Cruise through serene tropical waterways",
    image: keralaImg,
    rating: 4.8,
    price: "₹8,000",
    tag: "Nature",
  },
  {
    id: 3,
    name: "Ladakh Monastery",
    description: "Experience spiritual tranquility in the mountains",
    image: ladakhImg,
    rating: 4.9,
    price: "₹15,000",
    tag: "Adventure",
  },
  {
    id: 4,
    name: "Goa Beaches",
    description: "Relax on pristine tropical shores",
    image: goaImg,
    rating: 4.7,
    price: "₹5,500",
    tag: "Beach",
  },
];

export function DestinationsSection() {
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
          <Button variant="outline" className="w-fit">
            View All Destinations
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div
              key={dest.id}
              className="group relative rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-elevated transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                
                {/* Tag */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-semibold">
                  {dest.tag}
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
                <p className="text-sm text-muted-foreground mb-3">
                  {dest.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">
                    {dest.price}
                    <span className="text-xs text-muted-foreground font-normal">/person</span>
                  </p>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
