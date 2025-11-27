import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedArticlesProps {
  currentPostId: string;
  currentCategory: string;
}

export default function RelatedArticles({ currentPostId, currentCategory }: RelatedArticlesProps) {
  const { data: relatedPosts, isLoading } = useQuery({
    queryKey: ['related-posts', currentPostId, currentCategory],
    queryFn: async () => {
      // First, try to get posts from the same category
      const { data: sameCategoryPosts, error: categoryError } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category, featured_image, content, published_at')
        .eq('category', currentCategory)
        .neq('id', currentPostId)
        .not('published_at', 'is', null)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(3);

      if (categoryError) throw categoryError;

      // If we have enough posts from the same category, return them
      if (sameCategoryPosts && sameCategoryPosts.length >= 3) {
        return sameCategoryPosts;
      }

      // Otherwise, supplement with recent posts from other categories
      const { data: recentPosts, error: recentError } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category, featured_image, content, published_at')
        .neq('id', currentPostId)
        .not('published_at', 'is', null)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(3);

      if (recentError) throw recentError;

      return recentPosts || [];
    },
  });

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  if (isLoading) {
    return (
      <div className="mt-16 mb-12">
        <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="w-full h-48" />
              <CardHeader>
                <Skeleton className="h-6 w-20 mb-2" />
                <Skeleton className="h-6 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!relatedPosts || relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 mb-12">
      <h2 className="text-3xl font-bold mb-8 text-foreground">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`}>
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              {post.featured_image && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="line-clamp-2 text-xl hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2 mb-4">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{calculateReadTime(post.content)} min read</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

