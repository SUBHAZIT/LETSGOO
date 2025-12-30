import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Your Privacy Matters</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-lg max-w-none text-muted-foreground"
          >
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Introduction</h2>
              <p>
                Welcome to LetsGoo ("we," "our," or "us"). We are committed to protecting your personal information 
                and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you visit our website and use our travel planning services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                please do not access the site.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              
              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Register for an account</li>
                <li>Make a booking or inquiry</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our forms</li>
                <li>Use our AI Trip Planner</li>
              </ul>
              <p className="mt-4">This information may include:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Travel preferences and interests</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect certain information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and general location</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your travel bookings and inquiries</li>
                <li>Personalize your experience and provide tailored recommendations</li>
                <li>Send you newsletters, marketing communications, and updates (with your consent)</li>
                <li>Improve our website, products, and services</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Protect against fraudulent or illegal activity</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Information Sharing</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Third-party vendors who help us operate our business (payment processors, email services, analytics providers)</li>
                <li><strong>Travel Partners:</strong> Hotels, tour operators, and activity providers to fulfill your bookings</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-4">
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect and store information. Cookies are small 
                data files stored on your device that help us improve your experience and our services.
              </p>
              <p className="mt-4">You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict certain processing activities</li>
                <li>Withdraw consent at any time</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-4">To exercise these rights, please contact us using the information provided below.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect 
                personal information from children. If you are a parent or guardian and believe your child has 
                provided us with personal information, please contact us.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. The updated version will be indicated by an 
                updated "Last Updated" date. We encourage you to review this privacy policy periodically.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              <p>
                If you have questions or comments about this privacy policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground">LetsGoo</p>
                <p>Email: privacy@letsgoo.com</p>
                <p>Address: Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
