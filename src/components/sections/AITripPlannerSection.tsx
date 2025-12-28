import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, Bot, User, MapPin, Calendar, Wallet, Loader2 } from "lucide-react";

const sampleResponses = [
  "I'd love to help you plan your dream trip! Where would you like to go?",
  "Great choice! Ladakh is breathtaking. What's your travel duration and budget?",
  "Perfect! Here's a personalized 7-day Ladakh itinerary...",
];

export function AITripPlannerSection() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI travel companion. Tell me about your dream trip and I'll create a personalized itinerary for you. 🌏" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: randomResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-semibold">AI-Powered Planning</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              Your Personal
              <br />
              <span className="text-gradient">Trip Architect</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Tell us your travel dreams and let our AI craft the perfect itinerary. 
              From budget calculations to local experiences, we've got everything covered.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, label: "Smart Routing", desc: "Optimized travel paths" },
                { icon: Calendar, label: "Day Planning", desc: "Hour-by-hour schedules" },
                { icon: Wallet, label: "Budget Tracking", desc: "Real-time cost estimates" },
                { icon: Bot, label: "24/7 Assistant", desc: "Always here to help" },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{feature.label}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Chat Interface */}
          <div className="bg-card rounded-3xl shadow-elevated overflow-hidden border border-border/50">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Wanderlust AI</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "gradient-accent text-accent-foreground"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-secondary text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-none">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Tell me about your dream trip..."
                  className="flex-1 px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button variant="hero" size="icon" onClick={handleSend} className="w-12 h-12">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
