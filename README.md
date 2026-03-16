# 💧 AquaSave

> A water-conservation education platform with interactive tools, practical tips, and API-backed experiences that help people understand and reduce their water footprint.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)

---

## Features

- **Water Facts** — Key statistics about global water usage and scarcity.
- **Source-Backed Calculator** — Calculates your household water footprint with EPA/ENERGY STAR sourced figures.
- **Social Sharing** — Share results via WhatsApp, X, Facebook, LinkedIn, or clipboard.
- **Quick Quiz** — Randomised questions from a curated bank or AI-generated via Gemini.
- **Leaderboard** — Persistent scores stored through the backend API.
- **Nearby Reports Map** — See and submit water-wastage reports using geolocation and Leaflet.
- **AI Chat Assistant** — Gemini-powered chatbot for water conservation Q&A.
- **Conservation Tips & Checklist** — Practical advice across bathroom, kitchen, outdoor, and general categories.
- **Responsive Design** — Works on desktop, tablet, and mobile.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend (local) | Node.js, Express |
| Backend (deployed) | Netlify Functions (serverless) |
| AI | Google Gemini 2.5 Flash |
| Maps | Leaflet + OpenStreetMap |
| Data | Local JSON files (swappable with a database) |

---

## Project Structure

```
├── index.html              # Main page
├── leaderboard.html        # Standalone leaderboard page
├── styles.css              # All styles
├── script.js               # Frontend logic
├── package.json            # Root dependencies
├── netlify.toml            # Netlify build & redirect config
│
├── data/                   # JSON data layer
│   ├── calculator-sources.json
│   ├── quiz-questions.json
│   ├── quiz-leaderboard.json
│   └── wastage-reports.json
│
├── server/                 # Express dev server
│   ├── server.js
│   └── package.json
│
└── netlify/functions/      # Serverless functions (deployed)
    ├── shared.js
    ├── gemini.js
    ├── calculator-metadata.js
    ├── quiz-questions.js
    ├── quiz-leaderboard.js
    ├── quiz-submit-score.js
    └── wastage-reports.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Google Gemini API key](https://ai.google.dev/)
- (Optional) [Netlify CLI](https://docs.netlify.com/cli/get-started/) for local serverless testing

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/aquasave.git
cd aquasave
```

### 2. Install dependencies

```bash
npm install
cd server && npm install && cd ..
```

### 3. Set up environment variables

Create **`server/.env`** for the Express server:

```env
GEMINI_API_KEY=your_api_key_here
```

For Netlify (local or deployed), set the same key as an environment variable:

```bash
# Local: create a .env file in the project root
echo "GEMINI_API_KEY=your_api_key_here" > .env

# Deployed: set via Netlify dashboard → Site settings → Environment variables
```

### 4. Run locally

**Option A — Express server (port 3000):**

```bash
cd server
node server.js
```

Open `http://localhost:3000`

**Option B — Netlify Dev (port 8888):**

```bash
netlify dev
```

Open `http://localhost:8888`

> **Note:** Do not open `index.html` directly as a `file://` URL. The calculator, quiz, leaderboard, AI assistant, and reports features all require API endpoints.

---

## Deployment

### Deploy to Netlify

1. Push the repository to GitHub.
2. Go to [app.netlify.com](https://app.netlify.com/) → **Add new site** → **Import an existing project**.
3. Connect your GitHub repo.
4. Build settings are auto-detected from [`netlify.toml`](netlify.toml):
   - **Publish directory:** `.`
   - **Functions directory:** `netlify/functions`
5. Add the environment variable `GEMINI_API_KEY` under **Site settings → Environment variables**.
6. Click **Deploy site**.

Every push to your main branch will trigger an automatic redeploy.

### Deploy to Other Platforms

AquaSave is static HTML + serverless functions, so it can also be adapted for:

- **Vercel** — Convert Netlify functions to `/api` directory functions.
- **GitHub Pages** — Frontend only (API features require a separate backend host).
- **Railway / Render** — Use the Express server in `server/` as a standalone backend.

---

## API Endpoints

All routes are available via Express (`/api/...`) and Netlify Functions (auto-redirected by [`netlify.toml`](netlify.toml)).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calculator-metadata` | Calculator factors with source provenance |
| GET | `/api/quiz/questions?count=6&mode=curated` | Curated quiz questions |
| GET | `/api/quiz/questions?count=6&mode=ai` | AI-generated questions via Gemini |
| GET | `/api/quiz/leaderboard` | Top leaderboard entries |
| POST | `/api/quiz/submit-score` | Save a quiz score |
| GET | `/api/wastage-reports?lat=...&lng=...&radiusKm=5` | Nearby reports by location |
| POST | `/api/wastage-reports` | Submit a new report |
| POST | `/api/gemini` | AI chat proxy |

---

## Calculator Methodology

The calculator reads factors from [`data/calculator-sources.json`](data/calculator-sources.json) and shows provenance in a collapsible panel.

- **Verified** — Sourced from EPA WaterSense, ENERGY STAR, and similar public references.
- **Estimate** — AquaSave planning assumptions where no single universal standard exists, clearly labelled.

---

## Customization

- **Contact form** — Update the Formspree endpoint in [`index.html`](index.html).
- **Quiz bank** — Extend [`data/quiz-questions.json`](data/quiz-questions.json).
- **Calculator factors** — Edit [`data/calculator-sources.json`](data/calculator-sources.json).
- **Database** — Replace local JSON files with MongoDB, Supabase, or Netlify Blobs for production persistence.

---

## Team

Designed and developed by **Ayush Singh**, **Kunal Datkhile**, **Prathmesh Achare**, and **Alby John**.

## License

MIT License.

*Made with 💙 of our planet*
