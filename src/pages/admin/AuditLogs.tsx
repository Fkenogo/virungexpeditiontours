import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Loader2, Shield, Package, Users, FileText, MessageSquare, Calendar } from 'lucide-react';
import { format } from 'date-fns';

type AuditLog = {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  user_email?: string;
  user_name?: string;
};

const getEntityIcon = (entityType: string) => {
  switch (entityType) {
    case 'user_roles':
      return <Shield className="h-4 w-4" />;
    case 'tour_bookings':
      return <Package className="h-4 w-4" />;
    case 'profiles':
      return <Users className="h-4 w-4" />;
    case 'blog_posts':
      return <FileText className="h-4 w-4" />;
    case 'testimonials':
      return <MessageSquare className="h-4 w-4" />;
    case 'tour_availability':
      return <Calendar className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getActionColor = (action: string) => {
  if (action.includes('create') || action.includes('grant')) return 'default';
  if (action.includes('update') || action.includes('modify')) return 'secondary';
  if (action.includes('delete') || action.includes('revoke')) return 'destructive';
  return 'outline';
};

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data: auditLogs, error: logsError } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (logsError) throw logsError;

      // Get user details for each log
      const userIds = [...new Set(auditLogs.map(log => log.user_id))];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      const logsWithUserInfo = auditLogs.map(log => {
        const profile = profiles.find(p => p.id === log.user_id);
        return {
          ...log,
          user_email: profile?.email,
          user_name: profile?.full_name,
        };
      });

      setLogs(logsWithUserInfo);
    } catch (error: any) {
      console.error('Error fetching audit logs:', error);
      toast.error('Failed to load audit logs');
    } finally {
      setLoading(false);
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
        <h1 className="text-4xl font-bold mb-2">Audit Logs</h1>
        <p className="text-muted-foreground">
          Track all admin actions and system events
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity ({logs.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No audit logs found
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(log.created_at), 'MMM d, yyyy HH:mm')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{log.user_name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">{log.user_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getEntityIcon(log.entity_type)}
                        <span className="text-sm">{log.entity_type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      {log.details && (
                        <div className="text-sm text-muted-foreground">
                          {typeof log.details === 'object' 
                            ? JSON.stringify(log.details, null, 2).substring(0, 100) + '...'
                            : log.details}
                        </div>
                      )}
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