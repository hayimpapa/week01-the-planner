# week01-the-planner

A simple planning application that I can use to track my "52 apps in 52 weeks before I turn 52" project.

## Prompts Used to Build This

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

Can you please also add the original prompt and this prompt into the README file to show what prompts were used to create the code?
```
