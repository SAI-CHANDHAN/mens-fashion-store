# Brothers Fashion Hub Store

Men's fashion storefront with Firebase Auth/Firestore and Cloudinary image uploads.

## App Setup

1. Install dependencies:

```bash
npm install
```

2. Add frontend environment values in `.env`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_WHATSAPP_PHONE=...
VITE_CLOUDINARY_CLOUD_NAME=...
VITE_CLOUDINARY_UPLOAD_PRESET=...
```

An example template is available in `.env.example`.

3. Run the app:

```bash
npm run dev
```

## Vercel Deployment

1. Add the same `VITE_` environment variables in your Vercel Project Settings.
2. Keep SPA fallback routing using `vercel.json` so refresh works on nested routes.
3. Deploy with build command `npm run build` and output directory `dist`.
