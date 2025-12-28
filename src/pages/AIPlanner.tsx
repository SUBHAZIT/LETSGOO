import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAIChat } from "@/hooks/useAIChat";
import { 
  Sparkles, Send, Bot, User, MapPin, Calendar, Wallet, 
  Loader2, RotateCcw, Lightbulb, Plane, Hotel, Utensils
} from "lucide-react";

const suggestedPrompts = [
  "Plan a 7-day trip to Ladakh with adventure activities",
  "Budget-friendly weekend getaway near Mumbai",
  "Romantic honeymoon itinerary in Kerala",
  "Family trip to Rajasthan with kids",
  "Best time to visit Andaman Islands?",
  "Solo backpacking trip across Northeast India",
];

const features = [
  { icon: MapPin, label: "Smart Routing", desc: "Optimized travel paths" },
  { icon: Calendar, label: "Day Planning", desc: "Hour-by-hour schedules" },
  { icon: Wallet, label: "Budget Tracking", desc: "Real-time cost estimates" },
  { icon: Plane, label: "Transport", desc: "Flight & train suggestions" },
  { icon: Hotel, label: "Stays", desc: "Curated accommodations" },
  { icon: Utensils, label: "Local Food", desc: "Must-try cuisines" },
];

export default function AIPlanner() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, isLoading, error, sendMessage, clearChat } = useAIChat(
    "Hello! I'm your AI travel companion. 🌏 Tell me about your dream trip — where you want to go, your interests, budget, and travel dates — and I'll create a personalized itinerary just for you!"
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
            
            {/* Left Sidebar - Features */}
            <div className="hidden lg:block space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-semibold">AI-Powered</span>
                </div>
                <h1 className="font-display text-3xl font-bold text-foreground mb-3">
                  Your Personal <span className="text-gradient">Trip Architect</span>
                </h1>
                <p className="text-muted-foreground">
                  Get personalized itineraries, budget breakdowns, and local insights powered by AI.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card shadow-soft border border-border/50"
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

              {/* Suggested Prompts */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-foreground">Try asking...</span>
                </div>
                <div className="space-y-2">
                  {suggestedPrompts.slice(0, 4).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      disabled={isLoading}
                      className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2 flex flex-col bg-card rounded-3xl shadow-elevated overflow-hidden border border-border/50">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-border bg-secondary/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center">
                    <Bot className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Wanderlust AI</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Ready to plan your adventure
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={clearChat} disabled={isLoading}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Chat
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                      className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-secondary text-foreground rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center">
                      <Bot className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-none">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex justify-center">
                    <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">
                      {error}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Mobile Suggested Prompts */}
              {messages.length === 1 && (
                <div className="lg:hidden px-4 pb-2">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSuggestedPrompt(prompt)}
                        disabled={isLoading}
                        className="flex-shrink-0 px-3 py-2 rounded-full bg-secondary/50 text-xs text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors disabled:opacity-50"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-border bg-background/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                    placeholder="Tell me about your dream trip..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                  />
                  <Button 
                    variant="hero" 
                    size="icon" 
                    onClick={handleSend} 
                    disabled={isLoading || !input.trim()}
                    className="w-12 h-12"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
