import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import RelatedArticles from '@/components/RelatedArticles';
import BlogBreadcrumb from '@/components/Breadcrumb';
import TableOfContents from '@/components/TableOfContents';
import SocialShare from '@/components/SocialShare';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (post) {
      document.title = post.meta_title || post.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && post.meta_description) {
        metaDescription.setAttribute('content', post.meta_description);
      }
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentUrl = window.location.href;

  return (
    <article className="min-h-screen bg-background">
      {post.featured_image && (
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <BlogBreadcrumb
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.category, href: `/blog?category=${encodeURIComponent(post.category)}` },
              { label: post.title },
            ]}
          />

          <Link to="/blog">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.published_at), 'MMMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6">{post.title}</h1>

          <SocialShare url={currentUrl} title={post.title} />
        </div>

        <div className="max-w-7xl mx-auto mt-12">
          <div className="grid lg:grid-cols-[1fr,300px] gap-12">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:my-4 prose-ul:space-y-2 prose-ol:my-4 prose-ol:space-y-2 prose-li:text-foreground/90 prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-hr:my-8 prose-hr:border-border prose-table:my-6 prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-td:px-4 prose-td:py-2 prose-td:border-border prose-img:rounded-lg prose-img:shadow-md">
              <ReactMarkdown
                components={{
                  h2: ({ children, ...props }) => {
                    const id = `heading-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`;
                    return <h2 id={id} className="scroll-mt-20" {...props}>{children}</h2>;
                  },
                  h3: ({ children, ...props }) => {
                    const id = `heading-${children?.toString().toLowerCase().replace(/\s+/g, '-')}`;
                    return <h3 id={id} className="scroll-mt-20" {...props}>{children}</h3>;
                  },
                  p: ({ children, ...props }) => (
                    <p className="mb-4" {...props}>{children}</p>
                  ),
                  ul: ({ children, ...props }) => (
                    <ul className="list-disc pl-6 space-y-2 mb-4" {...props}>{children}</ul>
                  ),
                  ol: ({ children, ...props }) => (
                    <ol className="list-decimal pl-6 space-y-2 mb-4" {...props}>{children}</ol>
                  ),
                  li: ({ children, ...props }) => (
                    <li className="leading-relaxed" {...props}>{children}</li>
                  ),
                  blockquote: ({ children, ...props }) => (
                    <blockquote className="border-l-4 border-primary/50 bg-muted/30 py-3 px-4 my-6 rounded-r-md" {...props}>{children}</blockquote>
                  ),
                  table: ({ children, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border border-border rounded-lg overflow-hidden" {...props}>{children}</table>
                    </div>
                  ),
                  th: ({ children, ...props }) => (
                    <th className="bg-muted px-4 py-3 text-left font-semibold border-b border-border" {...props}>{children}</th>
                  ),
                  td: ({ children, ...props }) => (
                    <td className="px-4 py-3 border-b border-border" {...props}>{children}</td>
                  ),
                  hr: () => <hr className="my-8 border-border" />,
                  a: ({ children, href, ...props }) => (
                    <a href={href} className="text-primary hover:underline font-medium" {...props}>{children}</a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <aside>
              <TableOfContents content={post.content} />
            </aside>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <SocialShare url={currentUrl} title={post.title} />

          <RelatedArticles currentPostId={post.id} currentCategory={post.category} />

          <div className="mt-12 pt-8 border-t">
            <Link to="/blog">
              <Button>Read More Articles</Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
