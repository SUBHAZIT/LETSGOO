import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import itineraryLadakh from "@/assets/itinerary-ladakh.jpg";
import itineraryKerala from "@/assets/itinerary-kerala.jpg";
import itineraryRajasthan from "@/assets/itinerary-rajasthan.jpg";

const itineraries = [
  {
    title: "Ladakh Explorer Tour",
    image: itineraryLadakh,
    href: "/adventures/ladakh-explorer",
  },
  {
    title: "Kerala Backwaters Journey",
    image: itineraryKerala,
    href: "/adventures/kerala-backwaters",
  },
  {
    title: "Royal Rajasthan Heritage",
    image: itineraryRajasthan,
    href: "/adventures/rajasthan-heritage",
  },
];

export function PlanYourTimeSection() {
  return (
    <section className="py-20 bg-teal">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-4 text-teal-foreground">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Plan your time
              <br />
              <span className="text-primary-foreground/80">in India</span>
            </h2>
            <Link
              to="/ai-planner"
              className="inline-flex items-center gap-2 text-teal-foreground font-medium hover:gap-4 transition-all duration-300 group"
            >
              SEE ALL ITINERARIES
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Itinerary Cards */}
          <div className="lg:col-span-8 flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0">
            {itineraries.map((itinerary) => (
              <Link
                key={itinerary.title}
                to={itinerary.href}
                className="flex-shrink-0 w-72 bg-card rounded-2xl overflow-hidden shadow-elevated group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {itinerary.title}
                  </h3>
                </div>
              </Link>
            ))}

            {/* Navigation Button */}
            <div className="flex-shrink-0 flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-full bg-card border-0 shadow-elevated hover:bg-card"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}