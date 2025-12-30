import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FileText } from "lucide-react";

export default function Terms() {
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
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Legal</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Terms & Conditions
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
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using DoBackpack's website and services, you agree to be bound by these Terms and 
                Conditions. If you disagree with any part of these terms, you may not access our services.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and DoBackpack regarding your use 
                of our travel planning platform, booking services, and related offerings.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Use of Services</h2>
              
              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">2.1 Eligibility</h3>
              <p>
                You must be at least 18 years old to use our services. By using our services, you represent that 
                you are at least 18 years of age and have the legal capacity to enter into binding contracts.
              </p>

              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">2.2 Account Registration</h3>
              <p>To access certain features, you may need to create an account. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">2.3 Prohibited Activities</h3>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use our services for any unlawful purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to access our services without permission</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Booking Terms</h2>
              
              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">3.1 Booking Process</h3>
              <p>
                When you make a booking through our platform, you enter into a contract with the relevant travel 
                service provider (hotel, tour operator, etc.). We act as an intermediary facilitating these bookings.
              </p>

              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">3.2 Pricing and Payment</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are displayed in Indian Rupees (INR) unless otherwise stated</li>
                <li>Prices are subject to change until booking is confirmed</li>
                <li>Full payment or deposit may be required at the time of booking</li>
                <li>Additional fees may apply for certain services or modifications</li>
              </ul>

              <h3 className="font-display text-xl font-semibold text-foreground mt-6 mb-3">3.3 Cancellation and Refunds</h3>
              <p>Cancellation policies vary by service provider. General guidelines:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>30+ days before departure:</strong> Full refund (minus processing fees)</li>
                <li><strong>15-29 days before departure:</strong> 50% refund</li>
                <li><strong>Less than 15 days:</strong> No refund</li>
                <li>Specific bookings may have different terms as indicated at checkout</li>
              </ul>
              <p className="mt-4">
                Refunds will be processed within 7-14 business days using the original payment method.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Travel Requirements</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Obtaining valid travel documents (passport, visas, permits)</li>
                <li>Meeting health and vaccination requirements</li>
                <li>Checking travel advisories and restrictions</li>
                <li>Obtaining appropriate travel insurance</li>
                <li>Complying with local laws and customs</li>
              </ul>
              <p className="mt-4">
                We are not responsible for denied entry, delays, or other issues arising from failure to meet 
                travel requirements.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">5. AI Trip Planner</h2>
              <p>
                Our AI Trip Planner provides personalized travel recommendations based on your preferences. 
                Please note:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Recommendations are suggestions only and should be verified</li>
                <li>We do not guarantee the accuracy of AI-generated content</li>
                <li>Prices, availability, and conditions may change</li>
                <li>You should independently verify important travel information</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">6. User Content</h2>
              <p>
                By submitting content (reviews, blog posts, photos) to our platform, you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Grant us a non-exclusive, royalty-free license to use, modify, and display your content</li>
                <li>Confirm that you own the rights to the content or have permission to share it</li>
                <li>Agree that your content does not violate any laws or third-party rights</li>
                <li>Accept that we may remove content that violates our policies</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">7. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, images, and software, is the property 
                of DoBackpack or its content suppliers and is protected by intellectual property laws.
              </p>
              <p className="mt-4">
                You may not reproduce, distribute, modify, or create derivative works from our content without 
                explicit written permission.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, DoBackpack shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Actions or omissions of third-party service providers</li>
                <li>Force majeure events (natural disasters, pandemics, civil unrest)</li>
                <li>Personal injury or property damage during travel</li>
              </ul>
              <p className="mt-4">
                Our total liability for any claim shall not exceed the amount paid by you for the specific 
                service in question.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless DoBackpack, its officers, directors, employees, and 
                agents from any claims, damages, losses, or expenses arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use of our services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Your content submitted to our platform</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">10. Dispute Resolution</h2>
              <p>
                Any disputes arising from these Terms or your use of our services shall be:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>First, attempted to be resolved through good-faith negotiation</li>
                <li>If unresolved, submitted to mediation in Mumbai, India</li>
                <li>Subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra</li>
              </ul>
              <p className="mt-4">These Terms are governed by the laws of India.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                upon posting to our website. Your continued use of our services after changes constitutes 
                acceptance of the modified Terms.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">12. Contact Information</h2>
              <p>
                For questions about these Terms and Conditions, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-semibold text-foreground">DoBackpack Legal</p>
                <p>Email: legal@dobackpack.com</p>
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
