import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, FileText, MapPin, Mountain, 
  Plus, Loader2, Shield
} from "lucide-react";
import { BlogManager } from "@/components/admin/BlogManager";
import { DestinationManager } from "@/components/admin/DestinationManager";
import { AdventureManager } from "@/components/admin/AdventureManager";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin role:", error);
        toast({
          title: "Error",
          description: "Failed to verify admin access",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      if (!data) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    };

    checkAdminRole();
  }, [user, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your content</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="blogs" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="blogs" className="gap-2">
                <FileText className="w-4 h-4" />
                Blogs
              </TabsTrigger>
              <TabsTrigger value="destinations" className="gap-2">
                <MapPin className="w-4 h-4" />
                Destinations
              </TabsTrigger>
              <TabsTrigger value="adventures" className="gap-2">
                <Mountain className="w-4 h-4" />
                Adventures
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blogs">
              <BlogManager />
            </TabsContent>

            <TabsContent value="destinations">
              <DestinationManager />
            </TabsContent>

            <TabsContent value="adventures">
              <AdventureManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
