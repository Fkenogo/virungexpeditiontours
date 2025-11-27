import { useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarkdownToolbar from './MarkdownToolbar';
import MarkdownPreview from './MarkdownPreview';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
  className?: string;
}

export default function MarkdownEditor({
  value,
  onChange,
  name,
  placeholder = 'Write your content in Markdown...',
  className,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeTab, setActiveTab] = useState<string>('write');

  const handleInsert = (prefix: string, suffix: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    const newText = 
      value.substring(0, start) + 
      prefix + 
      textToInsert + 
      suffix + 
      value.substring(end);
    
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + textToInsert.length + suffix.length;
      textarea.setSelectionRange(
        selectedText ? newCursorPos : start + prefix.length,
        selectedText ? newCursorPos : start + prefix.length + placeholder.length
      );
    }, 0);
  };

  const insertTemplate = (template: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText = value.substring(0, start) + template + value.substring(start);
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + template.length, start + template.length);
    }, 0);
  };

  return (
    <div className={cn('border rounded-md', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b px-2">
          <TabsList className="bg-transparent h-10">
            <TabsTrigger value="write" className="data-[state=active]:bg-muted">
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-muted">
              Preview
            </TabsTrigger>
          </TabsList>
          
          {/* Quick Templates */}
          <div className="flex gap-1 text-xs">
            <button
              type="button"
              className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded"
              onClick={() => insertTemplate('\n## Key Takeaways\n\n- Point 1\n- Point 2\n- Point 3\n')}
            >
              + Takeaways
            </button>
            <button
              type="button"
              className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded"
              onClick={() => insertTemplate('\n> **Pro Tip:** Your tip here\n')}
            >
              + Tip
            </button>
            <button
              type="button"
              className="px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded"
              onClick={() => insertTemplate('\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Data 1   | Data 2   | Data 3   |\n')}
            >
              + Table
            </button>
          </div>
        </div>

        <TabsContent value="write" className="m-0">
          <MarkdownToolbar onInsert={handleInsert} />
          <Textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[400px] border-0 rounded-none rounded-b-md focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm resize-y"
          />
        </TabsContent>

        <TabsContent value="preview" className="m-0 min-h-[460px] overflow-auto bg-background">
          <MarkdownPreview content={value} />
        </TabsContent>
      </Tabs>
      
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
