import ReactMarkdown from 'react-markdown';

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content) {
    return (
      <div className="text-muted-foreground italic p-4">
        Start typing to see preview...
      </div>
    );
  }

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert p-4 prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-blockquote:text-muted-foreground prose-a:text-primary">
      <ReactMarkdown
        components={{
          h2: ({ children, ...props }) => (
            <h2 className="text-xl font-bold mt-4 mb-2 text-foreground" {...props}>{children}</h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-lg font-semibold mt-3 mb-2 text-foreground" {...props}>{children}</h3>
          ),
          p: ({ children, ...props }) => (
            <p className="mb-3 leading-relaxed" {...props}>{children}</p>
          ),
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 mb-3 space-y-1" {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 mb-3 space-y-1" {...props}>{children}</ol>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4" {...props}>{children}</blockquote>
          ),
          a: ({ children, ...props }) => (
            <a className="text-primary underline hover:no-underline" {...props}>{children}</a>
          ),
          hr: () => <hr className="my-6 border-border" />,
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-border" {...props}>{children}</table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-3 py-2 bg-muted font-semibold text-left" {...props}>{children}</th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-3 py-2" {...props}>{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
