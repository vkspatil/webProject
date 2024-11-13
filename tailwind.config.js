/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        orbitron: ["Orbitron"],
      },
      colors: {
        customBlue: "#1E3A8A",
        customGreen: "#16A34A",
        customOrange: "#E3902F",
        customRed: "#B91C1C",
        customGray: "#4B5563",
      },
      boxShadow: {
        favShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "slide-in-from-right": "slideInFromRight 0.3s ease-out",
        "slide-out-to-right": "slideOutToRight 0.3s ease-in",
        "slide-in-from-top": "slideInFromTop 0.3s ease-out",
        "slide-out-to-top": "slideOutToTop 0.3s ease-in",
        "slide-in-from-bottom": "slideInFromBottom 0.3s ease-out",
        "slide-out-to-bottom": "slideOutToBottom 0.3s ease-in",
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-out": "fadeOut 0.3s ease-in",
        "scale-in": "scaleIn 0.3s ease-out",
        "scale-out": "scaleOut 0.3s ease-in",
      },
      keyframes: {
        slideInFromRight: {
          "0%": { transform: "translateX(100%)", opacity: "0", scale: "0.95" },
          "100%": { transform: "translateX(0)", opacity: "1", scale: "1" },
        },
        slideOutToRight: {
          "0%": { transform: "translateX(0)", opacity: "1", scale: "1" },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
            scale: "0.95",
          },
        },
        slideInFromTop: {
          "0%": { transform: "translateY(-100%)", opacity: "0", scale: "0.95" },
          "100%": { transform: "translateY(0)", opacity: "1", scale: "1" },
        },
        slideOutToTop: {
          "0%": { transform: "translateY(0)", opacity: "1", scale: "1" },
          "100%": {
            transform: "translateY(-100%)",
            opacity: "0",
            scale: "0.95",
          },
        },
        slideInFromBottom: {
          "0%": { transform: "translateY(100%)", opacity: "0", scale: "0.95" },
          "100%": { transform: "translateY(0)", opacity: "1", scale: "1" },
        },
        slideOutToBottom: {
          "0%": { transform: "translateY(0)", opacity: "1", scale: "1" },
          "100%": {
            transform: "translateY(100%)",
            opacity: "0",
            scale: "0.95",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
      },
      clipPath: {
        trapezoid: "polygon(15% 100%, 85% 100%, 100% 0, 0% 0)",
        invertedTrapezoid: "polygon(0 100%, 100% 100%, 85% 0, 15% 0)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".clip-trapezoid": {
          clipPath: "polygon(15% 100%, 85% 100%, 100% 0, 0% 0)",
        },
        ".clip-inverted-trapezoid": {
          clipPath: "polygon(0 100%, 100% 100%, 85% 0, 15% 0)",
        },
        // 'footer': 'polygon(100% 0, 85% 50%, 100% 100%, 0 100%, 0 0)',
        // 'footer-right': 'polygon(100% 0, 100% 100%, 10% 100%, 15% 50%, 10% 0)',
      });
    },
  ],
};
