import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(() => {
  const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

  return {
    base: isGithubActions && repository ? `/${repository}/` : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase' as const,
      },
    },
  };
});
