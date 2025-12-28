import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Compass, BookOpen, Sparkles, Globe } from "lucide-react";

const navLinks = [
  { name: "Destinations", href: "/destinations", icon: MapPin },
  { name: "AI Planner", href: "/ai-planner", icon: Sparkles },
  { name: "Adventures", href: "/adventures", icon: Compass },
  { name: "Blog", href: "/blog", icon: BookOpen },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shadow-accent group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground">
              Wanderlust
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 font-medium"
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="hero" size="sm">
              Plan Your Trip
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
                <Button variant="hero" className="w-full">
                  Plan Your Trip
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
