import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        noActivePurple: '#9393b2',
        activePurple: '#563bff',
      },
      backgroundColor: {
        lightPurple: '#F8F9FD',
        currentPurple: '#e9e7fd',
        blackPurple: '#21213b',
        activePurple: '#563bff',
        orange: '#fc783f',
      }
    },
  },
  plugins: [],
}
export default config
