'use client';

import { useAuth } from './AuthContext';
import { usePathname } from 'next/navigation';

const publicRoutes = ['/', '/login', '/pricing'];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.includes(pathname);

  if (loading && !isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B1120]">
        <div className="text-slate-600 dark:text-slate-300">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
