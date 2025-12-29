import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  Clock, User, Calendar, ArrowLeft, Share2, Loader2, BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import heroImage from "@/assets/hero-mountains.jpg";

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

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .eq("status", "approved")
        .maybeSingle();

      if (error) {
        console.error("Error fetching blog:", error);
      } else {
        setBlog(data);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: url,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Blog link has been copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Blog Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button variant="hero">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={blog.image_url || heroImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto -mt-32 relative z-10">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate("/blog")}
              className="mb-6 bg-background/80 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            {/* Article Card */}
            <article className="bg-card rounded-2xl p-8 md:p-12 shadow-elevated border border-border/50">
              {/* Category */}
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                {blog.category}
              </span>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-8 pb-8 border-b border-border">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {blog.author_name}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(blog.published_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {blog.read_time}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-muted-foreground mb-8 italic border-l-4 border-primary pl-4">
                {blog.excerpt}
              </p>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-foreground">
                {blog.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </article>

            {/* Back to Blog CTA */}
            <div className="text-center mt-12">
              <Link to="/blog">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Explore More Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}