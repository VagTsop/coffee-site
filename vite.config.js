import { defineConfig } from 'vite'

// Σε GitHub Pages το site ζει σε υποφάκελο (/coffee-site/), οπότε το base
// έρχεται από το περιβάλλον· τοπικά μένει στη ρίζα.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  server: { port: Number(process.env.PORT) || 5181 },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
})
