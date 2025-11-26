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
import { Loader2, Shield, User, Activity, Clock, Users } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useAuditLog } from '@/hooks/useAuditLog';

type UserWithRole = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  last_sign_in: string | null;
  roles: string[];
};

export default function AdminUsers() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { logAction } = useAuditLog();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch profiles with email and last_sign_in
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, email, created_at, last_sign_in')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles for all users
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine the data
      const usersWithRoles: UserWithRole[] = profiles.map((profile) => {
        const userRoles = roles?.filter((r) => r.user_id === profile.id).map((r) => r.role) || [];

        return {
          id: profile.id,
          email: profile.email || 'No email',
          full_name: profile.full_name,
          created_at: profile.created_at,
          last_sign_in: profile.last_sign_in,
          roles: userRoles,
        };
      });

      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
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
        
        await logAction('revoke_admin', 'user_roles', userId, { role: 'admin' });
        toast.success('Admin role removed');
      } else {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });

        if (error) throw error;
        
        await logAction('grant_admin', 'user_roles', userId, { role: 'admin' });
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

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => u.roles.includes('admin')).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Today</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter(u => {
                  if (!u.last_sign_in) return false;
                  const lastSignIn = new Date(u.last_sign_in);
                  const today = new Date();
                  return lastSignIn.toDateString() === today.toDateString();
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.full_name || 'Not set'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
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
                        {user.last_sign_in ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {formatDistanceToNow(new Date(user.last_sign_in), { addSuffix: true })}
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">Never</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
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
    </div>
  );
}
