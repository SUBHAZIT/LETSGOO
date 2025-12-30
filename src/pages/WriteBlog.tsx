import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlogImageUploader } from "@/components/BlogImageUploader";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PenSquare, Loader2, ArrowLeft, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const categories = ["Travel", "Destinations", "Adventure", "Budget Travel", "Food & Culture", "Solo Travel", "Experiences"];

export default function WriteBlog() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "Travel",
    read_time: "5 min read",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const generateSlug = (title: string) => {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const uniqueSuffix = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    return `${baseSlug}-${uniqueSuffix}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .maybeSingle();

    const blogData = {
      title: formData.title,
      slug: generateSlug(formData.title),
      excerpt: formData.excerpt,
      content: formData.content,
      image_url: formData.image_url || null,
      category: formData.category,
      read_time: formData.read_time,
      author_id: user.id,
      author_name: profile?.display_name || user.email?.split("@")[0] || "Anonymous",
      is_published: false,
      status: "pending",
      published_at: null,
    };

    const { error } = await supabase.from("blogs").insert(blogData);

    setSaving(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Blog submitted!",
        description: "Your blog has been submitted for review. It will be visible after admin approval.",
      });
      navigate("/blog");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button
                variant="ghost"
                onClick={() => navigate("/blog")}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                  <PenSquare className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold text-foreground">
                    Write a Blog Post
                  </h1>
                  <p className="text-muted-foreground">
                    Share your travel experiences with the community
                  </p>
                </div>
              </div>

              <Alert>
                <Info className="w-4 h-4" />
                <AlertDescription>
                  Your blog will be submitted for review. Once approved by our admin team, it will be published and visible to all readers.
                </AlertDescription>
              </Alert>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-8 border border-border/50">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="An Amazing Journey Through Rajasthan"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="read_time">Estimated Read Time</Label>
                  <Input
                    id="read_time"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="5 min read"
                  />
                </div>
              </div>

              {user && (
                <BlogImageUploader
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  userId={user.id}
                />
              )}

              <div className="space-y-2">
                <Label htmlFor="excerpt">Short Description *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="A brief summary of what your blog is about..."
                  rows={3}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This will appear in blog previews (max 200 characters recommended)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Your Story *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share your travel experience, tips, and insights..."
                  rows={15}
                  required
                  className="min-h-[300px]"
                />
                <p className="text-xs text-muted-foreground">
                  Tell your story! Include details about places visited, experiences, and recommendations.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/blog")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="hero"
                  disabled={saving}
                  className="flex-1"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit for Review"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
