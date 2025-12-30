import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Hammer, Wrench, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppDownload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/20 flex flex-col">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Animated Construction Scene */}
          <div className="relative h-64 mb-8">
            {/* Worker 1 with Hammer */}
            <motion.div
              className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, -30, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.3 }}
                className="origin-bottom-right"
              >
                <div className="bg-primary/20 rounded-full p-6">
                  <HardHat className="w-12 h-12 text-primary" />
                </div>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -45, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.4 }}
                className="absolute -right-4 top-8 origin-bottom"
              >
                <Hammer className="w-10 h-10 text-foreground/80" />
              </motion.div>
            </motion.div>

            {/* Worker 2 with Wrench */}
            <motion.div
              className="absolute right-1/4 top-1/2 translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 0.2 }}
                className="origin-bottom-left"
              >
                <div className="bg-secondary/40 rounded-full p-6">
                  <HardHat className="w-12 h-12 text-secondary-foreground" />
                </div>
              </motion.div>
              <motion.div
                animate={{ rotate: [0, 30, 0, -30, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.3 }}
                className="absolute -left-4 top-8 origin-bottom"
              >
                <Wrench className="w-10 h-10 text-foreground/80" />
              </motion.div>
            </motion.div>

            {/* Construction Sparks */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
            >
              <div className="w-4 h-4 bg-yellow-400 rounded-full blur-sm" />
            </motion.div>

            {/* Building Blocks Animation */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 bg-primary/30 rounded"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                />
              ))}
            </div>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`row2-${i}`}
                className="absolute w-8 h-8 bg-primary/40 rounded"
                style={{ 
                  bottom: 36, 
                  left: `calc(50% - 52px + ${i * 36}px)` 
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.15 }}
              />
            ))}
          </div>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block mb-6"
          >
            <span className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-display text-lg font-bold">
              COMING SOON
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
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
            className="text-muted-foreground text-lg md:text-xl mb-8 max-w-lg mx-auto"
          >
            Please use our website until the app is launched. We're building something amazing for you!
          </motion.p>

          {/* Progress Bar Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">Development Progress: 65%</p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link to="/">
              <Button size="lg" className="rounded-full px-8 gap-2">
                Explore Website
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-muted-foreground text-sm">
        <p>© {new Date().getFullYear()} LETSGOO. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AppDownload;
