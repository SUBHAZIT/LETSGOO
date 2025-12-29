import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import categoryCulture from "@/assets/category-culture.jpg";
import categoryAdventure from "@/assets/category-adventure.jpg";
import categoryRelaxation from "@/assets/category-relaxation.jpg";

const categories = [
  {
    tag: "CULTURE",
    title: "Immerse yourself in culture",
    image: categoryCulture,
    href: "/adventures?category=cultural",
  },
  {
    tag: "ADVENTURE",
    title: "Chase your next adventure",
    image: categoryAdventure,
    href: "/adventures?category=adventure",
  },
  {
    tag: "RELAXATION",
    title: "Unwind in style",
    image: categoryRelaxation,
    href: "/adventures?category=relaxation",
  },
];

export function ThingsToDoSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Things To Do
          </h2>
          <Link
            to="/adventures"
            className="hidden md:flex items-center gap-2 text-foreground font-medium hover:gap-4 transition-all duration-300 group"
          >
            SEE ALL
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.tag}
              initial={{ opacity: 0, y: 50 }}
              animate={cardsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <Link
                to={category.href}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-[3/4] block"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <span className="px-4 py-1.5 bg-foreground/60 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium mb-4">
                    {category.tag}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                    {category.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile See All */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={cardsVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="md:hidden mt-8 text-center"
        >
          <Link
            to="/adventures"
            className="inline-flex items-center gap-2 text-foreground font-medium"
          >
            SEE ALL
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}