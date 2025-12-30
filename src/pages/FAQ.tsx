import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    category: "Planning Your Trip",
    questions: [
      {
        question: "When is the best time to visit India?",
        answer: "The best time to visit India depends on the region. October to March is ideal for most of India with pleasant weather. For the Himalayas, visit between April and June or September to November. Monsoon season (July-September) offers lush landscapes in Kerala and the Western Ghats."
      },
      {
        question: "How far in advance should I book my trip?",
        answer: "We recommend booking at least 2-3 months in advance, especially during peak season (October-March). For popular destinations like Rajasthan during festivals or Kerala during Onam, book 4-6 months ahead to secure the best accommodations and experiences."
      },
      {
        question: "Do I need a visa to visit India?",
        answer: "Most foreign nationals require a visa to visit India. The e-Visa facility is available for citizens of over 160 countries. You can apply online at the official Indian government portal. Tourist e-Visas are typically valid for 30 days to 5 years depending on the type chosen."
      },
      {
        question: "What vaccinations do I need for India?",
        answer: "Recommended vaccinations include Hepatitis A & B, Typhoid, and Tetanus. Depending on your itinerary, you may also need Malaria prophylaxis, Japanese Encephalitis, and Rabies vaccines. Consult your healthcare provider at least 6-8 weeks before travel."
      }
    ]
  },
  {
    category: "During Your Trip",
    questions: [
      {
        question: "Is it safe to drink tap water in India?",
        answer: "We recommend drinking only bottled or purified water throughout your trip. Most hotels and restaurants serve filtered water. Always check that bottle seals are intact when purchasing. Avoid ice in drinks unless you're certain it's made from purified water."
      },
      {
        question: "What should I pack for my India trip?",
        answer: "Pack light, breathable clothing in natural fabrics. Modest dress is appreciated, especially at religious sites—carry a scarf to cover shoulders. Comfortable walking shoes, sunscreen, insect repellent, and a basic first-aid kit are essential. Don't forget adapters for Type C/D/M plugs."
      },
      {
        question: "How do I get around in India?",
        answer: "India offers diverse transport options: domestic flights for long distances, trains for scenic journeys (book AC classes for comfort), and private cars with drivers for flexibility. Within cities, use ride-hailing apps like Uber and Ola. Auto-rickshaws are great for short trips—negotiate fares beforehand."
      },
      {
        question: "Is it customary to tip in India?",
        answer: "Tipping is appreciated but not mandatory. A general guideline: 10% at restaurants if service charge isn't included, ₹50-100 for hotel porters, ₹200-500/day for drivers and guides. Round up taxi fares. Your generosity directly impacts local livelihoods."
      }
    ]
  },
  {
    category: "Booking & Payments",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and bank transfers. For Indian residents, UPI and net banking options are also available. All transactions are secured with industry-standard encryption."
      },
      {
        question: "What is your cancellation policy?",
        answer: "Cancellation policies vary by booking type. Generally: Full refund if cancelled 30+ days before departure, 50% refund for 15-29 days, and no refund for less than 15 days. Adventure activities and peak season bookings may have stricter policies. Check your booking confirmation for specifics."
      },
      {
        question: "Can I customize my itinerary?",
        answer: "Absolutely! Our AI Trip Planner helps create personalized itineraries based on your preferences. You can also contact us directly for custom tour planning. We specialize in tailoring experiences to your interests, pace, and budget."
      },
      {
        question: "Do you offer travel insurance?",
        answer: "While we don't sell insurance directly, we strongly recommend purchasing comprehensive travel insurance before your trip. It should cover medical emergencies, trip cancellation, baggage loss, and adventure activities if applicable."
      }
    ]
  },
  {
    category: "Adventures & Activities",
    questions: [
      {
        question: "What fitness level is required for treks?",
        answer: "Fitness requirements vary by trek. Easy treks like Valley of Flowers suit beginners with basic fitness. Moderate treks like Hampta Pass require regular exercise routine. Challenging treks like Chadar need excellent stamina and prior trekking experience. Each adventure listing specifies requirements."
      },
      {
        question: "Are adventure activities safe?",
        answer: "Safety is our priority. All adventure partners are certified and follow strict safety protocols. Equipment is regularly inspected, and activities are weather-dependent. We provide safety briefings and ensure appropriate group sizes with trained guides."
      },
      {
        question: "Can children participate in adventures?",
        answer: "Many adventures are family-friendly! Wildlife safaris, easy treks, and cultural tours welcome children. Each activity listing shows age restrictions. We can recommend age-appropriate adventures and ensure special arrangements for families traveling with young children."
      }
    ]
  }
];

export default function FAQ() {
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
              <HelpCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Help Center</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about planning your perfect India adventure. 
              Can't find what you're looking for? Feel free to contact us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${categoryIndex}-${index}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg transition-shadow"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-8">
              Our travel experts are here to help you plan the perfect trip.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
