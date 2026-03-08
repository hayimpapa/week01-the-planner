# 52 Builds Tracker — Week 01: The Planner

A drag-and-drop weekly planner for tracking the "52 apps in 52 weeks before I turn 52" project by Hey I'm Papa.

## Features

- Drag and drop ideas from the backlog into any of the 52 weekly slots (with overwrite/insert handling for occupied weeks)
- Three status trackers per idea: Development, LinkedIn, YouTube
- Add new app ideas on the fly
- Notes on each card
- "About This Build" page template (reusable across all 52 builds)
- All data persists in localStorage
- Dark mode, minimal design
- Google Analytics GA4 support (optional)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### Install & Run Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/week01-the-planner.git
cd week01-the-planner

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder, ready to deploy.

### Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel will auto-detect Vite — just click **Deploy**
4. Your app will be live at your Vercel URL

## Setting Up Google Analytics

The app has built-in GA4 support. To activate it:

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new **GA4 property** (or use an existing one)
3. Go to **Admin > Data Streams > Web** and create a stream for your domain
4. Copy the **Measurement ID** (looks like `G-XXXXXXXXXX`)
5. Create a `.env` file in the project root (copy from `.env.example`):
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
6. Restart the dev server (`npm run dev`) — analytics is now active
7. For Vercel: add `VITE_GA_MEASUREMENT_ID` as an environment variable in your project settings

## Project Structure

```
├── src/
│   ├── main.jsx          # App entry point + GA init
│   ├── App.jsx           # Planner with drag-and-drop
│   ├── AboutPage.jsx     # About This Build page (reusable template)
│   └── styles.css        # All styles (dark theme)
├── index.html            # HTML shell
├── vite.config.js        # Vite config
├── package.json
└── .env.example          # GA4 env var template
```

---

## Prompts Used to Build This

All prompts used to build this app are documented in [PROMPTS.txt](PROMPTS.txt) — full transparency on the AI-assisted development process and how prompt-writing evolves over the project.
