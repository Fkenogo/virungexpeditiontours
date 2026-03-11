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
import { Plus, Pencil, Trash2, Star, MessageSquare } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Testimonial {
  id: string;
  customer_name: string;
  customer_location: string;
  tour_name: string;
  rating: number;
  testimonial_text: string;
  visit_date: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

const TOUR_NAMES = [
  'Mountain Gorilla Trekking',
  'Golden Monkey Tracking',
  'Chimpanzee Trekking',
  'Colobus Monkey Tracking',
  'Canopy Walkway',
  'Dian Fossey Tomb Hike',
  'Akagera Safari',
  'Kigali City Tour',
  'Multi-Day Safari',
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

export default function Testimonials() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_location: '',
    tour_name: '',
    rating: 5,
    testimonial_text: '',
    visit_date: '',
    is_featured: false,
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'testimonials'));
      const data = snapshot.docs
        .map((docSnapshot) => {
          const row = docSnapshot.data() as Omit<Testimonial, 'id' | 'created_at'> & { created_at?: unknown };
          return {
            id: docSnapshot.id,
            customer_name: row.customer_name,
            customer_location: row.customer_location,
            tour_name: row.tour_name,
            rating: Number(row.rating || 5),
            testimonial_text: row.testimonial_text,
            visit_date: row.visit_date || null,
            is_featured: Boolean(row.is_featured),
            is_active: Boolean(row.is_active),
            display_order: Number(row.display_order || 0),
            created_at: normalizeDate(row.created_at),
          };
        })
        .sort((a, b) => normalizeDate(b.created_at).localeCompare(normalizeDate(a.created_at)));

      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch testimonials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        visit_date: formData.visit_date || null,
        updated_at: new Date().toISOString(),
      };

      if (editingTestimonial) {
        await updateDoc(doc(db, 'testimonials', editingTestimonial.id), payload);

        toast({
          title: 'Success',
          description: 'Testimonial updated successfully',
        });
      } else {
        await addDoc(collection(db, 'testimonials'), {
          ...payload,
          created_at: new Date().toISOString(),
        });

        toast({
          title: 'Success',
          description: 'Testimonial added successfully',
        });
      }

      setShowDialog(false);
      setEditingTestimonial(null);
      resetForm();
      await fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to save testimonial',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      await deleteDoc(doc(db, 'testimonials', id));

      toast({
        title: 'Success',
        description: 'Testimonial deleted successfully',
      });
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete testimonial',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      customer_name: testimonial.customer_name,
      customer_location: testimonial.customer_location,
      tour_name: testimonial.tour_name,
      rating: testimonial.rating,
      testimonial_text: testimonial.testimonial_text,
      visit_date: testimonial.visit_date || '',
      is_featured: testimonial.is_featured,
      is_active: testimonial.is_active,
      display_order: testimonial.display_order,
    });
    setShowDialog(true);
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      customer_location: '',
      tour_name: '',
      rating: 5,
      testimonial_text: '',
      visit_date: '',
      is_featured: false,
      is_active: true,
      display_order: 0,
    });
  };

  const openNewDialog = () => {
    setEditingTestimonial(null);
    resetForm();
    setShowDialog(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Testimonials Management</h1>
          <p className="text-muted-foreground">Manage customer reviews and feedback</p>
        </div>
        <Button onClick={openNewDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Testimonials</CardTitle>
          <CardDescription>Manage testimonials displayed across the website</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="text-muted-foreground">No testimonials added yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Tour</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Testimonial</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{testimonial.customer_name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.customer_location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{testimonial.tour_name}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">{testimonial.testimonial_text}</p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={testimonial.is_active ? 'default' : 'outline'}>
                          {testimonial.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        {testimonial.is_featured && (
                          <Badge variant="secondary" className="ml-1">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(testimonial)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(testimonial.id)}>
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
            <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            <DialogDescription>Add or update customer testimonials and reviews</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer_name">Customer Name *</Label>
                <Input
                  id="customer_name"
                  placeholder="John Smith"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customer_location">Location *</Label>
                <Input
                  id="customer_location"
                  placeholder="New York, USA"
                  value={formData.customer_location}
                  onChange={(e) => setFormData({ ...formData, customer_location: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                    {TOUR_NAMES.map((tour) => (
                      <SelectItem key={tour} value={tour}>
                        {tour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating *</Label>
                <Select
                  value={String(formData.rating)}
                  onValueChange={(value) => setFormData({ ...formData, rating: Number(value) })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <SelectItem key={rating} value={String(rating)}>
                        {rating} Star{rating !== 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testimonial_text">Testimonial *</Label>
              <Textarea
                id="testimonial_text"
                placeholder="Share the customer's experience..."
                value={formData.testimonial_text}
                onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visit_date">Visit Date</Label>
                <Input
                  id="visit_date"
                  type="date"
                  value={formData.visit_date}
                  onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
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
            </div>

            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active (visible on website)</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                <MessageSquare className="mr-2 h-4 w-4" />
                {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
