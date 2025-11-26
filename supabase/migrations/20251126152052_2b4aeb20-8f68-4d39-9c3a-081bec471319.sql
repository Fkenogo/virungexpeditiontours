-- Add email column to profiles table for easier client-side access
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;

-- Add last_sign_in column to track user activity
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_sign_in timestamp with time zone;

-- Update the handle_new_user function to store email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile with email
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create function to update last_sign_in
CREATE OR REPLACE FUNCTION public.update_last_sign_in()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET last_sign_in = now()
  WHERE id = NEW.id;
  
  RETURN NEW;
END;
$$;

-- Create trigger to update last_sign_in on user login
DROP TRIGGER IF EXISTS on_auth_user_login ON auth.users;
CREATE TRIGGER on_auth_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION public.update_last_sign_in();

-- Backfill email for existing users (this will run once during migration)
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN 
    SELECT au.id, au.email 
    FROM auth.users au
    INNER JOIN public.profiles p ON p.id = au.id
    WHERE p.email IS NULL
  LOOP
    UPDATE public.profiles 
    SET email = user_record.email 
    WHERE id = user_record.id;
  END LOOP;
END $$;