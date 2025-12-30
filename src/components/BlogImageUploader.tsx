import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, ImageIcon, Link as LinkIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BlogImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  userId: string;
}

export function BlogImageUploader({ value, onChange, userId }: BlogImageUploaderProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG, PNG, GIF, WebP)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      onChange(publicUrlData.publicUrl);
      setUrlInput(publicUrlData.publicUrl);
      
      toast({
        title: "Image uploaded",
        description: "Your cover image has been uploaded successfully.",
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlChange = (url: string) => {
    setUrlInput(url);
    onChange(url);
  };

  const clearImage = () => {
    onChange("");
    setUrlInput("");
  };

  return (
    <div className="space-y-3">
      <Label>Cover Image</Label>
      
      {value && (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img
            src={value}
            alt="Blog cover preview"
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {!value && (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="url" className="gap-2">
              <LinkIcon className="w-4 h-4" />
              URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-3">
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload an image
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, GIF, WebP • Max 5MB
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-3">
            <Input
              value={urlInput}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Paste a direct link to an image
            </p>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
