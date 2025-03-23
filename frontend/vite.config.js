
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
//export default defineConfig({
//  plugins: [react(), tailwindcss()],

//});
export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    loader: 'jsx', // This will treat .js files as JSX
    include: /src\/.*\.js/, // Ensure this is applied to .js files inside your src folder
  },
});

