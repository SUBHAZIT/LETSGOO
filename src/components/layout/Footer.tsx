import { Link } from "react-router-dom";
import { ArrowUp, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "THINGS TO DO", href: "/adventures" },
  { name: "WHERE TO GO", href: "/destinations" },
  { name: "PLAN YOUR TRIP", href: "/ai-planner" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT US", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Newsletter Section */}
          <div className="bg-footer-muted rounded-2xl p-8">
            <h3 className="font-display text-2xl font-bold mb-4">
              Subscribe to the Newsletter
            </h3>
            <p className="text-footer-foreground/70 mb-6">
              Sign up for exciting travel news, learn more about our events and get great travel ideas.
            </p>
            <Button 
              variant="outline" 
              className="border-footer-foreground/30 text-footer-foreground hover:bg-footer-foreground hover:text-footer rounded-full px-6"
            >
              SUBSCRIBE NEWSLETTER →
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="bg-footer-muted rounded-2xl p-8">
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-footer-foreground/90 hover:text-footer-foreground font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & App Section */}
          <div className="bg-footer-muted rounded-2xl p-8">
            <h3 className="font-display text-2xl font-bold mb-6">Follow us</h3>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-footer-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="border-t border-footer-foreground/20 pt-6">
              <h4 className="font-display text-xl font-bold mb-2">Download</h4>
              <p className="text-footer-foreground/70">Our App</p>
            </div>
          </div>
        </div>

        {/* Logo and Back to Top */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-footer-foreground/20">
          <Link to="/" className="font-display text-2xl font-bold">
            <span className="text-footer-foreground">do</span>
            <span className="text-primary">backpack</span>
          </Link>
          <Button
            onClick={scrollToTop}
            variant="outline"
            className="border-footer-foreground/30 text-footer-foreground hover:bg-footer-foreground hover:text-footer rounded-full px-6 gap-2"
          >
            BACK TO TOP <ArrowUp className="w-4 h-4" />
          </Button>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap gap-6 mt-8 text-sm text-footer-foreground/60">
          <Link to="/faq" className="hover:text-footer-foreground transition-colors">FAQs</Link>
          <Link to="/privacy" className="hover:text-footer-foreground transition-colors">Privacy policy</Link>
          <Link to="/terms" className="hover:text-footer-foreground transition-colors">Terms and conditions</Link>
          <span className="ml-auto">Copyright © {new Date().getFullYear()} DOBACKPACK. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}