import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Trash2, Users, Send, RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
  is_active: boolean;
}

export function NewsletterManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);

  const { data: subscribers, isLoading, refetch } = useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false });

      if (error) throw error;
      return data as Subscriber[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
      toast({ title: "Subscriber deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .delete()
        .in("id", ids);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter-subscribers"] });
      setSelectedIds([]);
      toast({ title: "Subscribers deleted" });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const sendBulkEmailMutation = useMutation({
    mutationFn: async ({ subject, content, subscriberIds }: { subject: string; content: string; subscriberIds?: string[] }) => {
      const { data, error } = await supabase.functions.invoke("send-bulk-newsletter", {
        body: { subject, content, subscriberIds: subscriberIds?.length ? subscriberIds : undefined },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setIsSendDialogOpen(false);
      setEmailSubject("");
      setEmailContent("");
      setSelectedIds([]);
      toast({ 
        title: "Emails sent!", 
        description: `Successfully sent to ${data.sent} subscribers${data.failed > 0 ? `, ${data.failed} failed` : ""}` 
      });
    },
    onError: (error: any) => {
      toast({ title: "Error sending emails", description: error.message, variant: "destructive" });
    },
  });

  const activeSubscribers = subscribers?.filter(s => s.is_active) || [];
  const inactiveSubscribers = subscribers?.filter(s => !s.is_active) || [];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(activeSubscribers.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleSendEmail = () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      toast({ title: "Please fill in subject and content", variant: "destructive" });
      return;
    }
    sendBulkEmailMutation.mutate({
      subject: emailSubject,
      content: emailContent,
      subscriberIds: selectedIds.length > 0 ? selectedIds : undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{subscribers?.length || 0}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-green-600">{activeSubscribers.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unsubscribed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-500" />
              <span className="text-2xl font-bold text-red-600">{inactiveSubscribers.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>

        <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Send className="w-4 h-4 mr-2" />
              {selectedIds.length > 0 ? `Send to ${selectedIds.length} Selected` : "Send to All Active"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Newsletter</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="text-sm text-muted-foreground">
                Sending to: {selectedIds.length > 0 ? `${selectedIds.length} selected subscribers` : `All ${activeSubscribers.length} active subscribers`}
              </div>
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content (HTML supported)</label>
                <Textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  placeholder="Enter email content... (HTML tags supported)"
                  className="mt-1 min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleSendEmail} 
                disabled={sendBulkEmailMutation.isPending}
              >
                {sendBulkEmailMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Newsletter
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {selectedIds.length > 0 && (
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => bulkDeleteMutation.mutate(selectedIds)}
            disabled={bulkDeleteMutation.isPending}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete {selectedIds.length} Selected
          </Button>
        )}
      </div>

      {/* Subscribers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
          <CardDescription>Manage your newsletter subscribers</CardDescription>
        </CardHeader>
        <CardContent>
          {subscribers && subscribers.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedIds.length === activeSubscribers.length && activeSubscribers.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscribed</TableHead>
                    <TableHead>Unsubscribed</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(subscriber.id)}
                          onCheckedChange={(checked) => handleSelectOne(subscriber.id, !!checked)}
                          disabled={!subscriber.is_active}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>
                        <Badge variant={subscriber.is_active ? "default" : "secondary"}>
                          {subscriber.is_active ? "Active" : "Unsubscribed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(subscriber.subscribed_at), "MMM d, yyyy HH:mm")}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {subscriber.unsubscribed_at 
                          ? format(new Date(subscriber.unsubscribed_at), "MMM d, yyyy HH:mm")
                          : "-"
                        }
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMutation.mutate(subscriber.id)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No subscribers yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
