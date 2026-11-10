import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const THREE_DEPS = ['/three/', '/@react-three/', '/three-stdlib/', '/troika-', '/camera-controls/', '/maath/', '/meshline/', '/@monogrid/', '/stats-gl/', '/three-mesh-bvh/', '/@use-gesture/'];
const VENDOR_DEPS = ['/react/', '/react-dom/', '/scheduler/', '/react-router/', '/react-router-dom/', '/@remix-run/', '/motion/', '/framer-motion/', '/motion-dom/', '/motion-utils/', '/lenis/', '/react-helmet-async/', '/@babel/runtime/', '/tslib/', '/invariant/', '/shallowequal/', '/react-fast-compare/'];

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('vite/preload-helper') || id.includes('commonjsHelpers') || id.includes('vite/modulepreload-polyfill')) return 'vendor';
          if (!id.includes('node_modules')) return undefined;
          if (VENDOR_DEPS.some((d) => id.includes(`node_modules${d}`))) return 'vendor';
          if (THREE_DEPS.some((d) => id.includes(`node_modules${d}`))) return 'three';
          return undefined;
        },
      },
    },
  },
});
