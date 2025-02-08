import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

function stubNextAssetImport() {
  return {
    name: 'stub-next-asset-import',
    transform(_code, id) {
      // eslint-disable-next-line
      if (/(jpg|jpeg|png|webp|gif|svg)$/.test(id)) {
        return {
          code: `export default { src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', height: 1, width: 1 }`,
        };
      }
    },
  };
}

const config = defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ ignoreConfigErrors: true }),
    stubNextAssetImport(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    passWithNoTests: true,
    setupFiles: [new URL('./vitest.setup.ts', import.meta.url).pathname],
  },
});

export default config;
