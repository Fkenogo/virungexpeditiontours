# Make User Admin

After signing up for an account, you need to grant yourself admin privileges. 

## Step 1: Sign Up
1. Go to `/auth` and create an account
2. Note your email address

## Step 2: Grant Admin Access

Run this SQL query in your Lovable Cloud backend (replace `your-email@example.com` with your actual email):

```sql
-- Find your user ID and grant admin role
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

## Step 3: Refresh and Access Admin

1. Refresh the page or log out and log back in
2. You should now see the "Admin" button in the header
3. Click it to access the admin dashboard at `/admin`

## Admin Features

Once you have admin access, you can:

- **Dashboard**: View booking statistics and system status
- **Tour Availability**: Manage tour dates, pricing, and available spots
- **Bookings**: View all booking requests and update their status
- **Users**: Manage user accounts and grant/revoke admin roles

## Email Confirmation

For faster testing during development, you can disable email confirmation:

1. Open your Lovable Cloud backend
2. Go to Authentication settings
3. Enable "Auto-confirm email signups"

This way, new users can sign in immediately without waiting for confirmation emails.
