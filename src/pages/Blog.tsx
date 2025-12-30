import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BookOpen, Clock, User, Search, ArrowRight, Calendar, 
  TrendingUp, Loader2, PenSquare
} from "lucide-react";

import heroImage from "@/assets/hero-mountains.jpg";
import tajmahal from "@/assets/destination-tajmahal.jpg";
import kerala from "@/assets/destination-kerala.jpg";
import ladakh from "@/assets/destination-ladakh.jpg";
import goa from "@/assets/destination-goa.jpg";

interface BlogPost {
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
  published_at: string | null;
  created_at: string;
  status: string;
}

// Fallback images
const fallbackImages = [heroImage, tajmahal, kerala, ladakh, goa];

const categories = ["All", "Destinations", "Adventure", "Budget Travel", "Food & Culture", "Solo Travel", "Experiences", "Travel"];

export default function Blog() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .eq("status", "approved")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data || []);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  const featuredPosts = blogs.slice(0, 2);
  
  const filteredPosts = blogs.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).slice(selectedCategory === "All" && searchQuery === "" ? 2 : 0);

  const getImage = (post: BlogPost, index: number) => {
    if (post.image_url) return post.image_url;
    return fallbackImages[index % fallbackImages.length];
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-semibold">Travel Stories & Guides</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              The LETSGOO <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Inspiring stories, practical guides, and insider tips from travelers around India and beyond.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-xl"
              />
            </div>

            {/* Write Blog CTA */}
            {user && (
              <div className="mt-6">
                <Link to="/blog/write">
                  <Button variant="outline" className="gap-2">
                    <PenSquare className="w-4 h-4" />
                    Write a Blog Post
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "hero" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Featured Posts */}
          {selectedCategory === "All" && searchQuery === "" && featuredPosts.length > 0 && (
            <section className="py-12">
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-2xl font-bold text-foreground">Featured Stories</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <article className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50">
                        <div className="relative h-72 overflow-hidden">
                          <img
                            src={getImage(post, index)}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          
                          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                            Featured
                          </span>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium mb-3 inline-block">
                              {post.category}
                            </span>
                            <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-white/80 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 text-white/70 text-sm">
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {post.author_name}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {post.read_time}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm" className="text-white hover:text-accent">
                                Read More <ArrowRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                {selectedCategory === "All" ? "Latest Articles" : selectedCategory}
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <article className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getImage(post, index + 2)}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.published_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.read_time}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            {post.author_name}
                          </div>
                          <span className="text-primary text-sm font-medium flex items-center gap-1">
                            Read <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && blogs.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No articles yet</h3>
                  <p className="text-muted-foreground mb-6">Be the first to share your travel story!</p>
                  {user && (
                    <Link to="/blog/write">
                      <Button variant="hero">
                        <PenSquare className="w-4 h-4 mr-2" />
                        Write a Blog Post
                      </Button>
                    </Link>
                  )}
                </div>
              )}

              {filteredPosts.length === 0 && blogs.length > 0 && (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or category filter</p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
