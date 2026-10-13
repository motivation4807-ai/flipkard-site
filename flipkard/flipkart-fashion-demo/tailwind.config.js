/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        fk: { blue: '#2874f0', deep: '#1d5fca', yellow: '#ffe500', ink: '#212121', gray: '#f1f3f6' }
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,.09)',
        panel: '0 8px 30px rgba(31,54,92,.12)'
      },
      fontFamily: { sans: ['Arial', 'Helvetica', 'sans-serif'] }
    }
  },
  plugins: []
};
