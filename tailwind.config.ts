import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      minHeight: {
        'vh-minus-120': 'calc(100vh - 120px)',
        'vh-minus-200': 'calc(100vh - 223px)',
      },
      maxHeight: {
        'vh-max-120': 'calc(100vh - 120px)',
        'vh-aside': '569px'
      },
    },
  },
  plugins: [],
}
export default config
