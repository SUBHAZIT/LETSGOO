import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Eye,
  Edit
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  minHeight?: string;
  required?: boolean;
}

export function RichTextEditor({ 
  value, 
  onChange, 
  label = "Content",
  placeholder = "Write your content here... (Markdown supported)",
  minHeight = "300px",
  required = false
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("write");

  const insertMarkdown = (prefix: string, suffix: string = "", placeholder: string = "") => {
    const textarea = document.querySelector<HTMLTextAreaElement>("#markdown-editor");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newText = value.substring(0, start) + prefix + textToInsert + suffix + value.substring(end);
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, label: "Bold", action: () => insertMarkdown("**", "**", "bold text") },
    { icon: Italic, label: "Italic", action: () => insertMarkdown("*", "*", "italic text") },
    { icon: Heading1, label: "Heading 1", action: () => insertMarkdown("\n# ", "\n", "Heading 1") },
    { icon: Heading2, label: "Heading 2", action: () => insertMarkdown("\n## ", "\n", "Heading 2") },
    { icon: Heading3, label: "Heading 3", action: () => insertMarkdown("\n### ", "\n", "Heading 3") },
    { icon: List, label: "Bullet List", action: () => insertMarkdown("\n- ", "\n", "list item") },
    { icon: ListOrdered, label: "Numbered List", action: () => insertMarkdown("\n1. ", "\n", "list item") },
    { icon: Quote, label: "Quote", action: () => insertMarkdown("\n> ", "\n", "quote") },
    { icon: LinkIcon, label: "Link", action: () => insertMarkdown("[", "](url)", "link text") },
    { icon: ImageIcon, label: "Image", action: () => insertMarkdown("![", "](image-url)", "alt text") },
    { icon: Code, label: "Code", action: () => insertMarkdown("`", "`", "code") },
  ];

  return (
    <div className="space-y-2">
      {label && <Label>{label} {required && "*"}</Label>}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between gap-2 mb-2">
          <TabsList className="grid grid-cols-2 w-auto">
            <TabsTrigger value="write" className="gap-2">
              <Edit className="w-4 h-4" />
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="mt-0">
          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 p-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
            {toolbarButtons.map((btn, idx) => (
              <Button
                key={idx}
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={btn.action}
                title={btn.label}
              >
                <btn.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>
          
          <Textarea
            id="markdown-editor"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="rounded-t-none border-t-0 font-mono text-sm"
            style={{ minHeight }}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Supports Markdown formatting. Use the toolbar or write Markdown directly.
          </p>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div 
            className="border border-border rounded-lg p-4 prose prose-sm dark:prose-invert max-w-none overflow-auto bg-card"
            style={{ minHeight }}
          >
            {value ? (
              <ReactMarkdown>{value}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground italic">Nothing to preview yet...</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
