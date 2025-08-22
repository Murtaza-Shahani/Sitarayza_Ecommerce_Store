/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1E293B",   // deep slate/navy
          secondary: "#EAB308", // golden amber
          accent: "#F43F5E",    // rose
          neutral: "#F8FAFC",   // off-white bg
          text: "#0F172A",      // dark text
        },
      },
    },
  },
  plugins: [],
};
