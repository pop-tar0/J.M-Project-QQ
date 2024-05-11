const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('./colors');

module.exports = {
    purge: ['./public/**/*.html'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            opacity: {
                80: '0.8',
            },
            borderRadius: {
                none: '0',
                lg: '0.5rem',
                xl: '22px',
                full: '9999px',
            },
            fontSize: {
                '2xs': '0.625rem', // 10px
                xs: '0.75rem', // 12px
                sm: '0.875rem', // 14px
                base: '1rem', // 16px
                lg: '1.125rem', // 18px
                xl: '1.25rem', // 20px
                '2xl': '1.5rem', // 24px
            },
        },
        colors: {
            'sky-blue': '#d1e8f0',
            'navy-blue': '#002C55',
            black: '#000000',
            white: '#ffffff',
            gray: {
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
            },
        },
    },
    variants: {},
    plugins: [require('@tailwindcss/custom-forms')],
};
