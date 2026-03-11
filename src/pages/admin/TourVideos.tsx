import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Video } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface TourVideo {
  id: string;
  tour_name: string;
  video_url: string;
  video_type: 'preview' | 'testimonial';
  title: string;
  description: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const TOUR_OPTIONS = [
  'Mountain Gorilla Trekking',
  'Golden Monkey Tracking',
  'Chimpanzee Trekking',
  'Colobus Monkey Tracking',
  'Canopy Walkway',
  'Dian Fossey Tomb Hike',
  'Akagera Safari',
  'Kigali City Tour',
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

export default function TourVideos() {
  const { toast } = useToast();
  const [videos, setVideos] = useState<TourVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingVideo, setEditingVideo] = useState<TourVideo | null>(null);
  const [formData, setFormData] = useState({
    tour_name: '',
    video_url: '',
    video_type: 'preview' as 'preview' | 'testimonial',
    title: '',
    description: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'tour_videos'));
      const data = snapshot.docs
        .map((docSnapshot) => {
          const row = docSnapshot.data() as Omit<TourVideo, 'id' | 'created_at'> & { created_at?: unknown };
          return {
            id: docSnapshot.id,
            tour_name: row.tour_name,
            video_url: row.video_url,
            video_type: row.video_type,
            title: row.title,
            description: row.description || null,
            display_order: Number(row.display_order || 0),
            is_active: Boolean(row.is_active),
            created_at: normalizeDate(row.created_at),
          };
        })
        .sort((a, b) => {
          const tourSort = a.tour_name.localeCompare(b.tour_name);
          if (tourSort !== 0) return tourSort;
          return a.display_order - b.display_order;
        });

      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch videos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingVideo) {
        await updateDoc(doc(db, 'tour_videos', editingVideo.id), {
          ...formData,
          description: formData.description || null,
          updated_at: new Date().toISOString(),
        });

        toast({
          title: 'Success',
          description: 'Video updated successfully',
        });
      } else {
        await addDoc(collection(db, 'tour_videos'), {
          ...formData,
          description: formData.description || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        toast({
          title: 'Success',
          description: 'Video added successfully',
        });
      }

      setShowDialog(false);
      setEditingVideo(null);
      resetForm();
      await fetchVideos();
    } catch (error) {
      console.error('Error saving video:', error);
      toast({
        title: 'Error',
        description: 'Failed to save video',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      await deleteDoc(doc(db, 'tour_videos', id));
      toast({
        title: 'Success',
        description: 'Video deleted successfully',
      });
      await fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete video',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (video: TourVideo) => {
    setEditingVideo(video);
    setFormData({
      tour_name: video.tour_name,
      video_url: video.video_url,
      video_type: video.video_type,
      title: video.title,
      description: video.description || '',
      display_order: video.display_order,
      is_active: video.is_active,
    });
    setShowDialog(true);
  };

  const resetForm = () => {
    setFormData({
      tour_name: '',
      video_url: '',
      video_type: 'preview',
      title: '',
      description: '',
      display_order: 0,
      is_active: true,
    });
  };

  const openNewDialog = () => {
    setEditingVideo(null);
    resetForm();
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tour Videos</h1>
          <p className="text-muted-foreground">Manage tour preview videos and testimonials</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Video
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Videos</CardTitle>
          <CardDescription>Manage videos displayed on tour pages</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading videos...</p>
          ) : videos.length === 0 ? (
            <p className="text-muted-foreground">No videos added yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">{video.tour_name}</TableCell>
                    <TableCell>
                      <Badge variant={video.video_type === 'preview' ? 'default' : 'secondary'}>
                        {video.video_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{video.title}</TableCell>
                    <TableCell>{video.display_order}</TableCell>
                    <TableCell>
                      <Badge variant={video.is_active ? 'default' : 'outline'}>
                        {video.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(video)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(video.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</DialogTitle>
            <DialogDescription>Add YouTube or Vimeo video URLs to display on tour pages</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tour_name">Tour Name *</Label>
              <Select
                value={formData.tour_name}
                onValueChange={(value) => setFormData({ ...formData, tour_name: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tour" />
                </SelectTrigger>
                <SelectContent>
                  {TOUR_OPTIONS.map((tour) => (
                    <SelectItem key={tour} value={tour}>
                      {tour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_type">Video Type *</Label>
              <Select
                value={formData.video_type}
                onValueChange={(value: 'preview' | 'testimonial') =>
                  setFormData({ ...formData, video_type: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preview">Tour Preview</SelectItem>
                  <SelectItem value="testimonial">Customer Testimonial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL *</Label>
              <Input
                id="video_url"
                placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Experience the Mountain Gorillas"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description or testimonial text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                min="0"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active (visible on website)</Label>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <Video className="mr-2 h-4 w-4" />
                {editingVideo ? 'Update Video' : 'Add Video'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
