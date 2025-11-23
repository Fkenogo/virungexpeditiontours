-- Create table for comprehensive quote requests
CREATE TABLE public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country_residence TEXT NOT NULL,
  nationality TEXT NOT NULL,
  preferred_travel_dates TEXT NOT NULL,
  flexible_dates BOOLEAN DEFAULT false,
  number_adults INTEGER NOT NULL DEFAULT 1,
  number_children INTEGER DEFAULT 0,
  children_ages TEXT,
  tour_interests TEXT[] DEFAULT '{}',
  trip_duration TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  accommodation_preference TEXT NOT NULL,
  special_requests TEXT,
  how_heard_about_us TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create table for quick inquiries
CREATE TABLE public.quick_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quick_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anyone to insert (public forms)
CREATE POLICY "Anyone can submit quote requests"
ON public.quote_requests
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Anyone can submit quick inquiries"
ON public.quick_inquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_quote_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_quote_requests_timestamp
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_quote_requests_updated_at();

-- Create indexes for better query performance
CREATE INDEX idx_quote_requests_created_at ON public.quote_requests(created_at DESC);
CREATE INDEX idx_quote_requests_email ON public.quote_requests(email);
CREATE INDEX idx_quick_inquiries_created_at ON public.quick_inquiries(created_at DESC);