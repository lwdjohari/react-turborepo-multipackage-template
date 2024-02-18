import { defineConfig } from 'vite'
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
// import react from '@vitejs/plugin-react'  // if you want use ts for react build
import dts from 'vite-plugin-dts'
import react from "@vitejs/plugin-react-swc" // if you want use swc for react build
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: ['src'] })
  ],

  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      treeshake: false,
      plugins: [
        peerDepsExternal(), // new line
      ],
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "@emotion/react",
        '@emotion/styled',
        "@mui/icons-material",
        "@mui/joy"],
      input: Object.fromEntries(
        // https://rollupjs.org/configuration-options/#input
        glob.sync('src/**/*.{ts,tsx}').map(file => [
          // 1. The name of the entry point
          // lib/nested/foo.js becomes nested/foo
          relative(
            'src',
            file.slice(0, file.length - extname(file).length)
          ),
          // 2. The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
    }
  },
  optimizeDeps: {
    include: ['./src/grpc/tretacore_pb.js'],
    exclude: [
      'react',
      "react/jsx-runtime",
      'react-dom',
      '@emotion/react',
      '@emotion/styled',
      '@mui/icons-material',
      '@mui/joy',
    ], // Exclude peer dependencies
  },
})