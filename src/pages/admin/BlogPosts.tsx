import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import MarkdownEditor from '@/components/admin/MarkdownEditor';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

const CATEGORIES = [
  'Travel Tips',
  'Wildlife Facts',
  'Visitor Stories',
  'Conservation',
  'Rwanda Culture',
];

const normalizeDate = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    const parsed = value.toDate() as Date;
    return parsed.toISOString();
  }
  return new Date().toISOString();
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [content, setContent] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsQuery = query(collection(db, 'blog_posts'), orderBy('created_at', 'desc'));
      const snapshot = await getDocs(postsQuery);
      const data = snapshot.docs.map((docSnapshot) => {
        const row = docSnapshot.data() as Omit<BlogPost, 'id' | 'created_at' | 'published_at'> & {
          created_at?: unknown;
          published_at?: unknown;
        };

        return {
          id: docSnapshot.id,
          title: row.title,
          slug: row.slug,
          excerpt: row.excerpt,
          content: row.content,
          category: row.category,
          featured_image: row.featured_image || null,
          meta_title: row.meta_title || null,
          meta_description: row.meta_description || null,
          published: Boolean(row.published || row.published_at),
          published_at: row.published_at ? normalizeDate(row.published_at) : null,
          created_at: normalizeDate(row.created_at),
        };
      });
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setContent(post.content || '');
    } else {
      setEditingPost(null);
      setContent('');
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = String(formData.get('title') || '');
    const published = formData.get('published') === 'true';

    const payload = {
      title,
      slug: slugify(title),
      excerpt: String(formData.get('excerpt') || ''),
      content,
      category: String(formData.get('category') || CATEGORIES[0]),
      featured_image: String(formData.get('featured_image') || '') || null,
      meta_title: String(formData.get('meta_title') || '') || null,
      meta_description: String(formData.get('meta_description') || '') || null,
      published,
      published_at: published
        ? (editingPost?.published_at ?? new Date().toISOString())
        : (editingPost?.published_at ?? null),
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingPost) {
        await updateDoc(doc(db, 'blog_posts', editingPost.id), payload);
        toast.success('Blog post updated successfully');
      } else {
        await addDoc(collection(db, 'blog_posts'), {
          ...payload,
          author_id: user?.uid || null,
          created_at: new Date().toISOString(),
        });
        toast.success('Blog post created successfully');
      }

      setIsOpen(false);
      setEditingPost(null);
      setContent('');
      await fetchPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Failed to save blog post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await deleteDoc(doc(db, 'blog_posts', id));
      toast.success('Blog post deleted successfully');
      await fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };

  const getReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" required defaultValue={editingPost?.title} />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select name="category" defaultValue={editingPost?.category || CATEGORIES[0]}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt (Brief summary for blog list)</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  required
                  defaultValue={editingPost?.excerpt}
                  rows={2}
                  placeholder="A brief summary that appears on the blog listing page..."
                />
              </div>

              <div>
                <Label htmlFor="content">Content (Markdown supported)</Label>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  name="content"
                  placeholder="Write your blog post content here. Use the toolbar for formatting..."
                />
                <p className="text-xs text-muted-foreground mt-1">{content && `${getReadingTime(content)}`}</p>
              </div>

              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  name="featured_image"
                  type="url"
                  defaultValue={editingPost?.featured_image || ''}
                  placeholder="/images/blog/your-image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use paths like /images/blog/image-name.jpg for local images
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                  <Input
                    id="meta_title"
                    name="meta_title"
                    defaultValue={editingPost?.meta_title || ''}
                    placeholder="Optional SEO title"
                  />
                </div>

                <div>
                  <Label htmlFor="published">Status</Label>
                  <Select name="published" defaultValue={editingPost?.published ? 'true' : 'false'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Draft</SelectItem>
                      <SelectItem value="true">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                <Textarea
                  id="meta_description"
                  name="meta_description"
                  defaultValue={editingPost?.meta_description || ''}
                  rows={2}
                  placeholder="Optional SEO description (max 160 characters)"
                />
              </div>

              <Button type="submit" className="w-full">
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-[300px] truncate">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  {post.published ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                      Draft
                    </span>
                  )}
                </TableCell>
                <TableCell>{format(new Date(post.created_at), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleOpenDialog(post)}
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
