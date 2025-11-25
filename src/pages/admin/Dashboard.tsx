import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Package, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalTours: 0,
    recentBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [bookingsResult, toursResult, recentResult] = await Promise.all([
        supabase.from('tour_bookings').select('status', { count: 'exact', head: true }),
        supabase.from('tour_availability').select('tour_name', { count: 'exact', head: true }),
        supabase
          .from('tour_bookings')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      ]);

      const pendingResult = await supabase
        .from('tour_bookings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalBookings: bookingsResult.count || 0,
        pendingBookings: pendingResult.count || 0,
        totalTours: toursResult.count || 0,
        recentBookings: recentResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Package,
      description: 'All time bookings',
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: Calendar,
      description: 'Awaiting confirmation',
    },
    {
      title: 'Active Tours',
      value: stats.totalTours,
      icon: Users,
      description: 'Available tour dates',
    },
    {
      title: 'Recent (7 days)',
      value: stats.recentBookings,
      icon: TrendingUp,
      description: 'New bookings this week',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your tours, bookings, and availability</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Use the sidebar to navigate to different sections:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Manage tour availability and pricing</li>
              <li>View and update booking requests</li>
              <li>Manage user accounts and roles</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <span className="text-sm font-medium text-green-600">Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Authentication</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Booking System</span>
              <span className="text-sm font-medium text-green-600">Operational</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
