export default function AboutPage({ week1StartDate, week1Idea }) {
  const fmtDate = (value) => {
    try {
      if (!value) return ''
      let d
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const [y, m, day] = value.split('-').map(Number)
        d = new Date(y, m - 1, day)
      } else {
        d = new Date(value)
      }
      return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
    } catch { return value }
  }

  return (
    <div className="about-page">
      <div className="about-container">
        <h2 className="about-title">About This Build</h2>
        <p className="about-week-label">Week 1 — The Planner</p>

        {week1StartDate && (
          <div className="about-section">
            <label className="about-label">Your Journey</label>
            <p className="about-text">
              Your journey started on <strong>{fmtDate(week1StartDate)}</strong>
              {week1Idea && <> with the idea: <strong>{week1Idea}</strong></>}
            </p>
          </div>
        )}

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
