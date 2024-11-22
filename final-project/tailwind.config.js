/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', // Your React project source files
    ],
    theme: {
        extend: {
            keyframes: {
                shake: {
                    '0%, 100%': {transform: 'translateX(0) translateY(-50%)'},
                    '25%': {transform: 'translateX(-5px) translateY(-50%)'},
                    '75%': {transform: 'translateX(5px) translateY(-50%)'},
                }
            },
            maxWidth: {},
            backdropFilter: {
                'none': 'none',
                'blur': 'blur(12px)',
            },
            animation: {
                shake: 'shake 0.5s ease-in-out',
            }
        },
    },
    plugins: [
        require('tailwindcss-filters'),
    ],
}
