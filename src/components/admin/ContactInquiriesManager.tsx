import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Trash2, Mail, Loader2, Inbox } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export function ContactInquiriesManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ["contact-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ContactInquiry[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("contact_inquiries")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-inquiries"] });
      toast({ title: "Inquiry deleted" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete inquiry", variant: "destructive" });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!inquiries || inquiries.length === 0) {
    return (
      <div className="text-center py-12">
        <Inbox className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No inquiries yet</h3>
        <p className="text-muted-foreground">Contact form submissions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Contact Inquiries ({inquiries.length})</h2>
      </div>

      <div className="grid gap-4">
        {inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{inquiry.name}</span>
                    <a 
                      href={`mailto:${inquiry.email}`} 
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      {inquiry.email}
                    </a>
                    <span>{format(new Date(inquiry.created_at), "MMM d, yyyy 'at' h:mm a")}</span>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete inquiry?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the inquiry from {inquiry.name}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMutation.mutate(inquiry.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className={`text-sm text-muted-foreground ${
                  expandedId === inquiry.id ? "" : "line-clamp-2"
                }`}
              >
                {inquiry.message}
              </div>
              {inquiry.message.length > 150 && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto mt-2"
                  onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                >
                  {expandedId === inquiry.id ? "Show less" : "Read more"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
