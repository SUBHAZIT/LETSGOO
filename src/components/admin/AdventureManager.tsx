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

interface Adventure {
  id: string;
  slug: string;
  title: string;
  location: string;
  image_url: string | null;
  images: string[];
  category: string;
  difficulty: string;
  duration: string;
  group_size: string;
  altitude: string | null;
  distance: string | null;
  rating: number;
  reviews: number;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
  essentials: string[];
  best_time: string;
  physical_requirement: string | null;
  is_published: boolean;
}

const categories = ["trekking", "water", "wildlife", "camping", "cycling", "paragliding"];
const difficulties = ["Easy", "Moderate", "Extreme"];

export function AdventureManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAdventure, setEditingAdventure] = useState<Adventure | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    images: [] as string[],
    category: "trekking",
    difficulty: "Moderate",
    duration: "",
    group_size: "",
    altitude: "",
    distance: "",
    rating: 4.5,
    reviews: 0,
    description: "",
    highlights: [""],
    itinerary: [{ day: 1, title: "", description: "" }],
    essentials: [""],
    best_time: "",
    physical_requirement: "",
    is_published: false,
  });

  useEffect(() => {
    fetchAdventures();
  }, []);

  const fetchAdventures = async () => {
    const { data, error } = await supabase
      .from("adventures")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch adventures", variant: "destructive" });
    } else {
      // Cast the JSONB itinerary field to the correct type
      const typedData = (data || []).map(a => ({
        ...a,
        itinerary: (a.itinerary as unknown) as { day: number; title: string; description: string }[],
      }));
      setAdventures(typedData);
    }
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      location: "",
      images: [],
      category: "trekking",
      difficulty: "Moderate",
      duration: "",
      group_size: "",
      altitude: "",
      distance: "",
      rating: 4.5,
      reviews: 0,
      description: "",
      highlights: [""],
      itinerary: [{ day: 1, title: "", description: "" }],
      essentials: [""],
      best_time: "",
      physical_requirement: "",
      is_published: false,
    });
    setEditingAdventure(null);
  };

  const openEditDialog = (adv: Adventure) => {
    setEditingAdventure(adv);
    setFormData({
      title: adv.title,
      slug: adv.slug,
      location: adv.location,
      images: adv.images || (adv.image_url ? [adv.image_url] : []),
      category: adv.category,
      difficulty: adv.difficulty,
      duration: adv.duration,
      group_size: adv.group_size,
      altitude: adv.altitude || "",
      distance: adv.distance || "",
      rating: adv.rating,
      reviews: adv.reviews,
      description: adv.description,
      highlights: adv.highlights.length > 0 ? adv.highlights : [""],
      itinerary: adv.itinerary.length > 0 ? adv.itinerary : [{ day: 1, title: "", description: "" }],
      essentials: adv.essentials.length > 0 ? adv.essentials : [""],
      best_time: adv.best_time,
      physical_requirement: adv.physical_requirement || "",
      is_published: adv.is_published,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const adventureData = {
      ...formData,
      image_url: formData.images[0] || null,
      images: formData.images,
      altitude: formData.altitude || null,
      distance: formData.distance || null,
      physical_requirement: formData.physical_requirement || null,
      highlights: formData.highlights.filter(h => h.trim()),
      itinerary: formData.itinerary.filter(i => i.title.trim()),
      essentials: formData.essentials.filter(e => e.trim()),
    };

    let error;
    if (editingAdventure) {
      const { error: updateError } = await supabase
        .from("adventures")
        .update(adventureData)
        .eq("id", editingAdventure.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("adventures").insert(adventureData);
      error = insertError;
    }

    setSaving(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Adventure ${editingAdventure ? "updated" : "created"} successfully` });
      setDialogOpen(false);
      resetForm();
      fetchAdventures();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this adventure?")) return;

    const { error } = await supabase.from("adventures").delete().eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: "Failed to delete adventure", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Adventure deleted successfully" });
      fetchAdventures();
    }
  };

  const togglePublish = async (adv: Adventure) => {
    const { error } = await supabase
      .from("adventures")
      .update({ is_published: !adv.is_published })
      .eq("id", adv.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update adventure", variant: "destructive" });
    } else {
      fetchAdventures();
    }
  };

  const addArrayItem = (field: "highlights" | "essentials") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const updateArrayItem = (field: "highlights" | "essentials", index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const removeArrayItem = (field: "highlights" | "essentials", index: number) => {
    setFormData({ ...formData, [field]: formData[field].filter((_, i) => i !== index) });
  };

  const addItineraryDay = () => {
    const nextDay = formData.itinerary.length + 1;
    setFormData({ ...formData, itinerary: [...formData.itinerary, { day: nextDay, title: "", description: "" }] });
  };

  const updateItinerary = (index: number, field: "title" | "description", value: string) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index][field] = value;
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const removeItineraryDay = (index: number) => {
    const newItinerary = formData.itinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 }));
    setFormData({ ...formData, itinerary: newItinerary });
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
        <h2 className="text-xl font-semibold">Adventures ({adventures.length})</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Adventure
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingAdventure ? "Edit Adventure" : "Create New Adventure"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })} required />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required placeholder="e.g., Ladakh, Jammu & Kashmir" />
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
                  label="Adventure Images"
                />
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <select value={formData.difficulty} onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} required placeholder="e.g., 9 Days" />
                </div>
                <div className="space-y-2">
                  <Label>Group Size</Label>
                  <Input value={formData.group_size} onChange={(e) => setFormData({ ...formData, group_size: e.target.value })} required placeholder="e.g., 8-12 people" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Altitude</Label>
                  <Input value={formData.altitude} onChange={(e) => setFormData({ ...formData, altitude: e.target.value })} placeholder="e.g., 3,850m" />
                </div>
                <div className="space-y-2">
                  <Label>Distance</Label>
                  <Input value={formData.distance} onChange={(e) => setFormData({ ...formData, distance: e.target.value })} placeholder="e.g., 62 km" />
                </div>
                <div className="space-y-2">
                  <Label>Best Time</Label>
                  <Input value={formData.best_time} onChange={(e) => setFormData({ ...formData, best_time: e.target.value })} required placeholder="e.g., Jan - Feb" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} required />
              </div>

              <div className="space-y-2">
                <Label>Physical Requirement</Label>
                <Input value={formData.physical_requirement} onChange={(e) => setFormData({ ...formData, physical_requirement: e.target.value })} placeholder="e.g., Excellent fitness required" />
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

              {/* Itinerary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Day-by-Day Itinerary</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}><Plus className="w-3 h-3 mr-1" />Add Day</Button>
                </div>
                {formData.itinerary.map((day, i) => (
                  <div key={i} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">Day {day.day}</span>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeItineraryDay(i)}><X className="w-4 h-4" /></Button>
                    </div>
                    <Input value={day.title} onChange={(e) => updateItinerary(i, "title", e.target.value)} placeholder="Day title" />
                    <Textarea value={day.description} onChange={(e) => updateItinerary(i, "description", e.target.value)} placeholder="Day description" rows={2} />
                  </div>
                ))}
              </div>

              {/* Essentials */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>What to Pack</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("essentials")}><Plus className="w-3 h-3 mr-1" />Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.essentials.map((e, i) => (
                    <div key={i} className="flex gap-1 items-center">
                      <Input value={e} onChange={(ev) => updateArrayItem("essentials", i, ev.target.value)} placeholder="Item" className="w-40" />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("essentials", i)}><X className="w-3 h-3" /></Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={formData.is_published} onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })} />
                <Label>Publish immediately</Label>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingAdventure ? "Update Adventure" : "Create Adventure"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {adventures.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No adventures yet. Add your first adventure!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {adventures.map((adv) => (
            <Card key={adv.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{adv.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">{adv.category}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${adv.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600' : adv.difficulty === 'Moderate' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'}`}>{adv.difficulty}</span>
                    {adv.is_published ? (
                      <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs">Published</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-xs">Draft</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{adv.location} • {adv.duration}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(adv)}>
                    {adv.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(adv)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(adv.id)}>
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
