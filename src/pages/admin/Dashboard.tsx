import { useEffect, useState } from 'react';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { auth } from '@/integrations/firebase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Package, TrendingUp, Users } from 'lucide-react';

type SystemStatus = 'checking' | 'ok' | 'error';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    totalTours: 0,
    recentBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<SystemStatus>('checking');
  const [authStatus, setAuthStatus] = useState<SystemStatus>('checking');

  useEffect(() => {
    fetchStats();
    checkSystemStatus();
  }, []);

  const checkSystemStatus = () => {
    // Auth status: check if the auth module has a current user or is initialized
    try {
      // If auth object exists and currentUser is accessible, auth is active
      void auth.currentUser;
      setAuthStatus('ok');
    } catch {
      setAuthStatus('error');
    }
  };

  const fetchStats = async () => {
    try {
      const weekAgoISO = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const [totalBookingsSnap, pendingSnap, toursSnap, recentSnap] = await Promise.all([
        getCountFromServer(collection(db, 'tour_bookings')),
        getCountFromServer(query(collection(db, 'tour_bookings'), where('status', '==', 'pending'))),
        getCountFromServer(collection(db, 'tour_availability')),
        getCountFromServer(query(collection(db, 'tour_bookings'), where('created_at', '>=', weekAgoISO))),
      ]);

      setStats({
        totalBookings: totalBookingsSnap.data().count,
        pendingBookings: pendingSnap.data().count,
        totalTours: toursSnap.data().count,
        recentBookings: recentSnap.data().count,
      });
      setDbStatus('ok');
    } catch (error) {
      console.error('Error fetching stats:', error);
      setDbStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const statusLabel = (s: SystemStatus) => {
    if (s === 'checking') return { text: 'Checking…', className: 'text-yellow-600' };
    if (s === 'ok') return { text: 'Connected', className: 'text-green-600' };
    return { text: 'Error', className: 'text-red-600' };
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
              <span className={`text-sm font-medium ${statusLabel(dbStatus).className}`}>
                {statusLabel(dbStatus).text}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Authentication</span>
              <span className={`text-sm font-medium ${statusLabel(authStatus).className}`}>
                {statusLabel(authStatus).text}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Booking System</span>
              <span className={`text-sm font-medium ${statusLabel(dbStatus).className}`}>
                {dbStatus === 'ok' ? 'Operational' : statusLabel(dbStatus).text}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
