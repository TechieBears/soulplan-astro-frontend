export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                sidebar: "300px auto",
                "sidebar-collapsed": "64px auto",
            },
            fontFamily: {
                tb: ["Plus Jakarta Sans", "sans-serif"],
                tbLex: ["Lexend", "sans-serif"],
                tbPop: ["Poppins", "sans-serif"],
                tbMon: ["Montserrat", "sans-serif"],
            },
            backgroundColor: {
                'primary': '#4f46e5',
                'primary-light': '#d3e8ff',
                'base-bg': '#F4F7FE',
                'slate1': '#eff2fa',
            },
            colors: {
                'primary': '#4f46e5',
                'primary-light': '#d3e8ff',
                'light-pg': '#8D97B5',
                'slate1': '#eff2fa',
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(90deg, #0079D0 -12.5%, #9E52D8 30.84%, #DA365C 70.03%, #D04901 111%)',
                'blue-red': 'linear-gradient(90deg, #2563eb 0%, #dc2626 100%)',
                'purple-red': 'linear-gradient(90deg, #9333ea 0%, #dc2626 100%)',
                'blue-purple-red': 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ef4444 100%)',
            }
        },
    },
    plugins: [],
};
