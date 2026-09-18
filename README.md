# Student Notes CRUD Micro-App

MERN lab: React + Express + MongoDB notes manager.

- **Name:** Bathula Nithin Reddy
- **Roll Number:** 2026201038
- **GitHub Repository:** [github.com/innith/student-notes](https://github.com/innith/student-notes)


## Tech stack

- MongoDB database: `notes_db` at `mongodb://localhost:27017/notes_db`
- Express API on port `5000`
- Vite React client on port `5173`

## Database schema (`Note`)

| Field     | Type   | Notes                    |
|-----------|--------|--------------------------|
| title     | String | required                 |
| content   | String | required                 |
| createdAt | Date   | default `Date.now`       |

## REST endpoints

- `POST /api/notes` — create note, returns `201`
- `GET /api/notes` — list notes sorted by `createdAt: -1`
- `DELETE /api/notes/:id` — delete by `_id`, returns `200` or `404`

## Setup and Run

Prerequisites: Node.js, npm, and a local MongoDB daemon listening on port `27017`.

```bash
# Server
cd server
npm install
npm start

# Client (new terminal, from notes-app/)
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.


