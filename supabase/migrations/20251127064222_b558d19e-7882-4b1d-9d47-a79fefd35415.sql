-- Fix Critical RLS Policy Issues for Customer Data Protection

-- 1. Fix profiles table - Remove overly permissive public access
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create restrictive policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. Add SELECT policy to quote_requests table to protect customer PII
CREATE POLICY "Admins can view quote requests" 
ON public.quote_requests 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Add SELECT policy to quick_inquiries table to protect customer contact info
CREATE POLICY "Admins can view quick inquiries" 
ON public.quick_inquiries 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));