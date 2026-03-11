import { useEffect, useMemo, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, Pencil, Plus, Trash2, Route } from 'lucide-react';

type Itinerary = {
  id: string;
  title: string;
  duration: string;
  destinations: string;
  category: string;
  popular: boolean;
  family: boolean;
  highlights: string[];
  summary: string;
  days: string[];
  idealFor: string;
  image_key: 'hero-gorilla' | 'akagera-safari' | 'chimpanzees';
  image_url: string | null;
  display_order: number;
  is_active: boolean;
};

const FILTER_CATEGORIES = [
  'all',
  '3-day',
  '5-day',
  '7-day',
  '10-day',
  'multi-country',
  'family',
];

const IMAGE_KEYS: Array<Itinerary['image_key']> = ['hero-gorilla', 'akagera-safari', 'chimpanzees'];

const DEFAULT_FORM = {
  id: '',
  title: '',
  duration: '',
  destinations: '',
  category: '3-day',
  popular: false,
  family: false,
  highlights: '',
  summary: '',
  days: '',
  idealFor: '',
  image_key: 'hero-gorilla' as Itinerary['image_key'],
  image_url: '',
  display_order: 0,
  is_active: true,
};

const normalizeItinerary = (id: string, raw: Record<string, unknown>): Itinerary => ({
  id,
  title: String(raw.title || ''),
  duration: String(raw.duration || ''),
  destinations: String(raw.destinations || ''),
  category: String(raw.category || '3-day'),
  popular: Boolean(raw.popular),
  family: Boolean(raw.family),
  highlights: Array.isArray(raw.highlights) ? raw.highlights.map((item) => String(item)) : [],
  summary: String(raw.summary || ''),
  days: Array.isArray(raw.days) ? raw.days.map((item) => String(item)) : [],
  idealFor: String(raw.idealFor || ''),
  image_key: (raw.image_key as Itinerary['image_key']) || 'hero-gorilla',
  image_url: raw.image_url ? String(raw.image_url) : null,
  display_order: Number(raw.display_order || 0),
  is_active: raw.is_active === undefined ? true : Boolean(raw.is_active),
});

