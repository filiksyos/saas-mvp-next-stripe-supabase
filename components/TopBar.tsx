'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '/pricing' },
    ...(user ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-darker/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="text-xl font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              SaaS MVP
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-primary dark:text-primary-light'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-white rounded-lg transition-all"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-700"
            >
              <div className="py-4 space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      router.push(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-primary dark:text-primary-light'
                        : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400"
                  >
                    Sign Out
                  </button>
                ) : (
                  <div className="px-4 space-y-2">
                    <button
                      onClick={() => {
                        router.push('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        router.push('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-center px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
