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
  where,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

type TourAvailability = {
  id: string;
  tour_name: string;
  date: string;
  season_type: 'peak' | 'shoulder' | 'low';
  base_price: number;
  available_spots: number;
  is_available: boolean;
};

export default function AdminAvailability() {
  const [availability, setAvailability] = useState<TourAvailability[]>([]);
  const [tourNames, setTourNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<TourAvailability | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTourNames = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, 'tour_packages'), where('is_active', '==', true)),
        );
        const names = snapshot.docs.map((d) => String(d.data().title || '')).filter(Boolean);
        setTourNames(names);
      } catch {
        // keep empty — select will just have no options
      }
    };
    fetchTourNames();
  }, []);

  useEffect(() => {
    fetchAvailability();
  }, [selectedTour]);

  const fetchAvailability = async () => {
    try {
      let availabilityQuery = query(
        collection(db, 'tour_availability'),
        where('date', '>=', new Date().toISOString().split('T')[0]),
        orderBy('date', 'asc'),
      );

      if (selectedTour !== 'all') {
        availabilityQuery = query(
          collection(db, 'tour_availability'),
          where('tour_name', '==', selectedTour),
          where('date', '>=', new Date().toISOString().split('T')[0]),
          orderBy('date', 'asc'),
        );
      }

      const snapshot = await getDocs(availabilityQuery);
      const items = snapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...(docSnapshot.data() as Omit<TourAvailability, 'id'>),
      }));
      setAvailability(items);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      tour_name: formData.get('tour_name') as string,
      date: formData.get('date') as string,
      season_type: formData.get('season_type') as TourAvailability['season_type'],
      base_price: parseFloat(formData.get('base_price') as string),
      available_spots: parseInt(formData.get('available_spots') as string, 10),
      is_available: formData.get('is_available') === 'true',
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingItem) {
        await updateDoc(doc(db, 'tour_availability', editingItem.id), payload);
        toast.success('Availability updated successfully');
      } else {
        await addDoc(collection(db, 'tour_availability'), {
          ...payload,
          created_at: new Date().toISOString(),
        });
        toast.success('Availability created successfully');
      }

      setIsDialogOpen(false);
      setEditingItem(null);
      fetchAvailability();
    } catch (error) {
      console.error('Error saving availability:', error);
      toast.error('Failed to save availability');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this availability entry?')) return;

    try {
      await deleteDoc(doc(db, 'tour_availability', id));
      toast.success('Availability deleted successfully');
      fetchAvailability();
    } catch (error) {
      console.error('Error deleting availability:', error);
      toast.error('Failed to delete availability');
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
          <h1 className="text-4xl font-bold mb-2">Tour Availability</h1>
          <p className="text-muted-foreground">
            Manage tour dates, pricing, and available spots
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedTour} onValueChange={setSelectedTour}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Filter by tour" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tours</SelectItem>
              {tourNames.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog
            open={isDialogOpen && !editingItem}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) setEditingItem(null);
            }}
          >
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Availability
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Availability</DialogTitle>
                <DialogDescription>
                  Create a new availability entry for a specific tour date.
                </DialogDescription>
              </DialogHeader>
              <AvailabilityForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {availability.length} Available Date{availability.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Available Spots</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availability.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No availability found
                  </TableCell>
                </TableRow>
              ) : (
                availability.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.tour_name}</TableCell>
                    <TableCell>{format(new Date(item.date), 'MMM d, yyyy')}</TableCell>
                    <TableCell className="capitalize">{item.season_type}</TableCell>
                    <TableCell>${item.base_price}</TableCell>
                    <TableCell>{item.available_spots}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog
                          open={isDialogOpen && editingItem?.id === item.id}
                          onOpenChange={(open) => {
                            setIsDialogOpen(open);
                            if (!open) setEditingItem(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingItem(item);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Availability</DialogTitle>
                              <DialogDescription>
                                Update pricing and spots for {item.tour_name} on {format(new Date(item.date), 'MMM d, yyyy')}
                              </DialogDescription>
                            </DialogHeader>
                            <AvailabilityForm item={item} onSubmit={handleSubmit} />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function AvailabilityForm({
  item,
  onSubmit,
}: {
  item?: TourAvailability;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tour_name">Tour Name</Label>
        <Select name="tour_name" defaultValue={item?.tour_name || tourNames[0]}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tourNames.map((name) => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" defaultValue={item?.date} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="season_type">Season Type</Label>
        <Select name="season_type" defaultValue={item?.season_type || 'peak'}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="peak">Peak Season</SelectItem>
            <SelectItem value="shoulder">Shoulder Season</SelectItem>
            <SelectItem value="low">Low Season</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="base_price">Base Price ($)</Label>
        <Input
          id="base_price"
          name="base_price"
          type="number"
          step="0.01"
          defaultValue={item?.base_price}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="available_spots">Available Spots</Label>
        <Input
          id="available_spots"
          name="available_spots"
          type="number"
          defaultValue={item?.available_spots ?? 10}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="is_available">Availability Status</Label>
        <Select name="is_available" defaultValue={item?.is_available === false ? 'false' : 'true'}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Available</SelectItem>
            <SelectItem value="false">Unavailable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        {item ? 'Update Availability' : 'Create Availability'}
      </Button>
    </form>
  );
}

