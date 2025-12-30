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
import BlogDetail from "./pages/BlogDetail";
import WriteBlog from "./pages/WriteBlog";
import Auth from "./pages/Auth";
import MyTrips from "./pages/MyTrips";
import SharedTrip from "./pages/SharedTrip";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AppDownload from "./pages/AppDownload";

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
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/adventures" element={<Adventures />} />
            <Route path="/adventures/:slug" element={<AdventureDetail />} />
            <Route path="/ai-planner" element={<AIPlanner />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/write" element={<WriteBlog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/write-blog" element={<WriteBlog />} />
            <Route path="/my-trips" element={<MyTrips />} />
            <Route path="/trip/:shareToken" element={<SharedTrip />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/app-download" element={<AppDownload />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
