import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MultiImageUploader } from "@/components/MultiImageUploader";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Loader2, Eye, EyeOff, X } from "lucide-react";

interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image_url: string | null;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  best_time: string;
  temperature: string;
  ideal_duration: string;
  description: string;
  highlights: string[];
  attractions: { name: string; description: string }[];
  cuisine: string[];
  travel_tips: string[];
  is_published: boolean;
}

const categories = ["Heritage", "Nature", "Adventure", "Beach", "Spiritual", "Mountains"];

export function DestinationManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    images: [] as string[],
    rating: 4.5,
    reviews: 0,
    category: "Heritage",
    best_time: "",
    temperature: "",
    ideal_duration: "",
    description: "",
    highlights: [""],
    attractions: [{ name: "", description: "" }],
    cuisine: [""],
    travel_tips: [""],
    is_published: false,
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch destinations", variant: "destructive" });
    } else {
      // Cast the JSONB attractions field to the correct type
      const typedData = (data || []).map(d => ({
        ...d,
        attractions: (d.attractions as unknown) as { name: string; description: string }[],
      }));
      setDestinations(typedData);
    }
    setLoading(false);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      tagline: "",
      images: [],
      rating: 4.5,
      reviews: 0,
      category: "Heritage",
      best_time: "",
      temperature: "",
      ideal_duration: "",
      description: "",
      highlights: [""],
      attractions: [{ name: "", description: "" }],
      cuisine: [""],
      travel_tips: [""],
      is_published: false,
    });
    setEditingDestination(null);
  };

  const openEditDialog = (dest: Destination) => {
    setEditingDestination(dest);
    setFormData({
      name: dest.name,
      slug: dest.slug,
      tagline: dest.tagline,
      images: dest.images || (dest.image_url ? [dest.image_url] : []),
      rating: dest.rating,
      reviews: dest.reviews,
      category: dest.category,
      best_time: dest.best_time,
      temperature: dest.temperature,
      ideal_duration: dest.ideal_duration,
      description: dest.description,
      highlights: dest.highlights.length > 0 ? dest.highlights : [""],
      attractions: dest.attractions.length > 0 ? dest.attractions : [{ name: "", description: "" }],
      cuisine: dest.cuisine.length > 0 ? dest.cuisine : [""],
      travel_tips: dest.travel_tips.length > 0 ? dest.travel_tips : [""],
      is_published: dest.is_published,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const destinationData = {
      ...formData,
      image_url: formData.images[0] || null,
      images: formData.images,
      highlights: formData.highlights.filter(h => h.trim()),
      attractions: formData.attractions.filter(a => a.name.trim()),
      cuisine: formData.cuisine.filter(c => c.trim()),
      travel_tips: formData.travel_tips.filter(t => t.trim()),
    };

    let error;
    if (editingDestination) {
      const { error: updateError } = await supabase
        .from("destinations")
        .update(destinationData)
        .eq("id", editingDestination.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("destinations").insert(destinationData);
      error = insertError;
    }

    setSaving(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Destination ${editingDestination ? "updated" : "created"} successfully` });
      setDialogOpen(false);
      resetForm();
      fetchDestinations();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;

    const { error } = await supabase.from("destinations").delete().eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: "Failed to delete destination", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Destination deleted successfully" });
      fetchDestinations();
    }
  };

  const togglePublish = async (dest: Destination) => {
    const { error } = await supabase
      .from("destinations")
      .update({ is_published: !dest.is_published })
      .eq("id", dest.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update destination", variant: "destructive" });
    } else {
      fetchDestinations();
    }
  };

  const addArrayItem = (field: "highlights" | "cuisine" | "travel_tips") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const updateArrayItem = (field: "highlights" | "cuisine" | "travel_tips", index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const removeArrayItem = (field: "highlights" | "cuisine" | "travel_tips", index: number) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  const addAttraction = () => {
    setFormData({ ...formData, attractions: [...formData.attractions, { name: "", description: "" }] });
  };

  const updateAttraction = (index: number, field: "name" | "description", value: string) => {
    const newAttractions = [...formData.attractions];
    newAttractions[index][field] = value;
    setFormData({ ...formData, attractions: newAttractions });
  };

  const removeAttraction = (index: number) => {
    setFormData({ ...formData, attractions: formData.attractions.filter((_, i) => i !== index) });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Destinations ({destinations.length})</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDestination ? "Edit Destination" : "Create New Destination"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} required />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input value={formData.tagline} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} required placeholder="e.g., Land of Kings" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>

              {user && (
                <MultiImageUploader
                  values={formData.images}
                  onChange={(images) => setFormData({ ...formData, images })}
                  userId={user.id}
                  maxImages={5}
                  label="Destination Images"
                />
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Best Time to Visit</Label>
                  <Input value={formData.best_time} onChange={(e) => setFormData({ ...formData, best_time: e.target.value })} required placeholder="Oct - Mar" />
                </div>
                <div className="space-y-2">
                  <Label>Temperature Range</Label>
                  <Input value={formData.temperature} onChange={(e) => setFormData({ ...formData, temperature: e.target.value })} required placeholder="15°C - 32°C" />
                </div>
                <div className="space-y-2">
                  <Label>Ideal Duration</Label>
                  <Input value={formData.ideal_duration} onChange={(e) => setFormData({ ...formData, ideal_duration: e.target.value })} required placeholder="5-7 Days" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required />
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Highlights</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("highlights")}><Plus className="w-3 h-3 mr-1" />Add</Button>
                </div>
                {formData.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={h} onChange={(e) => updateArrayItem("highlights", i, e.target.value)} placeholder="Highlight" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("highlights", i)}><X className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>

              {/* Attractions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Attractions</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addAttraction}><Plus className="w-3 h-3 mr-1" />Add</Button>
                </div>
                {formData.attractions.map((a, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <Input value={a.name} onChange={(e) => updateAttraction(i, "name", e.target.value)} placeholder="Attraction name" className="flex-1" />
                    <Input value={a.description} onChange={(e) => updateAttraction(i, "description", e.target.value)} placeholder="Description" className="flex-[2]" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeAttraction(i)}><X className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>

              {/* Cuisine */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Local Cuisine</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("cuisine")}><Plus className="w-3 h-3 mr-1" />Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.cuisine.map((c, i) => (
                    <div key={i} className="flex gap-1 items-center">
                      <Input value={c} onChange={(e) => updateArrayItem("cuisine", i, e.target.value)} placeholder="Dish" className="w-32" />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("cuisine", i)}><X className="w-3 h-3" /></Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Travel Tips */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Travel Tips</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("travel_tips")}><Plus className="w-3 h-3 mr-1" />Add</Button>
                </div>
                {formData.travel_tips.map((t, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={t} onChange={(e) => updateArrayItem("travel_tips", i, e.target.value)} placeholder="Travel tip" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("travel_tips", i)}><X className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={formData.is_published} onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })} />
                <Label>Publish immediately</Label>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingDestination ? "Update Destination" : "Create Destination"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {destinations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No destinations yet. Add your first destination!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {destinations.map((dest) => (
            <Card key={dest.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{dest.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">{dest.category}</span>
                    {dest.is_published ? (
                      <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs">Published</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-xs">Draft</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{dest.tagline} • {dest.ideal_duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(dest)}>
                    {dest.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(dest)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(dest.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
