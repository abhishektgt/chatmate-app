## ChatMate (Monorepo)

Modern chat app with a React frontend and a Node/Express + MongoDB backend, integrating Google Gemini for AI responses. The repo contains two apps:

- `chatmate/` — React (Create React App) frontend
- `backend/` — Express API with JWT auth, MongoDB (Mongoose), and Gemini integration


### Tech stack

- **Frontend**: React 19, React Router, CRA, Tailwind (via PostCSS), Axios
- **Backend**: Node.js, Express 5, Mongoose 8, JWT, Bcrypt, CORS, dotenv
- **AI**: `@google/generative-ai` (Gemini 2.5 Flash)
- **Database**: MongoDB (Atlas or local)


### Monorepo structure

```
backend/                # Express API
  server.js
  routes/
    auth.js             # signup, login
    chat.js             # protected chat -> Gemini
    message.js          # load/clear chat history (protected)
    user.js             # update user profile (protected)
  models/
    user.js
    message.js
  middleware/
    authMiddleware.js   # JWT Bearer verification
  package.json

chatmate/               # React web app (CRA)
  src/
    index.js, App.js, pages (login, signup, chat, etc.)
  tailwind.config.js, postcss.config.js
  package.json
```


### Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string (local or Atlas)
- A Google Gemini API key


### Quick start

Open two terminals (one for backend, one for frontend).

1) Backend

```
cd backend
npm install

# Create a .env file in backend/ with:
# MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
# JWT_SECRET=replace-with-a-strong-secret
# GEMINI_API_KEY=your-gemini-api-key
# PORT=5000

npm start
# Server runs at http://localhost:5000 (or your PORT)
```

2) Frontend

```
cd chatmate
npm install
npm start
# CRA dev server runs at http://localhost:3000
```

Notes:

- The backend has CORS enabled by default. If the frontend uses absolute URLs, ensure they point to the backend origin (e.g., http://localhost:5000).
- If the frontend expects relative `/api/*` calls, configure a CRA proxy in `chatmate/package.json` ("proxy": "http://localhost:5000") if needed.


### Environment variables (backend/.env)

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret string for signing JWTs
- `GEMINI_API_KEY` — Google Gemini API key
- `PORT` — API port (e.g., 5000)


### Available scripts

- Backend
  - `npm start` — start Express API (`backend/server.js`)

- Frontend
  - `npm start` — start CRA dev server
  - `npm build` — create production build
  - `npm test` — run tests (CRA default)


### API overview

Base URL: `http://localhost:<PORT>/api`

- Auth
  - `POST /auth/signup` — body: `{ name, email, password }`
  - `POST /auth/login` — body: `{ email, password }` → `{ token, user }`

- Chat (requires `Authorization: Bearer <token>`) 
  - `POST /chat` — body: `{ prompt, input }` → `{ reply }`
    - Persists the user message and the AI reply to `messages`

- Messages (requires auth)
  - `GET /messages` — returns all messages for the authenticated user
  - `DELETE /messages` — clears all messages for the authenticated user

- User (requires auth)
  - `PUT /user` — update non-sensitive fields on the user document


### Data models

- `User`
  - `name: string`
  - `email: string (unique)`
  - `password: string (hashed)`

- `Message`
  - `userId: ObjectId -> User`
  - `sender: "user" | "bot"`
  - `text: string`
  - `timestamp: Date (default now)`


### Security notes

- Store secrets only in `.env` (never commit them). Use strong `JWT_SECRET`.
- Use HTTPS and secure cookies/session settings in production.
- Validate and sanitize inputs if exposing the app publicly.


### Deployment

- Backend
  - Provide production `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, and `PORT` env vars
  - Run with a process manager (PM2) or a hosting platform (Render, Railway, Fly.io, etc.)

- Frontend
  - Build with `npm run build` in `chatmate/` and host the static files (Vercel, Netlify, S3, etc.)
  - Configure the frontend to call your deployed backend origin


### License

ISC — see `backend/package.json` for backend package metadata. If you need a different license for the whole repo, add it at the root.


