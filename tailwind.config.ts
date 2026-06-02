import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        newsprint: '#FBF8F1',
        'newsprint-deep': '#F4EEE0',
        'press-navy': '#101C34',
        ink: '#1C1812',
        sepia: '#6B5D45',
        rule: '#D8CDB6',
        'rule-soft': '#E7DFCC',
        gold: '#B45309',
        'accent-red': '#B91C1C',
        'signal-blue': '#1E3A5F',
      },
      fontFamily: {
        serif: ['Newsreader', 'Source Serif 4', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'monospace'],
      },
      maxWidth: {
        measure: '34rem',
        page: '75rem',
      },
    },
  },
  plugins: [],
}
export default config
