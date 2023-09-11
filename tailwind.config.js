/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'PE_dark_primary': '#111827',
                'PE_dark_secondary': '#1f2937',
                'PE_dark_white': '#f1f5f9',
                'PE_dark_gray': '#cbd5e1',
                'PE_dark_border': '#374151',
                'PE_dark_green': '#10b981',
                'PE_dark_red': '#ef4444',
                'PE_dark_yellow': '#eab308',
                'PE_dark_blue': '#3b82f6',
                'PE_dark_accent': '#2563eb',
                'PE_dark_accent_pressed': '#1d4ed8',
                'PE_dark_scrollbar': '#475569',
                'PE_dark_scrollbar_pressed': '#64748b',
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar")({ nocompatible: true }),
    ],
}