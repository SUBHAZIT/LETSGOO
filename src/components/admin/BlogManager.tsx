import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Loader2, Eye, EyeOff } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  author_name: string;
  read_time: string;
  is_published: boolean;
  created_at: string;
}

export function BlogManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "Travel",
    read_time: "5 min read",
    is_published: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to fetch blogs", variant: "destructive" });
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "Travel",
      read_time: "5 min read",
      is_published: false,
    });
    setEditingBlog(null);
  };

  const openEditDialog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || "",
      category: blog.category,
      read_time: blog.read_time,
      is_published: blog.is_published,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    const blogData = {
      ...formData,
      image_url: formData.image_url || null,
      author_id: user.id,
      author_name: user.email?.split("@")[0] || "Admin",
      published_at: formData.is_published ? new Date().toISOString() : null,
    };

    let error;
    if (editingBlog) {
      const { error: updateError } = await supabase
        .from("blogs")
        .update(blogData)
        .eq("id", editingBlog.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("blogs").insert(blogData);
      error = insertError;
    }

    setSaving(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Blog ${editingBlog ? "updated" : "created"} successfully` });
      setDialogOpen(false);
      resetForm();
      fetchBlogs();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);
    
    if (error) {
      toast({ title: "Error", description: "Failed to delete blog", variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Blog deleted successfully" });
      fetchBlogs();
    }
  };

  const togglePublish = async (blog: Blog) => {
    const { error } = await supabase
      .from("blogs")
      .update({ 
        is_published: !blog.is_published,
        published_at: !blog.is_published ? new Date().toISOString() : null
      })
      .eq("id", blog.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update blog", variant: "destructive" });
    } else {
      fetchBlogs();
    }
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
        <h2 className="text-xl font-semibold">Blog Posts ({blogs.length})</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingBlog ? "Edit Blog" : "Create New Blog"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={(e) => handleTitleChange(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Read Time</Label>
                  <Input value={formData.read_time} onChange={(e) => setFormData({ ...formData, read_time: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={2} required />
              </div>
              <div className="space-y-2">
                <Label>Content (Markdown supported)</Label>
                <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={10} required />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={formData.is_published} onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })} />
                <Label>Publish immediately</Label>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingBlog ? "Update Blog" : "Create Blog"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {blogs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No blogs yet. Create your first blog post!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{blog.title}</h3>
                    {blog.is_published ? (
                      <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs">Published</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-xs">Draft</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{blog.excerpt.substring(0, 100)}...</p>
                  <p className="text-xs text-muted-foreground mt-1">{blog.category} • {blog.read_time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => togglePublish(blog)}>
                    {blog.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(blog)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
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
