/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            minWidth: {
                'screen-xs': '320px',
            },
        }
    },
    plugins: [],
}
