# Chintia Birthday

A private, single-page birthday experience made by Bian for Chintia Aprian.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalize

- Replace `public/images/memories/memory-1.jpg` etc. with your own photos (or update the image paths in `src/app/page.tsx`).
- Put your own MP3 at `public/music/background.mp3`.
- Edit the letter text in `src/app/page.tsx`.
- Update the date and wording in `src/app/page.tsx` if needed.

The site works without photos or music. The music button stays available, but playback begins only after the visitor clicks it (browser autoplay policy).

## Production

```bash
npm run build
npm run start
```

Deploy the folder to Vercel or connect the Git repository.
