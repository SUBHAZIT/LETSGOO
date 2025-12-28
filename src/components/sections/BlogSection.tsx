import { ArrowRight, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Himachal Pradesh You Must Visit",
    excerpt: "Discover offbeat destinations away from the tourist crowds that offer stunning views and authentic experiences.",
    author: "Priya Sharma",
    date: "Dec 25, 2024",
    readTime: "8 min read",
    category: "Destinations",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
  },
  {
    id: 2,
    title: "Complete Guide to Backpacking Across India on a Budget",
    excerpt: "Everything you need to know about traveling India without breaking the bank - hostels, transport, and food tips.",
    author: "Rahul Verma",
    date: "Dec 22, 2024",
    readTime: "12 min read",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600",
  },
  {
    id: 3,
    title: "Best Time to Visit Ladakh: A Season-by-Season Guide",
    excerpt: "Plan your perfect Ladakh trip with our comprehensive guide to weather, festivals, and activities throughout the year.",
    author: "Amit Patel",
    date: "Dec 18, 2024",
    readTime: "6 min read",
    category: "Planning",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
  },
];

export function BlogSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Travel Stories
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2">
              From Our Blog
            </h2>
          </div>
          <Button variant="outline" className="w-fit">
            View All Posts
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-accent/90 text-accent-foreground text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
