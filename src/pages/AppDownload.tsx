import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Hammer, Wrench, HardHat, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppDownload = () => {
  return (
    <div className="min-h-screen bg-footer text-footer-foreground flex flex-col overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <Link to="/">
          <Button variant="ghost" className="gap-2 text-footer-foreground hover:bg-footer-foreground/10">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Animated Construction Scene */}
          <div className="relative h-72 mb-12">
            {/* Central Glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Worker 1 with Hammer */}
            <motion.div
              className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm border border-footer-foreground/10 rounded-2xl p-6">
                  <HardHat className="w-14 h-14 text-primary" />
                </div>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -35, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
                className="absolute -right-2 top-6 origin-bottom"
              >
                <Hammer className="w-8 h-8 text-footer-foreground/80" />
              </motion.div>
              {/* Sparks */}
              <motion.div
                className="absolute -right-6 top-4"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </motion.div>

            {/* Worker 2 with Wrench */}
            <motion.div
              className="absolute right-1/4 top-1/2 translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <div className="bg-gradient-to-br from-footer-foreground/20 to-footer-foreground/5 backdrop-blur-sm border border-footer-foreground/10 rounded-2xl p-6">
                  <HardHat className="w-14 h-14 text-footer-foreground/90" />
                </div>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 25, 0, -25, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
                className="absolute -left-2 top-6 origin-bottom"
              >
                <Wrench className="w-8 h-8 text-footer-foreground/80" />
              </motion.div>
              {/* Sparks */}
              <motion.div
                className="absolute -left-6 top-4"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.4, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            </motion.div>

            {/* Building Blocks Animation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 bg-gradient-to-br from-primary/40 to-primary/20 backdrop-blur-sm border border-footer-foreground/10 rounded-lg"
                  initial={{ opacity: 0, y: 50, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                />
              ))}
            </div>
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`row2-${i}`}
                  className="w-10 h-10 bg-gradient-to-br from-footer-foreground/30 to-footer-foreground/10 backdrop-blur-sm border border-footer-foreground/10 rounded-lg"
                  initial={{ opacity: 0, y: 50, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block mb-8"
          >
            <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-8 py-3 rounded-full font-display text-xl font-bold shadow-lg shadow-primary/25">
              COMING SOON
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-display text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Our Engineers Are Working
            <br />
            <span className="text-primary">Continuously</span> To Serve You Better
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-footer-foreground/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Please use our website until the app is launched. We're building something amazing for you!
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/">
              <Button 
                size="lg" 
                className="rounded-full px-10 py-6 text-lg gap-3 bg-footer-foreground text-footer hover:bg-footer-foreground/90 shadow-xl shadow-black/20"
              >
                Explore Website
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-footer-foreground/50 text-sm relative z-10">
        <p>© {new Date().getFullYear()} LETSGOO. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AppDownload;
