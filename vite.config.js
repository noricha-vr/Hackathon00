import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    define: {
        'process.env.PUBLIC_GOOGLE_ANALYTICS_ID': JSON.stringify(process.env.PUBLIC_GOOGLE_ANALYTICS_ID),
    },
    server: {
        fs: {
            // プロジェクトのルートディレクトリからの相対パスを使用
            allow: ['static']
        }
    },
});
