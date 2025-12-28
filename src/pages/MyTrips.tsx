import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, Calendar, Wallet, Clock, Edit, Trash2, Share2, 
  Plus, Search, Globe, Lock, Loader2, ExternalLink, Copy
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Itinerary {
  id: string;
  title: string;
  destination: string;
  duration: string | null;
  start_date: string | null;
  end_date: string | null;
  budget: string | null;
  content: string;
  is_public: boolean;
  share_token: string;
  created_at: string;
  updated_at: string;
}

export default function MyTrips() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTrip, setEditingTrip] = useState<Itinerary | null>(null);
  const [deleteTrip, setDeleteTrip] = useState<Itinerary | null>(null);
  const [shareTrip, setShareTrip] = useState<Itinerary | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchItineraries();
    }
  }, [user]);

  const fetchItineraries = async () => {
    try {
      const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItineraries(data || []);
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      toast({
        title: "Error",
        description: "Failed to load your trips",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTrip) return;
    
    try {
      const { error } = await supabase
        .from("itineraries")
        .delete()
        .eq("id", deleteTrip.id);

      if (error) throw error;

      setItineraries((prev) => prev.filter((i) => i.id !== deleteTrip.id));
      toast({
        title: "Trip deleted",
        description: "Your itinerary has been removed",
      });
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      toast({
        title: "Error",
        description: "Failed to delete trip",
        variant: "destructive",
      });
    } finally {
      setDeleteTrip(null);
    }
  };

  const handleUpdate = async () => {
    if (!editingTrip) return;

    try {
      const { error } = await supabase
        .from("itineraries")
        .update({
          title: editingTrip.title,
          destination: editingTrip.destination,
          duration: editingTrip.duration,
          budget: editingTrip.budget,
          content: editingTrip.content,
          is_public: editingTrip.is_public,
        })
        .eq("id", editingTrip.id);

      if (error) throw error;

      setItineraries((prev) =>
        prev.map((i) => (i.id === editingTrip.id ? editingTrip : i))
      );
      toast({
        title: "Trip updated",
        description: "Your changes have been saved",
      });
    } catch (error) {
      console.error("Error updating itinerary:", error);
      toast({
        title: "Error",
        description: "Failed to update trip",
        variant: "destructive",
      });
    } finally {
      setEditingTrip(null);
    }
  };

  const copyShareLink = () => {
    if (!shareTrip) return;
    const shareUrl = `${window.location.origin}/trip/${shareTrip.share_token}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share this link with friends and family",
    });
  };

  const togglePublic = async (trip: Itinerary) => {
    try {
      const { error } = await supabase
        .from("itineraries")
        .update({ is_public: !trip.is_public })
        .eq("id", trip.id);

      if (error) throw error;

      setItineraries((prev) =>
        prev.map((i) => (i.id === trip.id ? { ...i, is_public: !i.is_public } : i))
      );
      
      if (shareTrip?.id === trip.id) {
        setShareTrip({ ...shareTrip, is_public: !shareTrip.is_public });
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const filteredTrips = itineraries.filter(
    (trip) =>
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                My Trips
              </h1>
              <p className="text-muted-foreground">
                {itineraries.length} saved itineraries
              </p>
            </div>
            
            <div className="flex gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search trips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="hero" asChild>
                <Link to="/ai-planner">
                  <Plus className="w-4 h-4 mr-2" />
                  New Trip
                </Link>
              </Button>
            </div>
          </div>

          {/* Trips Grid */}
          {filteredTrips.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <article
                  key={trip.id}
                  className="bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-foreground line-clamp-1">
                          {trip.title}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                          <MapPin className="w-4 h-4" />
                          {trip.destination}
                        </div>
                      </div>
                      {trip.is_public ? (
                        <Globe className="w-5 h-5 text-primary" />
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                      {trip.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {trip.duration}
                        </span>
                      )}
                      {trip.budget && (
                        <span className="flex items-center gap-1">
                          <Wallet className="w-4 h-4" />
                          {trip.budget}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {trip.content.substring(0, 150)}...
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {new Date(trip.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShareTrip(trip)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingTrip(trip)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTrip(trip)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchQuery ? "No trips found" : "No trips yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "Start planning your first adventure with our AI planner"}
              </p>
              {!searchQuery && (
                <Button variant="hero" asChild>
                  <Link to="/ai-planner">
                    <Plus className="w-4 h-4 mr-2" />
                    Plan Your First Trip
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={!!editingTrip} onOpenChange={() => setEditingTrip(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Trip</DialogTitle>
            <DialogDescription>Update your itinerary details</DialogDescription>
          </DialogHeader>
          
          {editingTrip && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={editingTrip.title}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Destination</Label>
                  <Input
                    value={editingTrip.destination}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, destination: e.target.value })
                    }
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input
                    value={editingTrip.duration || ""}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, duration: e.target.value })
                    }
                    placeholder="e.g., 7 days"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Budget</Label>
                  <Input
                    value={editingTrip.budget || ""}
                    onChange={(e) =>
                      setEditingTrip({ ...editingTrip, budget: e.target.value })
                    }
                    placeholder="e.g., ₹50,000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Itinerary</Label>
                <Textarea
                  value={editingTrip.content}
                  onChange={(e) =>
                    setEditingTrip({ ...editingTrip, content: e.target.value })
                  }
                  rows={12}
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="public"
                  checked={editingTrip.is_public}
                  onCheckedChange={(checked) =>
                    setEditingTrip({ ...editingTrip, is_public: checked })
                  }
                />
                <Label htmlFor="public">Make this trip public</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTrip(null)}>
              Cancel
            </Button>
            <Button variant="hero" onClick={handleUpdate}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTrip} onOpenChange={() => setDeleteTrip(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Trip</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteTrip?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTrip(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={!!shareTrip} onOpenChange={() => setShareTrip(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Trip</DialogTitle>
            <DialogDescription>
              Share your itinerary with friends and family
            </DialogDescription>
          </DialogHeader>
          
          {shareTrip && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch
                  id="sharePublic"
                  checked={shareTrip.is_public}
                  onCheckedChange={() => togglePublic(shareTrip)}
                />
                <Label htmlFor="sharePublic">
                  {shareTrip.is_public ? "Public - Anyone can view" : "Private - Only with link"}
                </Label>
              </div>

              <div className="space-y-2">
                <Label>Share Link</Label>
                <div className="flex gap-2">
                  <Input
                    readOnly
                    value={`${window.location.origin}/trip/${shareTrip.share_token}`}
                  />
                  <Button variant="outline" onClick={copyShareLink}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShareTrip(null)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
