"use client";

import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Lock, CreditCard, Moon, Zap, Shield, Sparkles } from 'lucide-react';
import { TypewriterEffect } from '@/components/TypewriterEffect';

const featureCards = [
  {
    title: "Authentication",
    description: "Secure Supabase auth with social providers",
    icon: <Lock className="h-6 w-6 text-primary" />,
    bgGradient: "from-blue-500/10 to-purple-500/10"
  },
  {
    title: "Payments",
    description: "Stripe subscription management built-in",
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    bgGradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    title: "Dark Mode",
    description: "Beautiful theme management out of the box",
    icon: <Moon className="h-6 w-6 text-primary" />,
    bgGradient: "from-orange-500/10 to-red-500/10"
  },
  {
    title: "Type Safe",
    description: "Full TypeScript support for reliability",
    icon: <Shield className="h-6 w-6 text-primary" />,
    bgGradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    title: "Fast & Modern",
    description: "Built with Next.js 15 App Router",
    icon: <Zap className="h-6 w-6 text-primary" />,
    bgGradient: "from-yellow-500/10 to-orange-500/10"
  },
  {
    title: "Beautiful UI",
    description: "Framer Motion animations included",
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    bgGradient: "from-cyan-500/10 to-blue-500/10"
  }
];

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light/10 to-accent-light/10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative pt-20 pb-16 sm:pb-24">
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white"
              >
                <span className="block">Production-Ready</span>
                <span className="block text-primary dark:text-primary-light mt-2">SaaS Template</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300"
              >
                Build your next SaaS product with authentication, payments, and beautiful UI in minutes.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex gap-4 justify-center"
              >
                <button 
                  onClick={() => router.push(user ? '/dashboard' : '/login')} 
                  className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {user ? 'Go to Dashboard' : 'Get Started'}
                </button>
                <button 
                  onClick={() => router.push('/pricing')} 
                  className="px-8 py-3 bg-white dark:bg-neutral-dark hover:bg-slate-50 dark:hover:bg-neutral-darker text-primary dark:text-primary-light border-2 border-primary dark:border-primary-light rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  View Pricing
                </button>
              </motion.div>
            </div>

            {/* Code Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <pre className="relative rounded-xl bg-slate-900 p-8 shadow-2xl">
                <code className="text-sm sm:text-base text-slate-100">
                  <TypewriterEffect text={`// 🚀 Get started in minutes
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const supabase = createClient(url, key)
const stripe = new Stripe(secretKey)

// Authentication ready ✅
// Payments ready ✅
// Beautiful UI ready ✅`} />
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-white dark:bg-neutral-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Built with modern tools and best practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-all`}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-slate-50 dark:bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Your SaaS?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Start with a production-ready template and launch faster
            </p>
            <button 
              onClick={() => router.push('/login')} 
              className="px-8 py-4 bg-white text-primary hover:bg-slate-100 rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold text-lg"
            >
              Start Building Now
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
