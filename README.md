# LeadLynx

A minimal lead & campaign management app containing a Node/Express backend and a Vite + React frontend.

This repository contains two main parts:

- `backend/` — REST API server (Node.js + Express, MongoDB) with authentication, campaigns and leads controllers, and email utilities.
- `frontend/` — Vite + React frontend that talks to the backend API.

## Table of contents

- Project overview
- Tech stack
- Quick start (Windows / PowerShell)
- Backend setup
- Frontend setup
- Environment variables
- API overview
- Project structure
- Troubleshooting
- Contributing
- License

## Project overview

LeadLynx is a simple CRM-style application for creating campaigns and capturing leads. The backend exposes authenticated REST endpoints and can send emails; the frontend is a small React app (Vite) that consumes those endpoints.

Use this README to get the project running locally and to understand where key pieces live.

## Tech stack

- Backend: Node.js, Express, MongoDB (Mongoose), JWT for auth, Nodemailer (email utility)
- Frontend: React, Vite
- Dev tools: npm, (optionally nodemon / vite dev server)

## Quick start (Windows PowerShell)

1. Start the backend

```powershell
cd backend
npm install
# If you have nodemon configured use: npm run dev
# otherwise start with node
node server.js
```

2. Start the frontend (in a new terminal)

```powershell
cd frontend
npm install
npm run dev
# open the local URL printed by Vite (usually http://localhost:5173)
```

Notes:

- Replace commands above with `npm start` or `npm run dev` if those scripts exist in the respective `package.json` files. The repository includes `server.js` in `backend/` and a Vite app in `frontend/`.

## Backend setup

1. Install dependencies

```powershell
cd backend
npm install
```

2. Create a `.env` in `backend/` (see Environment variables below)

3. Start the server

```powershell
node server.js
# or if a dev script with nodemon exists:
npm run dev
```

The backend server will start on the configured port (default 5000 if present in code). It exposes REST endpoints under `/api` (see API overview).

## Frontend setup

1. Install dependencies and run the dev server

```powershell
cd frontend
npm install
npm run dev
```

2. Build for production

```powershell
npm run build
# preview locally (if vite preview script available)
npm run preview
```

The frontend likely expects an environment variable pointing to the API base URL (see Environment variables). The Vite dev server will print the local URL (commonly `http://localhost:5173`).

## Environment variables

Create `.env` files in `backend/` and `frontend/` as needed. Example variables (adjust names according to actual code if different):

Backend (example `backend/.env`):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/leadlynx
JWT_SECRET=your_jwt_secret_here
# Optional email config (if sendEmail util used)
EMAIL_USER=you@example.com
EMAIL_PASS=supersecret
CLIENT_URL=http://localhost:5173
```

Frontend (example `frontend/.env` — Vite uses VITE\_ prefix):

```
VITE_API_URL=http://localhost:5000/api
```

If the frontend's `api.js` expects a different variable name, set that instead. The example above follows common conventions.

## API overview (high level)

The backend exposes REST endpoints for users, campaigns and leads. Expected endpoints (adjust paths if the project uses different prefixes):

- POST /api/users/register — register a new user
- POST /api/users/login — login (returns JWT)

- POST /api/campaigns — create campaign
- POST /api/:id/send - send campaign

- GET /api/leads — list leads
- POST /api/leads — create lead
- GET /api/leads/:id — get lead
- PUT /api/leads/:id — update lead
- DELETE /api/leads/:id — delete lead

Authentication is likely handled with JWT in an `Authorization: Bearer <token>` header for protected endpoints.

## Project structure (important files/folders)

- backend/

  - server.js — entry point for the API server
  - package.json — backend dependencies & scripts
  - config/db.js — database connection
  - controller/ — controllers for campaigns, leads, users
  - middleware/ — auth and error middleware
  - models/ — Mongoose models (campaign, lead, user)
  - routes/ — route definitions
  - utils/ — helper utilities (generateToken, sendEmail)

- frontend/
  - package.json — frontend dependencies & scripts
  - vite.config.js — Vite config
  - src/
    - api.js — API client wrapper
    - main.jsx, App.jsx — React app entry
    - components/ — React components (forms, navbar, routes)
    - pages/ — page views (Dashboard, Campaign, Leads, Login, Register)

## Troubleshooting

- Mongo connection errors: ensure `MONGO_URI` is correct and MongoDB is running.
- CORS issues: ensure the backend allows requests from the frontend origin (e.g., `http://localhost:5173`) or set `CLIENT_URL` and verify backend CORS middleware.
- JWT auth failures: confirm `JWT_SECRET` matches the one used to sign tokens and the token is sent with `Authorization: Bearer <token>`.
- Port conflicts: adjust `PORT` in the backend `.env` or the Vite dev server port in `frontend/package.json` or `vite.config.js`.

If you encounter errors, check the backend terminal for stack traces and confirm environment variables are set.

## Contributing

1. Fork the repo and create a feature branch.
2. Add or update tests where appropriate.
3. Create a clear commit message and open a pull request with a description of changes.

Small, incremental PRs are preferred. If you plan a larger change, open an issue first to discuss the approach.

## License

This project is provided under the MIT license. Adjust the license in the repo if a different one is required.
