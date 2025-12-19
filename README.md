# SaaS MVP - Next.js + Stripe + Supabase

A production-ready SaaS template featuring authentication, payments, and a modern UI. Built with Next.js 15, TypeScript, Tailwind CSS, Supabase, and Stripe.

## ✨ Features

- 🔐 **Authentication** with Supabase (Email/Password, OAuth)
- 💳 **Stripe Payment** integration with subscription management
- 🌓 **Dark Mode** support with system preference detection
- 📱 **Responsive Design** with Tailwind CSS
- 🎨 **Modern UI** with Framer Motion animations
- 🛡️ **TypeScript** for type safety
- 🔒 **Security Headers** (XSS, CSRF protection)
- 📊 **Analytics** ready (Vercel Analytics)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A Supabase account
- A Stripe account

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/filiksyos/saas-mvp-next-stripe-supabase.git
cd saas-mvp-next-stripe-supabase
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

4. **Configure Supabase:**

   - Create a new project in Supabase
   - Get your API keys from Project Settings > API
   - Run the database schema:

```sql
-- Create users table
CREATE TABLE public.users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT,
  price_id TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);
```

5. **Configure Stripe:**

   - Create a product and price in Stripe Dashboard
   - Get your API keys from Developers > API keys
   - Set up webhook endpoint: `your_domain/api/stripe/webhook`
   - Subscribe to events: `customer.subscription.*`, `checkout.session.completed`

6. **Run the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── stripe/       # Stripe webhook handler
│   │   └── user/         # User management
│   ├── auth/             # Auth callback
│   ├── dashboard/        # Protected dashboard
│   ├── login/            # Login page
│   ├── pricing/          # Pricing page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/           # React components
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── types/                # TypeScript types
└── public/               # Static files
```

## 🛠️ Tech Stack

- **Framework:** Next.js 15.1.3
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4.1
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe 17.5.0
- **Animations:** Framer Motion 12.4.3
- **UI Components:** Headless UI, Lucide Icons

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PRICE_ID` | Stripe price ID for subscriptions |

## 🚢 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/filiksyos/saas-mvp-next-stripe-supabase)

## 📄 License

MIT License - feel free to use this template for your projects!

## 🙏 Acknowledgments

Based on the excellent work from [shenseanchen/launch-mvp-stripe-nextjs-supabase](https://github.com/shenseanchen/launch-mvp-stripe-nextjs-supabase)

---

Built with ❤️ using Next.js, Supabase, and Stripe
