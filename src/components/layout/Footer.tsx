import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  destinations: [
    { name: "North India", href: "/destinations/north" },
    { name: "South India", href: "/destinations/south" },
    { name: "East India", href: "/destinations/east" },
    { name: "West India", href: "/destinations/west" },
    { name: "Northeast", href: "/destinations/northeast" },
  ],
  adventures: [
    { name: "Treks", href: "/adventures/treks" },
    { name: "Beach Holidays", href: "/adventures/beaches" },
    { name: "Wildlife Safari", href: "/adventures/safari" },
    { name: "Cultural Tours", href: "/adventures/cultural" },
    { name: "Honeymoon", href: "/adventures/honeymoon" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Partners", href: "/partners" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Safety", href: "/safety" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cancellation", href: "/cancellation" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-background/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-background">
                Wanderlust
              </span>
            </Link>
            <p className="text-background/60 text-sm mb-6 max-w-xs">
              Your AI-powered travel companion for exploring India and beyond. 
              Plan, discover, and create unforgettable memories.
            </p>
            <div className="space-y-3 text-sm text-background/60">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@wanderlust.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold text-background mb-4">Destinations</h4>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-background/60 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Adventures */}
          <div>
            <h4 className="font-semibold text-background mb-4">Adventures</h4>
            <ul className="space-y-2">
              {footerLinks.adventures.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-background/60 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-background/60 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-background mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-background/60 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
