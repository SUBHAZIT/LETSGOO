import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import blogBeaches from "@/assets/blog-beaches.jpg";
import blogFood from "@/assets/blog-food.jpg";
import blogAdventureKids from "@/assets/blog-adventure-kids.jpg";
import blogLandmarks from "@/assets/blog-landmarks.jpg";

const featuredArticle = {
  tags: ["FEATURED", "BEACHES"],
  title: "Explore the best beaches in Goa",
  image: blogBeaches,
  href: "/blog/best-beaches-goa",
};

const sideArticles = [
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
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
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
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured Article - Takes 3 columns */}
          <Link
            to={featuredArticle.href}
            className="lg:col-span-3 group relative rounded-2xl overflow-hidden aspect-[4/3]"
          >
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            
            {/* Tags */}
            <div className="absolute top-6 left-6 flex gap-2">
              {featuredArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tag === "FEATURED"
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground/60 backdrop-blur-sm text-primary-foreground"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                {featuredArticle.title}
              </h3>
            </div>
          </Link>

          {/* Side Articles - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {sideArticles.map((article) => (
              <Link
                key={article.title}
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
            ))}
          </div>
        </div>

        {/* Mobile See All */}
        <div className="lg:hidden mt-8 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-foreground font-medium"
          >
            SEE ALL
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}