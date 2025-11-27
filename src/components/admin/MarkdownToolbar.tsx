import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
  Quote,
  Minus,
  Image,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MarkdownToolbarProps {
  onInsert: (prefix: string, suffix?: string, placeholder?: string) => void;
}

export default function MarkdownToolbar({ onInsert }: MarkdownToolbarProps) {
  const tools = [
    { icon: Bold, label: 'Bold', prefix: '**', suffix: '**', placeholder: 'bold text' },
    { icon: Italic, label: 'Italic', prefix: '*', suffix: '*', placeholder: 'italic text' },
    { icon: Heading2, label: 'Heading 2', prefix: '## ', suffix: '', placeholder: 'Heading' },
    { icon: Heading3, label: 'Heading 3', prefix: '### ', suffix: '', placeholder: 'Subheading' },
    { icon: List, label: 'Bullet List', prefix: '- ', suffix: '', placeholder: 'List item' },
    { icon: ListOrdered, label: 'Numbered List', prefix: '1. ', suffix: '', placeholder: 'List item' },
    { icon: Link, label: 'Link', prefix: '[', suffix: '](url)', placeholder: 'link text' },
    { icon: Quote, label: 'Blockquote', prefix: '> ', suffix: '', placeholder: 'Quote' },
    { icon: Minus, label: 'Horizontal Rule', prefix: '\n---\n', suffix: '', placeholder: '' },
    { icon: Image, label: 'Image', prefix: '![', suffix: '](image-url)', placeholder: 'alt text' },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 p-2 bg-muted/50 border-b rounded-t-md">
        {tools.map((tool) => (
          <Tooltip key={tool.label}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onInsert(tool.prefix, tool.suffix, tool.placeholder)}
              >
                <tool.icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
