import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 10px)',
      },
      /* Warm-tinted elevation scale — neutral black shadows read as grey
         smudges against the cream palette, so every level is tinted. */
      boxShadow: {
        xs: '0 1px 2px -1px hsl(var(--shadow) / 0.10)',
        sm: '0 1px 2px -1px hsl(var(--shadow) / 0.10), 0 2px 6px -2px hsl(var(--shadow) / 0.08)',
        DEFAULT: '0 2px 4px -2px hsl(var(--shadow) / 0.10), 0 4px 12px -4px hsl(var(--shadow) / 0.10)',
        md: '0 3px 6px -3px hsl(var(--shadow) / 0.12), 0 8px 20px -6px hsl(var(--shadow) / 0.12)',
        lg: '0 6px 12px -6px hsl(var(--shadow) / 0.14), 0 16px 32px -12px hsl(var(--shadow) / 0.16)',
        xl: '0 10px 20px -10px hsl(var(--shadow) / 0.16), 0 28px 56px -20px hsl(var(--shadow) / 0.20)',
        none: 'none',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
        serif: [
          'var(--font-source-serif)',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'ui-serif',
          'serif',
        ],
        logo: [
          'var(--font-space-grotesk)',
          'var(--font-inter)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      /* Fluid display sizes so headings breathe on desktop without
         overwhelming a 375px phone. */
      fontSize: {
        'display-lg': ['clamp(2.25rem, 1.55rem + 3vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        display: ['clamp(1.875rem, 1.35rem + 2.2vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.022em' }],
        title: ['clamp(1.5rem, 1.2rem + 1.3vw, 2.25rem)', { lineHeight: '1.18', letterSpacing: '-0.018em' }],
        headline: ['clamp(1.25rem, 1.1rem + 0.7vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.014em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'sheet-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'sheet-in': 'sheet-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
