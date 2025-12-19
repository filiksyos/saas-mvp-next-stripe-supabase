import type { Config } from "tailwindcss";

export default {
  darkMode: 'media',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A78BFA',
          light: '#C4B5FD',
          dark: '#8B5CF6',
        },
        danger: {
          DEFAULT: '#DC2626',
          light: '#F87171',
          dark: '#B91C1C',
        },
        neutral: {
          DEFAULT: '#F8FAFC',
          dark: '#1E293B',
          darker: '#0F172A',
        },
        text: {
          DEFAULT: '#0F172A',
          light: '#64748B',
          dark: '#F8FAFC',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
        accent: {
          DEFAULT: '#38BDF8',
          light: '#7DD3FC',
          dark: '#0EA5E9',
        }
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.05)',
        'hover': '0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06)',
      }
    },
  },
  plugins: [],
} satisfies Config;
