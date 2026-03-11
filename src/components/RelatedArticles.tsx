import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featured_image: string | null;
  content: string;
  published: boolean;
  published_at: string | null;
};

interface RelatedArticlesProps {
  currentPostId: string;
  currentCategory: string;
}

const normalizeDate = (value: unknown): string | null => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    const parsed = value.toDate() as Date;
    return parsed.toISOString();
  }
  return null;
};

export default function RelatedArticles({ currentPostId, currentCategory }: RelatedArticlesProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRelatedPosts();
  }, [currentPostId, currentCategory]);

  const fetchRelatedPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, 'blog_posts'),
        where('published', '==', true),
        orderBy('published_at', 'desc'),
        limit(20),
      );
      const snapshot = await getDocs(postsQuery);
      const now = Date.now();
      const allPublished = snapshot.docs
        .map((docSnapshot) => {
          const row = docSnapshot.data() as Omit<BlogPost, 'id' | 'published_at'> & { published_at?: unknown };
          return {
            id: docSnapshot.id,
            title: row.title,
            slug: row.slug,
            excerpt: row.excerpt,
            category: row.category,
            featured_image: row.featured_image || null,
            content: row.content || '',
            published: Boolean(row.published || row.published_at),
            published_at: normalizeDate(row.published_at),
          };
        })
        .filter((post) => post.id !== currentPostId)
        .filter((post) => post.published_at && new Date(post.published_at).getTime() <= now);

      const sameCategory = allPublished.filter((post) => post.category === currentCategory).slice(0, 3);
      const combined =
        sameCategory.length >= 3
          ? sameCategory
          : [
              ...sameCategory,
              ...allPublished.filter((post) => post.category !== currentCategory).slice(0, 3 - sameCategory.length),
            ];

      setRelatedPosts(combined);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      setRelatedPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

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

  if (!relatedPosts.length) {
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
                <CardTitle className="line-clamp-2 text-xl hover:text-primary transition-colors">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2 mb-4">{post.excerpt}</CardDescription>
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
