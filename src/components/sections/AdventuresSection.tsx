import { Mountain, Waves, Tent, Camera, Bike, TreePine, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const adventures = [
  {
    id: 1,
    icon: Mountain,
    title: "Himalayan Treks",
    description: "Conquer majestic peaks from Kashmir to Sikkim",
    trips: 45,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: 2,
    icon: Waves,
    title: "Water Sports",
    description: "Surf, dive, and paddle across India's coastline",
    trips: 32,
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    id: 3,
    icon: Tent,
    title: "Camping",
    description: "Sleep under the stars in pristine wilderness",
    trips: 28,
    color: "bg-green-500/10 text-green-600",
  },
  {
    id: 4,
    icon: Camera,
    title: "Wildlife Safari",
    description: "Spot tigers, elephants, and exotic birds",
    trips: 24,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    id: 5,
    icon: Bike,
    title: "Cycling Tours",
    description: "Pedal through scenic routes and villages",
    trips: 18,
    color: "bg-red-500/10 text-red-600",
  },
  {
    id: 6,
    icon: TreePine,
    title: "Nature Walks",
    description: "Explore forests, waterfalls, and hidden gems",
    trips: 56,
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

export function AdventuresSection() {
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

        {/* Adventures Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adventures.map((adventure, index) => (
            <div
              key={adventure.id}
              className="group relative p-6 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-elevated hover:border-primary/30 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${adventure.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <adventure.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {adventure.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {adventure.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  {adventure.trips} trips
                </span>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg">
            Explore All Adventures
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
