# Malik Muhammad Kashan — Portfolio

A responsive full-stack portfolio built with React + Vite on the frontend and Node.js + Express on the backend.

## Architecture

The repo follows a practical Clean Architecture / dependency-direction approach:

- `domain`: business entities and rules; framework agnostic.
- `application`: use-cases that orchestrate domain behavior.
- `infrastructure`: HTTP clients, repositories, and framework adapters.
- `presentation`: React pages/components on the frontend, Express controllers/routes on the backend.
- `shared`: only truly cross-cutting frontend utilities such as API contracts and UI primitives.

The important dependency rule is: UI/controllers depend on application use-cases; use-cases depend on domain; infrastructure implements interfaces rather than becoming the source of business logic.

## Run locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:4000`

Copy `.env.example` to `.env` in both apps when you want custom URLs.

## Add your image

Put your photo at:

`apps/web/public/images/malik-muhammad-kashan.jpg`

The UI already has an accessible image placeholder and falls back to the placeholder when the file is missing.

## LinkedIn note

The supplied LinkedIn page was not directly retrievable during generation, so this starter intentionally does not invent experience, education, skills, or contact details. Replace the placeholder profile data in:

`apps/web/src/presentation/data/profile.ts`

with the exact information from your profile.

## Contact form

The contact form posts to:

`POST /api/contact`

The API currently validates and logs the message. Wire the use-case to your mail provider when you are ready.

## Production

Build both apps:

```bash
npm run build
```

Serve the API with:

```bash
npm start
```

Set `VITE_API_BASE_URL` in the frontend for a hosted API.
