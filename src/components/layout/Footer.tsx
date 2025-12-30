import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUp, Instagram, Twitter, Facebook, Youtube, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";


const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" });

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
  const { ref, isVisible } = useScrollAnimation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-footer text-footer-foreground">
      <div ref={ref} className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Newsletter Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-footer-muted rounded-2xl p-8"
          >
            <h3 className="font-display text-2xl font-bold mb-4">
              Subscribe to the Newsletter
            </h3>
            <p className="text-footer-foreground/70 mb-6">
              Sign up for exciting travel news, learn more about our events and get great travel ideas.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="bg-footer-foreground/10 border-footer-foreground/20 text-footer-foreground placeholder:text-footer-foreground/50 rounded-full px-4"
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <Button 
                type="submit"
                variant="outline" 
                disabled={isSubmitting}
                className="border-footer-foreground/30 bg-transparent text-footer-foreground hover:bg-footer-foreground hover:text-footer rounded-full px-6 whitespace-nowrap w-full"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {isSubmitting ? "SUBSCRIBING..." : "SUBSCRIBE NEWSLETTER →"}
              </Button>
            </form>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-footer-muted rounded-2xl p-8"
          >
            <nav className="space-y-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className="block text-footer-foreground/90 hover:text-footer-foreground font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Social & App Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-footer-muted rounded-2xl p-8"
          >
            <h3 className="font-display text-2xl font-bold mb-6">Follow us</h3>
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-footer-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <Link to="/app-download" className="block border-t border-footer-foreground/20 pt-6 hover:opacity-80 transition-opacity">
              <h4 className="font-display text-xl font-bold mb-2">Download</h4>
              <p className="text-footer-foreground/70">Our App</p>
            </Link>
          </motion.div>
        </motion.div>

        {/* Logo and Back to Top */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between mt-12 pt-8 border-t border-footer-foreground/20"
        >
          <Link to="/" className="font-display text-2xl font-bold">
            <span className="text-footer-foreground">LETS</span>
            <span className="text-primary">GOO</span>
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={scrollToTop}
              variant="outline"
              className="border-footer-foreground/30 bg-transparent text-footer-foreground hover:bg-footer-foreground hover:text-footer rounded-full px-6 gap-2 whitespace-nowrap"
            >
              BACK TO TOP <ArrowUp className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap gap-6 mt-8 text-sm text-footer-foreground/60"
        >
          <Link to="/faq" className="hover:text-footer-foreground transition-colors">FAQs</Link>
          <Link to="/privacy" className="hover:text-footer-foreground transition-colors">Privacy policy</Link>
          <Link to="/terms" className="hover:text-footer-foreground transition-colors">Terms and conditions</Link>
          <span className="ml-auto">Copyright © {new Date().getFullYear()} LETSGOO. All Rights Reserved.</span>
        </motion.div>
      </div>
    </footer>
  );
}