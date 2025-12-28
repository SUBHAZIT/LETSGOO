import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Clock, User, Search, ArrowRight, Tag, Calendar, 
  TrendingUp, Heart, MessageCircle, Share2
} from "lucide-react";

import heroImage from "@/assets/hero-mountains.jpg";
import tajmahal from "@/assets/destination-tajmahal.jpg";
import kerala from "@/assets/destination-kerala.jpg";
import ladakh from "@/assets/destination-ladakh.jpg";
import goa from "@/assets/destination-goa.jpg";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Northeast India You Must Visit",
    excerpt: "Discover the unexplored beauty of Northeast India — from living root bridges to pristine lakes that will leave you spellbound.",
    image: heroImage,
    author: "Priya Sharma",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "Destinations",
    featured: true,
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    title: "Complete Guide to Chadar Trek: Walking on Frozen River",
    excerpt: "Everything you need to know about one of the world's most challenging treks — from preparation to survival tips.",
    image: ladakh,
    author: "Rahul Verma",
    date: "Dec 12, 2024",
    readTime: "12 min read",
    category: "Adventure",
    featured: true,
    likes: 567,
    comments: 89,
  },
  {
    id: 3,
    title: "Budget Backpacking: Explore India Under ₹1000/Day",
    excerpt: "Smart travel hacks and budget tips to explore incredible India without burning a hole in your pocket.",
    image: goa,
    author: "Aisha Khan",
    date: "Dec 10, 2024",
    readTime: "10 min read",
    category: "Budget Travel",
    featured: false,
    likes: 892,
    comments: 156,
  },
  {
    id: 4,
    title: "Kerala Houseboats: A Complete Experience Guide",
    excerpt: "Navigate the backwaters like a local — best routes, booking tips, and what to expect from your floating stay.",
    image: kerala,
    author: "Deepak Nair",
    date: "Dec 8, 2024",
    readTime: "7 min read",
    category: "Experiences",
    featured: false,
    likes: 345,
    comments: 67,
  },
  {
    id: 5,
    title: "Rajasthan Food Trail: From Royal Kitchens to Street Food",
    excerpt: "A culinary journey through the land of kings — discover the flavors that make Rajasthani cuisine unforgettable.",
    image: tajmahal,
    author: "Meera Joshi",
    date: "Dec 5, 2024",
    readTime: "9 min read",
    category: "Food & Culture",
    featured: false,
    likes: 423,
    comments: 78,
  },
  {
    id: 6,
    title: "Solo Female Travel in India: Safety Tips & Best Destinations",
    excerpt: "Empowering women travelers with practical advice and inspiring destinations for solo adventures in India.",
    image: heroImage,
    author: "Ananya Reddy",
    date: "Dec 2, 2024",
    readTime: "11 min read",
    category: "Solo Travel",
    featured: false,
    likes: 678,
    comments: 134,
  },
];

const categories = ["All", "Destinations", "Adventure", "Budget Travel", "Food & Culture", "Solo Travel", "Experiences"];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPosts = blogPosts.filter((post) => post.featured);
  
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory && !post.featured;
  });

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
              The Wanderlust <span className="text-gradient">Blog</span>
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

      {/* Featured Posts */}
      {selectedCategory === "All" && searchQuery === "" && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl font-bold text-foreground">Featured Stories</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article
                  key={post.id}
                  className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={post.image}
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
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-white hover:text-accent">
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
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
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-muted-foreground text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex items-center gap-1 text-xs">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter</p>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
