import type { Config } from 'tailwindcss';

/**
 * Design System SMV — palette institutionnelle.
 * Les valeurs hexadécimales sont dupliquées en CSS variables dans src/index.css
 * (variables `--smv-*`) pour les styles hors Tailwind.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'smv-navy': {
          DEFAULT: '#2D3E73',
          dark: '#1E2A52',
        },
        'smv-green': {
          DEFAULT: '#3DA435',
          light: '#B8D584',
        },
        'smv-red': '#C1272D',
        'smv-off-white': '#F5F5F0',
        'smv-gray': {
          100: '#F0F0F0',
          300: '#CCCCCC',
          600: '#666666',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['Marianne', '"Source Sans Pro"', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
      maxWidth: {
        page: '1200px',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-fast': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'progress-indeterminate': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(250%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.35s ease-out both',
        'fade-in-fast': 'fade-in-fast 0.2s ease-out both',
        'slide-in-right': 'slide-in-right 0.3s ease-out both',
        'progress-indeterminate': 'progress-indeterminate 1.2s ease-in-out infinite',
        marquee: 'marquee 35s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
