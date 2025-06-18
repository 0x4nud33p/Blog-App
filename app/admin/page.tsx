import { Suspense } from 'react';
import { Header } from '@/components/header';
import { AdminDashboard } from '@/components/admin-dashboard';
import { AuthGuard } from '@/components/auth-guard';

export default function AdminPage() {
  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage your blog posts and content
              </p>
            </div>
            <Suspense fallback={<div className="animate-pulse">Loading dashboard...</div>}>
              <AdminDashboard />
            </Suspense>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}