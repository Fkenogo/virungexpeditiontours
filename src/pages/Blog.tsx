import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar, Tag } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featured_image: string | null;
  published: boolean;
  published_at: string | null;
};

const CATEGORIES = [
  'All',
  'Travel Tips',
  'Wildlife Facts',
  'Visitor Stories',
  'Conservation',
  'Rwanda Culture',
];

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

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = CATEGORIES.includes(searchParams.get('category') || '') ? searchParams.get('category')! : 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'blog_posts'));
      const now = Date.now();

      const data = snapshot.docs
        .map((docSnapshot) => {
          const row = docSnapshot.data() as Omit<BlogPost, 'id' | 'published_at'> & { published_at?: unknown };
          return {
            id: docSnapshot.id,
            title: row.title,
            slug: row.slug,
            excerpt: row.excerpt,
            category: row.category,
            featured_image: row.featured_image || null,
            published: Boolean(row.published || row.published_at),
            published_at: normalizeDate(row.published_at),
          };
        })
        .filter((post) => post.published && post.published_at && new Date(post.published_at).getTime() <= now)
        .sort((a, b) => new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime());

      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Travel Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover Rwanda through our stories, tips, and wildlife insights
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No posts found in this category</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                <article className="h-full border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featured_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(post.published_at || Date.now()), 'MMM d, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
