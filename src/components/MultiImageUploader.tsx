import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, ImageIcon, Link as LinkIcon, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MultiImageUploaderProps {
  values: string[];
  onChange: (urls: string[]) => void;
  userId?: string;
  maxImages?: number;
  label?: string;
  bucketName?: string;
}

export function MultiImageUploader({ 
  values, 
  onChange, 
  userId,
  maxImages = 5,
  label = "Images",
  bucketName = "blog-images"
}: MultiImageUploaderProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - values.length;
    if (remainingSlots <= 0) {
      toast({
        title: "Maximum images reached",
        description: `You can only add up to ${maxImages} images`,
        variant: "destructive",
      });
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    
    // Validate files
    for (const file of filesToUpload) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload image files only (JPG, PNG, GIF, WebP)",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload images smaller than 5MB each",
          variant: "destructive",
        });
        return;
      }
    }

    setUploading(true);

    try {
      const uploadedUrls: string[] = [];
      
      for (const file of filesToUpload) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${userId || 'shared'}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      onChange([...values, ...uploadedUrls]);
      
      toast({
        title: "Images uploaded",
        description: `${uploadedUrls.length} image(s) uploaded successfully.`,
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const addUrlImage = () => {
    if (!urlInput.trim()) return;
    
    if (values.length >= maxImages) {
      toast({
        title: "Maximum images reached",
        description: `You can only add up to ${maxImages} images`,
        variant: "destructive",
      });
      return;
    }

    onChange([...values, urlInput.trim()]);
    setUrlInput("");
    toast({
      title: "Image added",
      description: "Image URL added successfully.",
    });
  };

  const removeImage = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  const setAsPrimary = (index: number) => {
    if (index === 0) return;
    const newValues = [...values];
    const [removed] = newValues.splice(index, 1);
    newValues.unshift(removed);
    onChange(newValues);
    toast({
      title: "Primary image set",
      description: "The selected image is now the primary image.",
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>{label} ({values.length}/{maxImages})</Label>
      </div>

      {/* Image Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {values.map((url, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden border border-border">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-24 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {index !== 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => setAsPrimary(index)}
                  >
                    Primary
                  </Button>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => removeImage(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              {index === 0 && (
                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Section */}
      {values.length < maxImages && (
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
              className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
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
                    Click to upload images
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG, GIF, WebP • Max 5MB each • Up to {maxImages - values.length} more
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-3">
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1"
              />
              <Button type="button" onClick={addUrlImage} disabled={!urlInput.trim()}>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Paste a direct link to an image
            </p>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
