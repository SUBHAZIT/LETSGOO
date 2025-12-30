import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BlogImageUploader } from "@/components/BlogImageUploader";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, Clock, Check, X, Edit, Trash2, Loader2, 
  ArrowLeft, PenSquare, Eye, Calendar
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: string;
  read_time: string;
  status: string;
  is_published: boolean;
  created_at: string;
  published_at: string | null;
}

const categories = ["Travel", "Destinations", "Adventure", "Budget Travel", "Food & Culture", "Solo Travel", "Experiences"];

export default function MySubmissions() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
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

  useEffect(() => {
    if (user) {
      fetchMyBlogs();
    }
  }, [user]);

  const fetchMyBlogs = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("author_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to load your blog submissions",
        variant: "destructive",
      });
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  const openEditDialog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || "",
      category: blog.category,
      read_time: blog.read_time,
    });
    setEditDialogOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || !user) return;

    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("blogs")
      .update({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        image_url: formData.image_url || null,
        category: formData.category,
        read_time: formData.read_time,
      })
      .eq("id", editingBlog.id);

    setSaving(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Blog updated",
        description: "Your changes have been saved.",
      });
      setEditDialogOpen(false);
      setEditingBlog(null);
      fetchMyBlogs();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Blog deleted",
        description: "Your blog has been deleted.",
      });
      fetchMyBlogs();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const pendingBlogs = blogs.filter(b => b.status === "pending");
  const approvedBlogs = blogs.filter(b => b.status === "approved");
  const rejectedBlogs = blogs.filter(b => b.status === "rejected");

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const BlogCard = ({ blog }: { blog: Blog }) => (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {blog.image_url && (
            <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
              <img
                src={blog.image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold truncate">{blog.title}</h3>
                  {blog.status === "pending" && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Pending Review
                    </span>
                  )}
                  {blog.status === "approved" && blog.is_published && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Published
                    </span>
                  )}
                  {blog.status === "rejected" && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 text-xs flex items-center gap-1">
                      <X className="w-3 h-3" />
                      Rejected
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{blog.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(blog.created_at)}
                  </span>
                  <span>{blog.category}</span>
                  <span>{blog.read_time}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {blog.status === "approved" && blog.is_published && (
                  <Link to={`/blog/${blog.slug}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
                {blog.status === "pending" && (
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(blog)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                )}
                {blog.status === "pending" && (
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(blog.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      My Blog Submissions
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      Track and manage your blog posts
                    </p>
                  </div>
                </div>
                <Link to="/write-blog">
                  <Button variant="hero">
                    <PenSquare className="w-4 h-4 mr-2" />
                    Write New Post
                  </Button>
                </Link>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : blogs.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No submissions yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Start sharing your travel experiences with the community!
                  </p>
                  <Link to="/write-blog">
                    <Button variant="hero">
                      <PenSquare className="w-4 h-4 mr-2" />
                      Write Your First Post
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all">All ({blogs.length})</TabsTrigger>
                  <TabsTrigger value="pending" className="relative">
                    Pending
                    {pendingBlogs.length > 0 && (
                      <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-xs">
                        {pendingBlogs.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="approved">Published ({approvedBlogs.length})</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected ({rejectedBlogs.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  {pendingBlogs.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No pending submissions</p>
                      </CardContent>
                    </Card>
                  ) : (
                    pendingBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
                  )}
                </TabsContent>

                <TabsContent value="approved" className="space-y-4">
                  {approvedBlogs.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <Check className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No published posts yet</p>
                      </CardContent>
                    </Card>
                  ) : (
                    approvedBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
                  )}
                </TabsContent>

                <TabsContent value="rejected" className="space-y-4">
                  {rejectedBlogs.length === 0 ? (
                    <Card>
                      <CardContent className="py-12 text-center">
                        <X className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No rejected posts</p>
                      </CardContent>
                    </Card>
                  ) : (
                    rejectedBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
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
                <Label>Read Time</Label>
                <Input
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
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
              <Label htmlFor="edit-excerpt">Short Description *</Label>
              <Textarea
                id="edit-excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-content">Your Story *</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                required
                className="min-h-[200px]"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" variant="hero" disabled={saving} className="flex-1">
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
