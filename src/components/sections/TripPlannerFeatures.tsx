import { 
  CalendarDays, 
  MapPin, 
  Wallet, 
  Users, 
  Clock, 
  Star,
  Plane,
  Hotel,
  Utensils,
  Camera
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Day-by-Day Itinerary",
    description: "Detailed schedules with timing, locations, and activities for each day of your trip.",
  },
  {
    icon: Wallet,
    title: "Budget Calculator",
    description: "Track expenses across transport, accommodation, food, and activities in any currency.",
  },
  {
    icon: Hotel,
    title: "Stay Recommendations",
    description: "Curated hotels, hostels, and homestays that match your budget and preferences.",
  },
  {
    icon: Utensils,
    title: "Local Food Guide",
    description: "Discover must-try dishes and the best places to eat at every destination.",
  },
  {
    icon: Plane,
    title: "Transport Planning",
    description: "Flight, train, and bus options with booking links and estimated costs.",
  },
  {
    icon: Camera,
    title: "Experience Curation",
    description: "Activities, tours, and hidden gems recommended by local experts.",
  },
];

export function TripPlannerFeatures() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            All-in-One Planning
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From the moment you start dreaming to the day you return home, 
            our comprehensive tools make trip planning effortless.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "29", label: "States Covered" },
            { value: "1000+", label: "Destinations" },
            { value: "500+", label: "Trek Routes" },
            { value: "24/7", label: "AI Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-card/50">
              <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
