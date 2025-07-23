/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        TenorSans: ["Tenor Sans", "sans-serif"],
        PlayfairDisplay: ["Playfair Display", "serif"],
        BerkshireSwash: ["Berkshire Swash", "serif"],
        Poppins: ["Poppins", "sans-serif"],
        Inter: [ "Inter", "sans-serif" ]
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        wht: 'var(--color-wht)',
        surface: 'var(--color-surface)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
        brand: {
          DEFAULT: 'var(--color-brand)',
          dark: 'var(--color-brand-dark)',
          light: 'var(--color-brand-light)',
        },
        // Text colors
        text1: 'var(--color-text1)',
        text2: 'var(--color-text2)',
        text3: 'var(--color-text3)',
        'text-inverse': 'var(--color-text-inverse)',
        // black: 'var(--color-text1)',
        // white: 'var(--color-text-inverse)',
        // Background colors
        bg1: 'var(--color-bg1)',
        bg2: 'var(--color-bg2)',
        bg3: 'var(--color-bg3)',
        'bg-inverse': 'var(--color-bg-inverse)',
        // Border colors
        border1: 'var(--color-border1)',
        border2: 'var(--color-border2)',
        border3: 'var(--color-border3)',
        'border-inverse': 'var(--color-border-inverse)',
      },
    },
  },
  plugins: [],
}