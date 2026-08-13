# Level-Up

Level-Up is a small learning platform that helps users practice short-answer questions, track progress (XP and rank), and level up skills. This repository contains a frontend (static HTML/CSS/JS) and a Node.js/Express backend that uses MongoDB and Google GenAI (Gemini) to generate and check questions.

This is a fork of [TapuRoy007/Level-Up](https://github.com/TapuRoy007/Level-Up).

---

## Contents

- Frontend/ — static frontend (index.html, styles, scripts, assets)
- Backend/ — Express API, Mongoose models, uses Google Gemini and Nodemailer

---

## Technologies

- JavaScript (Node.js, Express)
- MongoDB (via Mongoose)
- Google GenAI (Gemini) via `@google/genai`
- bcrypt for password hashing
- nodemailer for sending security pin emails
- CORS, express-rate-limit
- Frontend: HTML, CSS, JavaScript

---

## Features (backend)

- Generate short-answer questions from a subject using Gemini
- Check user answers using Gemini
- User registration with security pin emailed to user
- Login with rate limiting
- User dashboard: fetch and save subjects, tasks, XP and rank

---

## API (summary)

Base URL: http://localhost:5000 (default backend port)

- POST /api/gemini/test
  - Rate-limited (5 minutes window, max 2 requests)
  - Request body: { subject: string }
  - Response: JSON array of generated questions

- POST /api/gemini/check
  - Request body: { answers: [...] }
  - Response: JSON result with true/false for each answer

- POST /api/register
  - Request body: { email, username, password }
  - Creates user, generates security pin, emails pin, creates default Task document

- POST /api/login
  - Request body: { email, password }
  - Rate-limited for login attempts

- POST /api/user/dashboard
  - Request body: { pin } (security pin)
  - Returns user details, subject, tasks, rank, XP

- POST /api/user/dashboard/saveData
  - Request body: { pin, subject, tasks, rank, XP }
  - Saves dashboard data for authenticated user by pin

---

## Getting started (development)

### Prerequisites

- Node.js (16+ recommended)
- npm
- MongoDB instance (Atlas or local)
- Google Gemini API access and API key (if you want AI features)
- SMTP account (Gmail or other) for sending security pin emails

### Backend setup

1. Open a terminal and change to the Backend directory:

   cd Backend

2. Install dependencies:

   npm install

3. Create a .env file in Backend/ with the following variables:

   MONGO_URI=your_mongo_connection_string
   GEMINI_API=your_google_gemini_api_key
   SMTP_USER=your_smtp_user@example.com
   SMTP_PASS=your_smtp_password

4. Start the server:

   node index.js

The server listens on port 5000 by default.

### Frontend

The frontend is a static site in Frontend/. You can open Frontend/index.html directly in a browser or serve it from a static server. Update the frontend to point to your backend base URL if needed.

---

## Notes and security

- The backend currently uses a security pin stored in user documents for dashboard actions. Treat this pin carefully and consider replacing this flow with token-based authentication (JWT) for production.
- Do NOT commit real API keys, passwords, or SMTP credentials to the repository. Use environment variables or a secrets manager.
- Rate limits are applied to reduce abuse: AI endpoints (2 requests per 5 minutes) and login attempts (10 attempts per 2 minutes).

---

## Contributing

Contributions are welcome. Please open issues or pull requests describing the change.

---

## License

This repository does not include a license file. Add a LICENSE file if you want to define usage permissions.

---

## Contact

Repo owner: [Souvik2857](https://github.com/Souvik2857)

If you forked this project from TapuRoy007, consider acknowledging the original author and linking back to the original repo.