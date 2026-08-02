/**
 * Τα πρωτότυπα (raw/*.jpg) είναι φωτογραφίες από το Unsplash (δωρεάν άδεια,
 * επιτρέπεται η εμπορική χρήση χωρίς υποχρέωση αναφοράς). Το όνομα κάθε
 * αρχείου είναι το ID της φωτογραφίας: unsplash.com/photos/<id>.
 *
 * Εδώ κόβονται στο μέγεθος που χρειάζεται πραγματικά η σελίδα και βγαίνουν σε
 * WebP στο public/img.  Τρέξε: npm run images
 */
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const RAW = path.join(root, 'raw')
const OUT = path.join(root, 'public', 'img')

/** width = η μεγαλύτερη διάσταση που εμφανίζεται ποτέ στη σελίδα */
const jobs = [
  // hero: τραπεζάκια στο σοκάκι, βράδυ, ζεστά φωτισμένα παράθυρα
  { src: 'nMwm6JeNxTI.jpg', out: 'hero-night.webp', width: 2200, quality: 76 },
  { src: 'nMwm6JeNxTI.jpg', out: 'hero-night-sm.webp', width: 1100, quality: 70 },

  // ο χώρος
  { src: 'HVINLxwLjq0.jpg', out: 'window-night.webp', width: 1600, quality: 78 },
  { src: 'QGPmWrclELg.jpg', out: 'salon.webp', width: 1400, quality: 78 },
  { src: 'O3DBNp5Y6No.jpg', out: 'lace.webp', width: 1100, quality: 78 },
  { src: 'pZ5eAy15Jzc.jpg', out: 'chairs.webp', width: 1400, quality: 78 },
  { src: 'uTC91Stlz0o.jpg', out: 'booth.webp', width: 1100, quality: 78 },
  { src: 'UAMLs1jkhHY.jpg', out: 'lamp-table.webp', width: 1400, quality: 78 },
  { src: 'y8lpyoqT25Y.jpg', out: 'stone-bar.webp', width: 1400, quality: 78 },
  { src: 'RXHoY0ME2ws.jpg', out: 'interior-night.webp', width: 1400, quality: 78 },
  { src: 'e9lQxbCTMOQ.jpg', out: 'terrace.webp', width: 1100, quality: 78 },

  // κατάλογος
  { src: 'DOHT5g0-sJA.jpg', out: 'espresso.webp', width: 1100, quality: 80 },
  { src: '97vcPxQ1fPM.jpg', out: 'toast.webp', width: 1100, quality: 80 },
  { src: '1KJe0l1E0Lg.jpg', out: 'dessert.webp', width: 1100, quality: 80 },
  { src: 'cN9z6EBj_5o.jpg', out: 'negroni.webp', width: 1100, quality: 80 },
  { src: 'T7YNMuCNCwk.jpg', out: 'negroni-dark.webp', width: 1400, quality: 78 },

  // og:image — 1200×630 crop
  { src: 'nMwm6JeNxTI.jpg', out: 'og.jpg', width: 1200, height: 630, quality: 82, jpeg: true },
]

async function run() {
  await mkdir(OUT, { recursive: true })

  for (const job of jobs) {
    const pipeline = sharp(path.join(RAW, job.src)).resize({
      width: job.width,
      height: job.height,
      fit: job.height ? 'cover' : 'inside',
      withoutEnlargement: true,
    })

    const encoded = job.jpeg
      ? pipeline.jpeg({ quality: job.quality, mozjpeg: true })
      : pipeline.webp({ quality: job.quality })

    const info = await encoded.toFile(path.join(OUT, job.out))
    console.log(
      `${job.out.padEnd(22)} ${String(info.width).padStart(4)}×${String(info.height).padEnd(4)}  ${(info.size / 1024).toFixed(0)} kB`,
    )
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
