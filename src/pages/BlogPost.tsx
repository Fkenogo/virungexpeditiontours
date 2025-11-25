import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
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

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <Link to="/blog">
            <Button>Read More Articles</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
