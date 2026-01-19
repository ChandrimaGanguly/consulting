/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary colors - The Earth
        'forest-deep': '#2D4739',
        'sage': '#87A878',
        'terracotta': '#C4745A',
        // Neutral colors - The Ground
        'warm-stone': '#E8E0D5',
        'soft-cream': '#FAF8F5',
        'deep-earth': '#3D3D3D',
        // Accent - The Light
        'morning-gold': '#D4A84B',
      },
      fontFamily: {
        'heading': ['Fraunces', 'Georgia', 'serif'],
        'body': ['Source Sans 3', 'system-ui', 'sans-serif'],
        'accent': ['Caveat', 'cursive'],
      },
      backgroundImage: {
        'forest-gradient': 'linear-gradient(180deg, #FAF8F5 0%, #E8E0D5 50%, #87A878 100%)',
        'mountain-gradient': 'linear-gradient(180deg, #2D4739 0%, #87A878 100%)',
      },
    },
  },
  plugins: [],
};
