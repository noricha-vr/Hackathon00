import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        fs: {
            // プロジェクトのルートディレクトリからの相対パスを使用
            allow: ['static']
        }
    },
});
