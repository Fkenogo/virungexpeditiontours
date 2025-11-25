-- Create tour availability and pricing table
CREATE TABLE public.tour_availability (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_name TEXT NOT NULL,
  date DATE NOT NULL,
  season_type TEXT NOT NULL CHECK (season_type IN ('peak', 'shoulder', 'low')),
  base_price DECIMAL(10, 2) NOT NULL,
  available_spots INTEGER NOT NULL DEFAULT 10,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(tour_name, date)
);

-- Create index for faster queries
CREATE INDEX idx_tour_availability_tour_date ON public.tour_availability(tour_name, date);
CREATE INDEX idx_tour_availability_date ON public.tour_availability(date);

-- Enable Row Level Security
ALTER TABLE public.tour_availability ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view availability (public information)
CREATE POLICY "Anyone can view tour availability"
ON public.tour_availability
FOR SELECT
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tour_availability_updated_at
BEFORE UPDATE ON public.tour_availability
FOR EACH ROW
EXECUTE FUNCTION public.update_quote_requests_updated_at();

-- Create table for tour bookings
CREATE TABLE public.tour_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  number_of_people INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for bookings
CREATE INDEX idx_tour_bookings_tour_date ON public.tour_bookings(tour_name, booking_date);
CREATE INDEX idx_tour_bookings_email ON public.tour_bookings(customer_email);

-- Enable Row Level Security
ALTER TABLE public.tour_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to create bookings
CREATE POLICY "Anyone can create tour bookings"
ON public.tour_bookings
FOR INSERT
WITH CHECK (true);

-- Users can view their own bookings by email
CREATE POLICY "Users can view their own bookings"
ON public.tour_bookings
FOR SELECT
USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create trigger for booking timestamp updates
CREATE TRIGGER update_tour_bookings_updated_at
BEFORE UPDATE ON public.tour_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_quote_requests_updated_at();