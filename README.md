# 52 Builds Tracker — Week 01: The Planner

A drag-and-drop weekly planner for tracking the "52 apps in 52 weeks before I turn 52" project by Hey I'm Papa.

## Features

- Drag and drop ideas from the backlog into any of the 52 weekly slots
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

## Appendix: Prompts Used to Build This

### Prompt 1 — Initial Build

```
Build a "52 Builds Tracker" web app using React.
This is Week 0/1 of a project called "52 apps in 52 weeks
before I turn 52" by Hey I'm Papa.

STRUCTURE:
This app will live at /week01 subfolder of a future domain.
Build it as a standalone React app that can be deployed
to Vercel.

LAYOUT - three columns side by side:
1. IDEAS BACKLOG - a list of app ideas not yet scheduled
2. WEEKLY SCHEDULE - weeks 1 through 52, each as a row
   with a slot for one app
3. STATUS column visible within the schedule rows

FEATURES:
- Drag and drop: user can drag an idea card from the
  Backlog and drop it into any week slot in the Schedule
- Each idea card shows: App name, short description
  (one line), Status dropdown
- Status dropdown options: Backlog, Analysis,
  In Progress, Done
- Each status has a different colour:
  Backlog = grey, Analysis = yellow,
  In Progress = blue, Done = green
- User can add new idea cards to the backlog
  (simple text input + add button)
- User can add a short note/comment to each card
- Data persists in localStorage so it survives
  page refresh
- Metrics: implement Google Analytics GA4 tracking.
  After building, provide simple plain-English
  instructions (not code) explaining exactly what
  I need to do to activate it with my own
  Google Analytics account

DESIGN:
- Clean, minimal, dark mode
- Mobile-friendly but primarily desktop use
- Each week row should show the week number,
  date range (starting from today's date as week 1),
  and the dropped app card if one exists

PRE-POPULATE with these example ideas in the backlog:
- Portfolio Tracker
- Receipt Analyser
- Melbourne Suburb Scorer
- Flappy Tram
- Flight Deal Watcher
- Cat Health Log

Week 1 should already show "The Planner" as In Progress.
Week 2 should show "Flappy Tram" as Analysis.
```

### Prompt 2 — About Page

```
Add a second page to the app called "About This Build".
It should be accessible via a simple tab or button at
the top of the app, toggling between the Planner view
and this About page.
This About page layout will be reused as a template
for all 52 weekly apps, so build it cleanly.
THE PAGE SHOULD CONTAIN THESE SECTIONS:
1. THE PROBLEM
   - A short text field (editable, a few sentences)
   - Label: "What problem does this solve?"
2. THE APPROACH
   - A short text field (editable, a few sentences)
   - Label: "How did I approach it?"
3. THE PROMPT
   - A larger text area (editable)
   - Label: "The prompt I used to build this"
   - Monospace font, like a code block
   - Include a "Copy to clipboard" button
4. THE BUILD
   - Label: "What got built in one week?"
   - Short editable text field
5. WHAT I'D DO DIFFERENTLY
   - Short editable text field
6. GITHUB LINK
   - An editable text input where I can paste
     a GitHub repo URL
   - Displays as a clickable button/link
     that opens in a new tab
   - Label: "View on GitHub"
ALL FIELDS should be editable inline (click to edit)
and save to localStorage so content persists
on page refresh.
PRE-POPULATE the fields with the Week 1 content:
- Problem: "I needed a way to plan, track and
  showcase 52 weekly app builds without relying
  on external tools like Trello."
- Approach: "Built a drag and drop planner in React
  as the first build itself - using the tool to
  plan the project."
- Build: "A weekly planner with drag and drop
  scheduling, status tracking, and this About
  page template for all future builds."
- What I'd do differently: "To be completed
  after the build is done."
- GitHub link: placeholder text "paste your
  GitHub URL here"
DESIGN: match the dark mode minimal style
of the main planner page.
```

### Prompt 3 — Bug Fixes & Restructure

```
Can you fix a few small issues:
1) The drag and drop only works if I drop to the Week
   area, not to the App column (where the app says to
   drop the idea there). Can you make sure I can drop
   there too?
2) The Status already shows when I select the dropdown,
   I don't need a secondary column at the end, no
   benefit in seeing Status twice
3) The README has only the Prompts I used, that should
   be only the "Appendix", the end part of it. I
   actually would like to have a normal instructions
   on how to install it for someone locally, how to
   add Google analytics.
4) And then a major problem. While this is a 52 week
   program and on my domain I actually want to put
   this under a week01 folder - but here it doesn't
   make any sense. I will have 52 different Github
   repos, not adding 51 other folders here. Can you
   please move back everything to the main folder
   from here and instruct me, what else do I need to
   do to make this work?
```

### Prompt 4 — Multi-Status Tracking

```
Thank you, I merged to main.
In a new branch please, work on the following:
1) In the README.MD add my previous issuefixing
   request, and also this prompt, what I am writing
   now to be fully transparent. Hopefully this will
   show also how my prompt-writing evolves this year
2) I just realised that I need to track not only the
   coding, but also the LinkedIn posting and the
   YouTube videos as well. So I'd like to have three
   status setting dropdown.
   a) Development (and please add "Testing" as a new
      status in there)
   b) LinkedIn (just add To Do, Draft, Published)
   c) YouTube (just add To Do, In progress, Published)
   Use similar colour schemes (to do is grey,
   In Progress / Draft is blue, Published is Green)
```

### Prompt 5 — Drag & Drop Fix (again)

```
The drag and drop broke again, not working reliably.
Please make sure I can drag & drop, independent under
which heading (week or app or any that we may make).
Also, as usual, add this error fixing prompt to the
end of the readme.
```
