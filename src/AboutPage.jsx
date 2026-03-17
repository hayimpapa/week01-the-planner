export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h2 className="about-title">About This Build</h2>
        <p className="about-week-label">Week 1 — The Planner</p>

        <div className="about-section">
          <label className="about-label">The Problem</label>
          <p className="about-text">
            I needed a way to plan, track and showcase 52 weekly app builds
            without relying on external tools like Trello. Something purpose-built
            for the challenge that could serve as both a planning tool and a
            portfolio of everything I ship.
          </p>
        </div>

        <div className="about-section">
          <label className="about-label">The App</label>
          <p className="about-text">
            A drag-and-drop weekly planner built in React that lets you schedule
            app ideas across 52 weeks, track their status from backlog to done,
            and keep notes along the way. It&apos;s the first build of the challenge
            — built to plan the rest.
          </p>
        </div>

        <div className="about-section">
          <label className="about-label">The Prompt</label>
          <a
            className="about-link"
            href="https://github.com/hayimpapa/week01-the-planner/blob/main/PROMPTS.txt"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the prompt used to build this app
          </a>
        </div>

        <div className="about-section">
          <label className="about-label">GitHub Repo</label>
          <a
            className="about-github-btn"
            href="https://github.com/hayimpapa/week01-the-planner"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
