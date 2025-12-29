import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Adventures from "./pages/Adventures";
import AdventureDetail from "./pages/AdventureDetail";
import AIPlanner from "./pages/AIPlanner";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import MyTrips from "./pages/MyTrips";
import SharedTrip from "./pages/SharedTrip";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/adventures" element={<Adventures />} />
            <Route path="/adventures/:id" element={<AdventureDetail />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/trip/:token" element={<SharedTrip />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
