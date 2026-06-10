/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'smv-navy': '#1E2B4A',
        'smv-green': '#2D6A2F',
        'smv-green-light': '#4A9E4D',
        'smv-sand': '#C4A35A',
        'smv-cream': '#F2EDD7',
        'smv-red': '#C0392B',
        'pixel-shadow': '#0A0F1E',
        'ui-bg': '#12192B',
        'ui-panel': '#1A2540',
        'ui-border': '#3D5A80',
        'accent-gold': '#F0C040',
        'accent-rust': '#8B3A2A',
        'accent-teal': '#2A7A6A'
      },
      fontFamily: {
        title: ['"Press Start 2P"', 'monospace'],
        dialogue: ['VT323', 'monospace'],
        ui: ['Silkscreen', 'monospace']
      }
    }
  },
  plugins: []
};
