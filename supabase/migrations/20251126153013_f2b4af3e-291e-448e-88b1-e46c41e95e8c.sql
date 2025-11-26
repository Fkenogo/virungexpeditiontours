-- Create audit_logs table to track admin actions
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view all audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow system to insert audit logs (will be done via edge functions)
CREATE POLICY "System can insert audit logs"
ON public.audit_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);

-- Add index for tracking inactive users
CREATE INDEX idx_profiles_last_sign_in ON public.profiles(last_sign_in) WHERE last_sign_in IS NOT NULL;