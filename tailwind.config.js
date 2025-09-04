/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                sidebar: "300px auto",
                "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
            },
            fontFamily: {
                tb: ["Plus Jakarta Sans", "sans-serif"],
                tbLex: ["Lexend", "sans-serif"],
                tbPop: ["Poppins", "sans-serif"],
                tbMon: ["Montserrat", "sans-serif"],
            },
            backgroundColor: {
                'primary': '#007bff',
                'primary-light': '#d3e8ff',
                'base-bg': '#F4F7FE',
                'slate1': '#eff2fa',
            },
            colors: {
                'primary': '#007bff',
                'primary-light': '#d3e8ff',
                'light-pg': '#8D97B5',
                'slate1': '#eff2fa',

            }
        },
    },
    plugins: [],
};
