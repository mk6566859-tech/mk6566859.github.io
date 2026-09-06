import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repo = process.env.GITHUB_REPOSITORY || '';
const owner = repo.split('/')[0] || '';
const repoName = repo.split('/')[1] || '';
const isUserPage = repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`;

export default defineConfig({
  plugins: [react()],
  base: repoName ? (isUserPage ? '/' : `/${repoName}/`) : '/',
});
