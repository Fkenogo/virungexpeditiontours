import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

const CATEGORIES = [
  'Travel Tips',
  'Wildlife Facts',
  'Visitor Stories',
  'Conservation',
  'Rwanda Culture',
];

export default function BlogPosts() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (formData: any) => {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const { data: user } = await supabase.auth.getUser();
      
      const { error } = await supabase.from('blog_posts').insert({
        ...formData,
        slug,
        author_id: user.user?.id,
        published_at: formData.published ? new Date().toISOString() : null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('Blog post created successfully');
      setIsOpen(false);
      setContent('');
    },
    onError: () => {
      toast.error('Failed to create blog post');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...formData }: any) => {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          ...formData,
          published_at: formData.published ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('Blog post updated successfully');
      setIsOpen(false);
      setEditingPost(null);
      setContent('');
    },
    onError: () => {
      toast.error('Failed to update blog post');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('Blog post deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete blog post');
    },
  });

  const handleOpenDialog = (post?: any) => {
    if (post) {
      setEditingPost(post);
      setContent(post.content || '');
    } else {
      setEditingPost(null);
      setContent('');
    }
    setIsOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      excerpt: formData.get('excerpt') as string,
      content: content,
      category: formData.get('category') as string,
      featured_image: formData.get('featured_image') as string,
      meta_title: formData.get('meta_title') as string,
      meta_description: formData.get('meta_description') as string,
      published: formData.get('published') === 'true',
    };

    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Calculate reading time
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
                  <Input
                    id="title"
                    name="title"
                    required
                    defaultValue={editingPost?.title}
                  />
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
                <p className="text-xs text-muted-foreground mt-1">
                  {content && `${getReadingTime(content)}`}
                </p>
              </div>

              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  name="featured_image"
                  type="url"
                  defaultValue={editingPost?.featured_image}
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
                    defaultValue={editingPost?.meta_title}
                    placeholder="Optional SEO title"
                  />
                </div>

                <div>
                  <Label htmlFor="published">Status</Label>
                  <Select name="published" defaultValue={editingPost?.published_at ? 'true' : 'false'}>
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
                  defaultValue={editingPost?.meta_description}
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

      {isLoading ? (
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
            {posts?.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-[300px] truncate">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  {post.published_at ? (
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
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this post?')) {
                          deleteMutation.mutate(post.id);
                        }
                      }}
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
