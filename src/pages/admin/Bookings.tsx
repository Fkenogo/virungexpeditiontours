import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

type Booking = {
  id: string;
  tour_name: string;
  booking_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  number_of_people: number;
  total_price: number;
  status: string;
  special_requests: string | null;
  created_at: string;
};

const normalizeDate = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    const parsed = value.toDate() as Date;
    return parsed.toISOString();
  }
  return new Date().toISOString();
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    const bookingsQuery =
      filter !== 'all'
        ? query(collection(db, 'tour_bookings'), where('status', '==', filter), orderBy('created_at', 'desc'))
        : query(collection(db, 'tour_bookings'), orderBy('created_at', 'desc'));

    const unsubscribe = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        const items = snapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...(docSnapshot.data() as Omit<Booking, 'id' | 'created_at' | 'booking_date'>),
          created_at: normalizeDate(docSnapshot.data().created_at),
          booking_date: normalizeDate(docSnapshot.data().booking_date),
        }));
        setBookings(items);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings');
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [filter]);

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'tour_bookings', bookingId), {
        status: newStatus,
        updated_at: new Date().toISOString(),
      });

      toast.success('Booking status updated');
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking status');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      pending: 'secondary',
      confirmed: 'default',
      cancelled: 'destructive',
    };

    return (
      <Badge variant={variants[status] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
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
          <h1 className="text-4xl font-bold mb-2">Tour Bookings</h1>
          <p className="text-muted-foreground">
            Manage all booking requests and confirmations
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {bookings.length} {filter === 'all' ? 'Total' : filter.charAt(0).toUpperCase() + filter.slice(1)} Booking{bookings.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>People</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.tour_name}</TableCell>
                    <TableCell>{format(new Date(booking.booking_date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{booking.customer_name}</p>
                        <p className="text-sm text-muted-foreground">{booking.customer_email}</p>
                        <p className="text-sm text-muted-foreground">{booking.customer_phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{booking.number_of_people}</TableCell>
                    <TableCell>${booking.total_price}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            >
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
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
