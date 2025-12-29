import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { supabase } from "@/integrations/supabase/client";
import blogBeaches from "@/assets/blog-beaches.jpg";
import blogFood from "@/assets/blog-food.jpg";
import blogAdventureKids from "@/assets/blog-adventure-kids.jpg";
import blogLandmarks from "@/assets/blog-landmarks.jpg";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string | null;
  category: string;
}

const fallbackImages = [blogBeaches, blogFood, blogAdventureKids, blogLandmarks];

const staticFeaturedArticle = {
  category: "BEACHES",
  title: "Explore the best beaches in Goa",
  image: blogBeaches,
  href: "/blog/best-beaches-goa",
};

const staticSideArticles = [
  {
    category: "DINING",
    title: "Try traditional Indian cuisine",
    image: blogFood,
    href: "/blog/indian-cuisine",
  },
  {
    category: "ADVENTURES",
    title: "Find unforgettable adventures for all",
    image: blogAdventureKids,
    href: "/blog/family-adventures",
  },
  {
    category: "LANDMARKS",
    title: "Wander the landmarks of ancient India",
    image: blogLandmarks,
    href: "/blog/ancient-landmarks",
  },
];

export function GetInspiredSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, slug, excerpt, image_url, category")
        .eq("is_published", true)
        .eq("status", "approved")
        .order("published_at", { ascending: false })
        .limit(4);

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data || []);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  // Show database blogs if available, otherwise show static content
  const hasDatabaseBlogs = blogs.length > 0;
  
  // Featured article - use first blog if available, otherwise static
  const featuredArticle = hasDatabaseBlogs 
    ? {
        title: blogs[0].title,
        image: blogs[0].image_url || blogBeaches,
        href: `/blog/${blogs[0].slug}`,
        category: blogs[0].category.toUpperCase(),
      }
    : staticFeaturedArticle;

  // Side articles - use remaining blogs if available, otherwise static
  const sideArticles = hasDatabaseBlogs 
    ? blogs.slice(1, 4).map((blog, index) => ({
        category: blog.category.toUpperCase(),
        title: blog.title,
        image: blog.image_url || fallbackImages[index + 1],
        href: `/blog/${blog.slug}`,
      }))
    : staticSideArticles;

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Get inspired to explore
          </h2>
          <Link
            to="/blog"
            className="hidden md:flex items-center gap-2 text-foreground font-medium hover:gap-4 transition-all duration-300 group"
          >
            SEE ALL
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Content Grid */
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Featured Article - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contentVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-3"
            >
              <Link
                to={featuredArticle.href}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] block"
              >
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                
                {/* Tags */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    FEATURED
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/60 backdrop-blur-sm text-primary-foreground">
                    {featuredArticle.category}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                    {featuredArticle.title}
                  </h3>
                </div>
              </Link>
            </motion.div>

            {/* Side Articles - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {sideArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={contentVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                >
                  <Link
                    to={article.href}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-medium text-muted-foreground mb-1">
                        {article.category}
                      </span>
                      <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile See All */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={contentVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:hidden mt-8 text-center"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-foreground font-medium"
          >
            SEE ALL
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
