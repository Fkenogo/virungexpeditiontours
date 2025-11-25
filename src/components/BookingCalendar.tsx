import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { format, isSameDay, isAfter, startOfToday } from "date-fns";
import { toast } from "sonner";
import { CalendarDays, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  tourName: string;
  className?: string;
}

interface TourAvailability {
  date: string;
  season_type: 'peak' | 'shoulder' | 'low';
  base_price: number;
  available_spots: number;
  is_available: boolean;
}

export const BookingCalendar = ({ tourName, className }: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [availability, setAvailability] = useState<TourAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: 1,
    specialRequests: "",
  });

  useEffect(() => {
    fetchAvailability();
  }, [tourName]);

  const fetchAvailability = async () => {
    try {
      const today = startOfToday();
      const { data, error } = await supabase
        .from('tour_availability')
        .select('*')
        .eq('tour_name', tourName)
        .gte('date', format(today, 'yyyy-MM-dd'))
        .order('date', { ascending: true });

      if (error) throw error;
      setAvailability((data || []) as TourAvailability[]);
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to load availability');
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityForDate = (date: Date) => {
    return availability.find(a => isSameDay(new Date(a.date), date));
  };

  const getSeasonBadgeColor = (season: string) => {
    switch (season) {
      case 'peak':
        return 'bg-red-500';
      case 'shoulder':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const dateAvailability = getAvailabilityForDate(date);
    if (!dateAvailability?.is_available) {
      toast.error('This date is not available');
      return;
    }

    setSelectedDate(date);
    setShowBookingDialog(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate) return;

    const dateAvailability = getAvailabilityForDate(selectedDate);
    if (!dateAvailability) return;

    const totalPrice = dateAvailability.base_price * bookingForm.numberOfPeople;

    try {
      const { data: bookingData, error } = await supabase
        .from('tour_bookings')
        .insert({
          tour_name: tourName,
          booking_date: format(selectedDate, 'yyyy-MM-dd'),
          customer_name: bookingForm.name,
          customer_email: bookingForm.email,
          customer_phone: bookingForm.phone,
          number_of_people: bookingForm.numberOfPeople,
          total_price: totalPrice,
          special_requests: bookingForm.specialRequests,
        })
        .select()
        .single();

      if (error) throw error;

      // Send email notifications
      try {
        const { error: emailError } = await supabase.functions.invoke('send-booking-notification', {
          body: {
            bookingId: bookingData.id,
            tourName: tourName,
            bookingDate: format(selectedDate, 'yyyy-MM-dd'),
            customerName: bookingForm.name,
            customerEmail: bookingForm.email,
            customerPhone: bookingForm.phone,
            numberOfPeople: bookingForm.numberOfPeople,
            totalPrice: totalPrice,
            specialRequests: bookingForm.specialRequests || undefined,
          },
        });

        if (emailError) {
          console.error('Email notification error:', emailError);
          // Don't fail the booking if email fails
          toast.warning('Booking submitted, but email notifications may be delayed.');
        }
      } catch (emailError) {
        console.error('Failed to send email notifications:', emailError);
        // Don't fail the booking if email fails
      }

      toast.success('Booking request submitted! Check your email for confirmation.');
      setShowBookingDialog(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        numberOfPeople: 1,
        specialRequests: "",
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    }
  };

  const selectedDateAvailability = selectedDate ? getAvailabilityForDate(selectedDate) : null;

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Check Availability & Pricing
          </CardTitle>
          <CardDescription>
            Select a date to view pricing and book your tour
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Season Legend */}
          <div className="flex flex-wrap gap-4 pb-4 border-b">
            <div className="flex items-center gap-2">
              <Badge className={getSeasonBadgeColor('peak')}>Peak Season</Badge>
              <span className="text-sm text-muted-foreground">Highest rates</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getSeasonBadgeColor('shoulder')}>Shoulder Season</Badge>
              <span className="text-sm text-muted-foreground">Mid rates</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getSeasonBadgeColor('low')}>Low Season</Badge>
              <span className="text-sm text-muted-foreground">Best rates</span>
            </div>
          </div>

          {/* Calendar */}
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const availability = getAvailabilityForDate(date);
              return !availability?.is_available || !isAfter(date, new Date(Date.now() - 86400000));
            }}
            modifiers={{
              peak: (date) => getAvailabilityForDate(date)?.season_type === 'peak',
              shoulder: (date) => getAvailabilityForDate(date)?.season_type === 'shoulder',
              low: (date) => getAvailabilityForDate(date)?.season_type === 'low',
            }}
            modifiersClassNames={{
              peak: 'bg-red-100 dark:bg-red-900/20 text-red-900 dark:text-red-100',
              shoulder: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-900 dark:text-yellow-100',
              low: 'bg-green-100 dark:bg-green-900/20 text-green-900 dark:text-green-100',
            }}
            className={cn("rounded-md border pointer-events-auto")}
          />

          {/* Selected Date Info */}
          {selectedDate && selectedDateAvailability && (
            <div className="p-4 border rounded-lg bg-muted/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Selected Date:</span>
                <span>{format(selectedDate, 'PPP')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Season:</span>
                <Badge className={getSeasonBadgeColor(selectedDateAvailability.season_type)}>
                  {selectedDateAvailability.season_type}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold">
                  <DollarSign className="w-4 h-4" />
                  Price per person:
                </span>
                <span className="text-lg font-bold">${selectedDateAvailability.base_price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold">
                  <Users className="w-4 h-4" />
                  Available spots:
                </span>
                <span>{selectedDateAvailability.available_spots}</span>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center text-muted-foreground py-8">
              Loading availability...
            </div>
          )}

          {!loading && availability.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No availability data. Please contact us for booking.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Your Tour</DialogTitle>
            <DialogDescription>
              Complete the form below to request a booking for {selectedDate && format(selectedDate, 'PPP')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={bookingForm.phone}
                onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfPeople">Number of People *</Label>
              <Input
                id="numberOfPeople"
                type="number"
                min="1"
                max={selectedDateAvailability?.available_spots || 10}
                required
                value={bookingForm.numberOfPeople}
                onChange={(e) => setBookingForm({ ...bookingForm, numberOfPeople: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                value={bookingForm.specialRequests}
                onChange={(e) => setBookingForm({ ...bookingForm, specialRequests: e.target.value })}
                placeholder="Any dietary requirements, accessibility needs, etc."
              />
            </div>

            {selectedDateAvailability && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Price:</span>
                  <span>${(selectedDateAvailability.base_price * bookingForm.numberOfPeople).toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setShowBookingDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Submit Booking Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};