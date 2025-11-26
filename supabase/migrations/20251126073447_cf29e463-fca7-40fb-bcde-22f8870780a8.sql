-- Fix quick_inquiries RLS policy
DROP POLICY IF EXISTS "Anyone can submit quick inquiries" ON public.quick_inquiries;

CREATE POLICY "Anyone can submit quick inquiries"
ON public.quick_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create tour_videos table for admin video management
CREATE TABLE public.tour_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tour_name TEXT NOT NULL,
  video_url TEXT NOT NULL,
  video_type TEXT NOT NULL CHECK (video_type IN ('preview', 'testimonial')),
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tour_videos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tour_videos
CREATE POLICY "Anyone can view active tour videos"
ON public.tour_videos
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all tour videos"
ON public.tour_videos
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert tour videos"
ON public.tour_videos
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update tour videos"
ON public.tour_videos
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete tour videos"
ON public.tour_videos
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create FAQ table
CREATE TABLE public.faq_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for faq_items
CREATE POLICY "Anyone can view active FAQ items"
ON public.faq_items
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can view all FAQ items"
ON public.faq_items
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert FAQ items"
ON public.faq_items
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update FAQ items"
ON public.faq_items
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete FAQ items"
ON public.faq_items
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create update triggers
CREATE TRIGGER update_tour_videos_updated_at
BEFORE UPDATE ON public.tour_videos
FOR EACH ROW
EXECUTE FUNCTION update_quote_requests_updated_at();

CREATE TRIGGER update_faq_items_updated_at
BEFORE UPDATE ON public.faq_items
FOR EACH ROW
EXECUTE FUNCTION update_quote_requests_updated_at();