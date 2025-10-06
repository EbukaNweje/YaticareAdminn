// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
        
      },
      screens: {
        'phone' : {'max':'480px'},
        'tablet' : '1024px',
        'desktop' : '1280px',
        'smallphone': '351px'
      },
      
  },
  plugins: [],
};
