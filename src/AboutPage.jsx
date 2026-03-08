import { useState, useEffect } from 'react'

const ABOUT_STORAGE_KEY = '52builds-about-data'

const DEFAULT_ABOUT = {
  problem:
    'I needed a way to plan, track and showcase 52 weekly app builds without relying on external tools like Trello.',
  approach:
    'Built a drag and drop planner in React as the first build itself - using the tool to plan the project.',
  prompt: '',
  build:
    'A weekly planner with drag and drop scheduling, status tracking, and this About page template for all future builds.',
  differently: 'To be completed after the build is done.',
  github: 'paste your GitHub URL here',
}

function EditableField({ label, question, value, onChange, multiline, mono }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    const commonProps = {
      className: `about-input${mono ? ' mono' : ''}`,
      value,
      onChange: (e) => onChange(e.target.value),
      onBlur: () => setEditing(false),
      autoFocus: true,
    }

    return (
      <div className="about-section">
        <label className="about-label">{label}</label>
        {question && <p className="about-question">{question}</p>}
        {multiline ? (
          <textarea {...commonProps} rows={8} />
        ) : (
          <input type="text" {...commonProps} />
        )}
      </div>
    )
  }

  return (
    <div className="about-section" onClick={() => setEditing(true)}>
      <label className="about-label">{label}</label>
      {question && <p className="about-question">{question}</p>}
      <div className={`about-value${mono ? ' mono' : ''}${!value ? ' placeholder' : ''}`}>
        {value || 'Click to edit...'}
      </div>
    </div>
  )
}

export default function AboutPage() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(ABOUT_STORAGE_KEY)
      if (saved) return { ...DEFAULT_ABOUT, ...JSON.parse(saved) }
    } catch {}
    return DEFAULT_ABOUT
  })

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const update = (field) => (value) =>
    setData((prev) => ({ ...prev, [field]: value }))

  const copyPrompt = () => {
    navigator.clipboard.writeText(data.prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const isValidUrl = (str) => {
    try {
      const url = new URL(str)
      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch {
      return false
    }
  }

  return (
    <div className="about-page">
      <div className="about-container">
        <h2 className="about-title">About This Build</h2>
        <p className="about-week-label">Week 1 — The Planner</p>

        <EditableField
          label="The Problem"
          question="What problem does this solve?"
          value={data.problem}
          onChange={update('problem')}
        />

        <EditableField
          label="The Approach"
          question="How did I approach it?"
          value={data.approach}
          onChange={update('approach')}
        />

        <div className="about-section">
          <label className="about-label">The Prompt</label>
          <p className="about-question">The prompt I used to build this</p>
          <div className="prompt-wrapper">
            <EditableField
              value={data.prompt}
              onChange={update('prompt')}
              multiline
              mono
            />
            <button className="copy-btn" onClick={copyPrompt}>
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </button>
          </div>
        </div>

        <EditableField
          label="The Build"
          question="What got built in one week?"
          value={data.build}
          onChange={update('build')}
        />

        <EditableField
          label="What I'd Do Differently"
          value={data.differently}
          onChange={update('differently')}
        />

        <div className="about-section">
          <label className="about-label">GitHub Link</label>
          <div className="github-row">
            <EditableField
              value={data.github}
              onChange={update('github')}
            />
            {isValidUrl(data.github) && (
              <a
                className="github-btn"
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
