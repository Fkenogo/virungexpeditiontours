import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

type TourAvailability = {
  id: string;
  tour_name: string;
  date: string;
  season_type: string;
  base_price: number;
  available_spots: number;
  is_available: boolean;
};

const tourNames = [
  'Mountain Gorilla Trekking',
  'Golden Monkey Tracking',
  'Chimpanzee Trekking',
  'Canopy Walkway Experience',
  'Akagera Safari',
  'Kigali City Tour',
  'Dian Fossey Tomb Hike',
];

export default function AdminAvailability() {
  const [availability, setAvailability] = useState<TourAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<TourAvailability | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, [selectedTour]);

  const fetchAvailability = async () => {
    try {
      let query = supabase
        .from('tour_availability')
        .select('*')
        .order('date', { ascending: true })
        .gte('date', new Date().toISOString().split('T')[0]);

      if (selectedTour !== 'all') {
        query = query.eq('tour_name', selectedTour);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAvailability(data || []);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;

    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('tour_availability')
        .update({
          base_price: parseFloat(formData.get('base_price') as string),
          available_spots: parseInt(formData.get('available_spots') as string),
          season_type: formData.get('season_type') as string,
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      toast.success('Availability updated successfully');
      setIsDialogOpen(false);
      setEditingItem(null);
      fetchAvailability();
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this availability entry?')) return;

    try {
      const { error } = await supabase
        .from('tour_availability')
        .delete()
        .eq('id', id);

      if (error) throw error;

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
                        <Dialog open={isDialogOpen && editingItem?.id === item.id} onOpenChange={(open) => {
                          setIsDialogOpen(open);
                          if (!open) setEditingItem(null);
                        }}>
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
                            <form onSubmit={handleUpdate} className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="season_type">Season Type</Label>
                                <Select name="season_type" defaultValue={item.season_type}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="peak">Peak Season</SelectItem>
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
                                  defaultValue={item.base_price}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="available_spots">Available Spots</Label>
                                <Input
                                  id="available_spots"
                                  name="available_spots"
                                  type="number"
                                  defaultValue={item.available_spots}
                                  required
                                />
                              </div>
                              <Button type="submit" className="w-full">
                                Update Availability
                              </Button>
                            </form>
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
