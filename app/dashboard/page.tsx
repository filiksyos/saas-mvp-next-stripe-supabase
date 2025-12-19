'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, CreditCard, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Subscription {
  id: string;
  status: string;
  current_period_end: string;
}

export default function DashboardPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    async function loadSubscription() {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!error && data) {
          setSubscription(data);
        }
      } catch (err) {
        console.error('Error loading subscription:', err);
      } finally {
        setLoading(false);
      }
    }

    loadSubscription();
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Welcome back, {user.email}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-dark rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <User className="h-6 w-6 text-primary" />
              </div>
              <h2 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                Profile
              </h2>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-medium">User ID:</span> {user.id?.slice(0, 8)}...
              </p>
            </div>
          </motion.div>

          {/* Subscription Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-neutral-dark rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <CreditCard className="h-6 w-6 text-green-500" />
              </div>
              <h2 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                Subscription
              </h2>
            </div>
            {loading ? (
              <p className="text-sm text-slate-600 dark:text-slate-300">Loading...</p>
            ) : subscription ? (
              <div className="space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium">Status:</span>{' '}
                  <span className="capitalize text-green-500">{subscription.status}</span>
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium">Renews:</span>{' '}
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                  No active subscription
                </p>
                <button
                  onClick={() => router.push('/pricing')}
                  className="text-sm px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all"
                >
                  Upgrade Now
                </button>
              </div>
            )}
          </motion.div>

          {/* Settings Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-neutral-dark rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Settings className="h-6 w-6 text-orange-500" />
              </div>
              <h2 className="ml-3 text-xl font-semibold text-slate-900 dark:text-white">
                Settings
              </h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors">
                Edit Profile
              </button>
              <button className="w-full text-left text-sm text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light transition-colors">
                Billing Settings
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to explore more?
          </h2>
          <p className="text-white/90 mb-6">
            Check out our pricing plans and unlock all features
          </p>
          <button
            onClick={() => router.push('/pricing')}
            className="px-6 py-3 bg-white text-primary hover:bg-slate-100 rounded-lg font-semibold transition-all"
          >
            View Pricing
          </button>
        </motion.div>
      </div>
    </div>
  );
}
