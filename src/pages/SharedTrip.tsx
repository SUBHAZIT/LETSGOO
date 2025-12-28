import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Calendar, Wallet, Clock, ArrowLeft, Loader2, Share2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Itinerary {
  id: string;
  title: string;
  destination: string;
  duration: string | null;
  budget: string | null;
  content: string;
  created_at: string;
}

export default function SharedTrip() {
  const { token } = useParams<{ token: string }>();
  const [trip, setTrip] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      fetchTrip();
    }
  }, [token]);

  const fetchTrip = async () => {
    try {
      const { data, error } = await supabase
        .from("itineraries")
        .select("id, title, destination, duration, budget, content, created_at")
        .eq("share_token", token)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        setError("Trip not found or no longer shared");
      } else {
        setTrip(data);
      }
    } catch (err) {
      console.error("Error fetching trip:", err);
      setError("Failed to load trip");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Share this link with others",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {error || "Trip Not Found"}
            </h1>
            <p className="text-muted-foreground mb-6">
              This trip may have been removed or is no longer shared.
            </p>
            <Button variant="hero" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {trip.title}
                  </h1>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{trip.destination}</span>
                  </div>
                </div>
                
                <Button variant="outline" onClick={copyLink}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8">
              {trip.duration && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
                  <Clock className="w-4 h-4" />
                  {trip.duration}
                </div>
              )}
              {trip.budget && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
                  <Wallet className="w-4 h-4" />
                  {trip.budget}
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(trip.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Content */}
            <article className="bg-card rounded-2xl shadow-soft border border-border/50 p-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {trip.content.split("\n").map((paragraph, i) => (
                  <p key={i} className="text-foreground whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            {/* CTA */}
            <div className="mt-8 text-center p-8 rounded-2xl bg-secondary/50">
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Want to create your own trip?
              </h3>
              <p className="text-muted-foreground mb-4">
                Use our AI planner to create personalized itineraries in seconds
              </p>
              <Button variant="hero" asChild>
                <Link to="/ai-planner">Plan Your Trip</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
