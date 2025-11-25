import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
import { toast } from 'sonner';
import { Loader2, Shield, User } from 'lucide-react';
import { format } from 'date-fns';

type UserWithRole = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  roles: string[];
};

export default function AdminUsers() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch profiles with their roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, created_at');

      if (profilesError) throw profilesError;

      // Fetch roles for all users
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get auth users info (only admins can do this via RLS)
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();

      if (authError) {
        console.error('Auth error:', authError);
      }

      const authUsers = authData?.users || [];

      // Combine the data
      const usersWithRoles: UserWithRole[] = profiles.map((profile) => {
        const authUser = authUsers.find((u) => u.id === profile.id);
        const userRoles = roles.filter((r) => r.user_id === profile.id).map((r) => r.role);

        return {
          id: profile.id,
          email: authUser?.email || '',
          full_name: profile.full_name,
          created_at: profile.created_at,
          roles: userRoles,
        };
      });

      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      // If admin.listUsers fails, it means we don't have proper admin access
      // Fall back to just showing profiles
      if (error.message?.includes('admin')) {
        toast.error('Admin access required to view all user details');
      } else {
        toast.error('Failed to load users');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: string, currentRoles: string[]) => {
    const isAdmin = currentRoles.includes('admin');

    try {
      if (isAdmin) {
        // Remove admin role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');

        if (error) throw error;
        toast.success('Admin role removed');
      } else {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });

        if (error) throw error;
        toast.success('Admin role granted');
      }

      fetchUsers();
    } catch (error) {
      console.error('Error toggling admin role:', error);
      toast.error('Failed to update user role');
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
      <div>
        <h1 className="text-4xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and assign admin roles
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{users.length} Total User{users.length !== 1 ? 's' : ''}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.full_name || 'Not set'}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {user.roles.includes('admin') ? (
                          <Badge variant="default">
                            <Shield className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <User className="h-3 w-3 mr-1" />
                            User
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={user.roles.includes('admin') ? 'destructive' : 'default'}
                        onClick={() => toggleAdminRole(user.id, user.roles)}
                      >
                        {user.roles.includes('admin') ? 'Remove Admin' : 'Make Admin'}
                      </Button>
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