export default function ItinerariesManagement() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Itinerary | null>(null);
  const [form, setForm] = useState(DEFAULT_FORM);

  useEffect(() => {
    fetchItineraries();
  }, []);

  const filteredItems = useMemo(() => {
    if (filterCategory === 'all') return itineraries;
    if (filterCategory === 'family') return itineraries.filter((item) => item.family);
    return itineraries.filter((item) => item.category === filterCategory);
  }, [filterCategory, itineraries]);

  const fetchItineraries = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'itineraries'));
      const data = snapshot.docs
        .map((docSnapshot) => normalizeItinerary(docSnapshot.id, docSnapshot.data() as Record<string, unknown>))
        .sort((a, b) => a.display_order - b.display_order);
      setItineraries(data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
      toast.error('Failed to load itineraries');
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setForm(DEFAULT_FORM);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: Itinerary) => {
    setEditingItem(item);
    setForm({
      id: item.id,
      title: item.title,
      duration: item.duration,
      destinations: item.destinations,
      category: item.category,
      popular: item.popular,
      family: item.family,
      highlights: item.highlights.join('\n'),
      summary: item.summary,
      days: item.days.join('\n'),
      idealFor: item.idealFor,
      image_key: item.image_key,
      image_url: item.image_url || '',
      display_order: item.display_order,
      is_active: item.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title: form.title.trim(),
      duration: form.duration.trim(),
      destinations: form.destinations.trim(),
      category: form.category,
      popular: form.popular,
      family: form.family,
      highlights: form.highlights.split('\n').map((line) => line.trim()).filter(Boolean),
      summary: form.summary.trim(),
      days: form.days.split('\n').map((line) => line.trim()).filter(Boolean),
      idealFor: form.idealFor.trim(),
      image_key: form.image_key,
      image_url: form.image_url.trim() || null,
      display_order: Number(form.display_order || 0),
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    };

    if (!payload.title || !payload.duration || !payload.destinations || !payload.summary) {
      toast.error('Please fill title, duration, destinations, and summary');
      return;
    }

    try {
      if (editingItem) {
        await setDoc(doc(db, 'itineraries', editingItem.id), payload, { merge: true });
        toast.success('Itinerary updated');
      } else {
        const requestedId = form.id.trim();
        if (requestedId) {
          await setDoc(doc(db, 'itineraries', requestedId), {
            ...payload,
            created_at: new Date().toISOString(),
          });
        } else {
          await addDoc(collection(db, 'itineraries'), {
            ...payload,
            created_at: new Date().toISOString(),
          });
        }
        toast.success('Itinerary created');
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      setForm(DEFAULT_FORM);
      await fetchItineraries();
    } catch (error) {
      console.error('Error saving itinerary:', error);
      toast.error('Failed to save itinerary');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this itinerary?')) return;

    try {
      await deleteDoc(doc(db, 'itineraries', id));
      toast.success('Itinerary deleted');
      await fetchItineraries();
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      toast.error('Failed to delete itinerary');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Itineraries Management</h1>
          <p className="text-muted-foreground">Manage public safari itineraries and package details</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              {FILTER_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Itinerary
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Itinerary' : 'Create Itinerary'}</DialogTitle>
                <DialogDescription>Use one line per highlight/day.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <Label>ID (optional for new)</Label>
                    <Input value={form.id} onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))} disabled={Boolean(editingItem)} />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input value={form.duration} onChange={(e) => setForm((p) => ({ ...p, duration: e.target.value }))} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <Label>Destinations</Label>
                    <Input value={form.destinations} onChange={(e) => setForm((p) => ({ ...p, destinations: e.target.value }))} required />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select value={form.category} onValueChange={(value) => setForm((p) => ({ ...p, category: value }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {FILTER_CATEGORIES.filter((v) => v !== 'all' && v !== 'family').map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Display Order</Label>
                    <Input type="number" value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: Number(e.target.value) }))} />
                  </div>
                </div>

                <div>
                  <Label>Summary</Label>
                  <Textarea rows={3} value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} required />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label>Highlights (one per line)</Label>
                    <Textarea rows={8} value={form.highlights} onChange={(e) => setForm((p) => ({ ...p, highlights: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Day Plan (one per line)</Label>
                    <Textarea rows={8} value={form.days} onChange={(e) => setForm((p) => ({ ...p, days: e.target.value }))} />
                  </div>
                </div>

                <div>
                  <Label>Ideal For</Label>
                  <Textarea rows={2} value={form.idealFor} onChange={(e) => setForm((p) => ({ ...p, idealFor: e.target.value }))} />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label>Image Key</Label>
                    <Select value={form.image_key} onValueChange={(value) => setForm((p) => ({ ...p, image_key: value as Itinerary['image_key'] }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {IMAGE_KEYS.map((key) => <SelectItem key={key} value={key}>{key}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Image URL (optional, overrides key)</Label>
                    <Input value={form.image_url} onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))} placeholder="https://..." />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <Switch checked={form.popular} onCheckedChange={(checked) => setForm((p) => ({ ...p, popular: checked }))} />
                    Popular
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Switch checked={form.family} onCheckedChange={(checked) => setForm((p) => ({ ...p, family: checked }))} />
                    Family Friendly
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Switch checked={form.is_active} onCheckedChange={(checked) => setForm((p) => ({ ...p, is_active: checked }))} />
                    Active
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingItem ? 'Update' : 'Create'} Itinerary</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{filteredItems.length} Itinerar{filteredItems.length === 1 ? 'y' : 'ies'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.display_order}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="space-x-1">
                    {item.popular && <Badge>Popular</Badge>}
                    {item.family && <Badge variant="secondary">Family</Badge>}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.is_active ? 'default' : 'outline'}>
                      {item.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => openEditDialog(item)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">No itineraries found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
