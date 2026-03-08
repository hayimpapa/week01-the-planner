import { useState, useEffect, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import ReactGA from 'react-ga4'
import AboutPage from './AboutPage.jsx'

const DEV_STATUSES = ['Backlog', 'Analysis', 'In Progress', 'Testing', 'Done']
const LINKEDIN_STATUSES = ['To Do', 'Draft', 'Published']
const YOUTUBE_STATUSES = ['To Do', 'In Progress', 'Published']

const DEV_STATUS_CLASS = {
  Backlog: 'backlog',
  Analysis: 'analysis',
  'In Progress': 'in-progress',
  Testing: 'testing',
  Done: 'done',
}

const CONTENT_STATUS_CLASS = {
  'To Do': 'todo',
  Draft: 'draft',
  'In Progress': 'in-progress',
  Published: 'published',
}

function getWeekDates(weekIndex) {
  const start = new Date(2026, 2, 8) // March 8, 2026 — today
  start.setDate(start.getDate() + weekIndex * 7)
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  const fmt = (d) =>
    d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
  return `${fmt(start)} – ${fmt(end)}`
}

const DEFAULT_BACKLOG = [
  { id: 'idea-1', name: 'Portfolio Tracker', description: 'Track investment portfolio performance', status: 'Backlog', linkedin: 'To Do', youtube: 'To Do', note: '' },
  { id: 'idea-2', name: 'Receipt Analyser', description: 'Scan and categorise receipts with OCR', status: 'Backlog', linkedin: 'To Do', youtube: 'To Do', note: '' },
  { id: 'idea-3', name: 'Melbourne Suburb Scorer', description: 'Rate and compare Melbourne suburbs', status: 'Backlog', linkedin: 'To Do', youtube: 'To Do', note: '' },
  { id: 'idea-4', name: 'Flight Deal Watcher', description: 'Monitor and alert on cheap flight deals', status: 'Backlog', linkedin: 'To Do', youtube: 'To Do', note: '' },
  { id: 'idea-5', name: 'Cat Health Log', description: 'Track cat health records and vet visits', status: 'Backlog', linkedin: 'To Do', youtube: 'To Do', note: '' },
]

const DEFAULT_SCHEDULE = Array.from({ length: 52 }, (_, i) => {
  if (i === 0)
    return {
      idea: {
        id: 'idea-planner',
        name: 'The Planner',
        description: 'This app — 52 Builds Tracker',
        status: 'In Progress',
        linkedin: 'To Do',
        youtube: 'To Do',
        note: '',
      },
    }
  if (i === 1)
    return {
      idea: {
        id: 'idea-flappy',
        name: 'Flappy Tram',
        description: 'Flappy Bird clone with Melbourne trams',
        status: 'Analysis',
        linkedin: 'To Do',
        youtube: 'To Do',
        note: '',
      },
    }
  return { idea: null }
})

const STORAGE_KEY = '52builds-tracker-data'
const CONFLICT_PREF_KEY = '52builds-conflict-pref'

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return null
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function loadConflictPref() {
  try {
    return localStorage.getItem(CONFLICT_PREF_KEY)
  } catch {}
  return null
}

function saveConflictPref(pref) {
  localStorage.setItem(CONFLICT_PREF_KEY, pref)
}

function ConflictDialog({ existingName, droppedName, onChoice }) {
  const [remember, setRemember] = useState(false)

  const choose = (choice) => {
    if (remember) saveConflictPref(choice)
    onChoice(choice)
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h3>Week already has an idea</h3>
        <p>
          <strong>{droppedName}</strong> is being dropped onto a week that already has <strong>{existingName}</strong>.
        </p>
        <div className="dialog-actions">
          <button className="dialog-btn overwrite" onClick={() => choose('overwrite')}>
            Overwrite
            <span className="dialog-btn-desc">Replace and send {existingName} to backlog</span>
          </button>
          <button className="dialog-btn insert" onClick={() => choose('insert')}>
            Insert
            <span className="dialog-btn-desc">Push {existingName} and others down one week</span>
          </button>
          <button className="dialog-btn cancel" onClick={() => choose('cancel')}>
            Cancel
          </button>
        </div>
        <label className="dialog-remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember my choice
        </label>
      </div>
    </div>
  )
}

function trackEvent(action, label) {
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    ReactGA.event({ category: '52Builds', action, label })
  }
}

function StatusSelect({ label, value, options, classMap, onChange }) {
  return (
    <div className="status-group" onClick={(e) => e.stopPropagation()}>
      <span className="status-label">{label}</span>
      <select
        className={`status-select ${classMap[value] || ''}`}
        value={value}
        onChange={(e) => {
          e.stopPropagation()
          onChange(e.target.value)
        }}
      >
        {options.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  )
}

function IdeaCard({ idea, onFieldChange, onNoteChange, onRemove, provided, isDragging }) {
  const [showNote, setShowNote] = useState(!!idea.note)

  const dragProps = provided
    ? {
        ref: provided.innerRef,
        ...provided.draggableProps,
        ...provided.dragHandleProps,
      }
    : {}

  return (
    <div
      className={`idea-card${isDragging ? ' dragging' : ''}`}
      {...dragProps}
    >
      <div className="card-header">
        <span className="card-name">{idea.name}</span>
        {onRemove && (
          <button
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(idea.id)
            }}
            title="Remove from schedule"
          >
            ×
          </button>
        )}
      </div>
      <div className="card-description">{idea.description}</div>
      <div className="card-statuses">
        <StatusSelect
          label="Dev"
          value={idea.status}
          options={DEV_STATUSES}
          classMap={DEV_STATUS_CLASS}
          onChange={(v) => onFieldChange(idea.id, 'status', v)}
        />
        <StatusSelect
          label="LinkedIn"
          value={idea.linkedin || 'To Do'}
          options={LINKEDIN_STATUSES}
          classMap={CONTENT_STATUS_CLASS}
          onChange={(v) => onFieldChange(idea.id, 'linkedin', v)}
        />
        <StatusSelect
          label="YouTube"
          value={idea.youtube || 'To Do'}
          options={YOUTUBE_STATUSES}
          classMap={CONTENT_STATUS_CLASS}
          onChange={(v) => onFieldChange(idea.id, 'youtube', v)}
        />
      </div>
      <button className="note-toggle" onClick={() => setShowNote(!showNote)}>
        {showNote ? 'hide note' : '+ note'}
      </button>
      {showNote && (
        <div className="card-note">
          <textarea
            placeholder="Add a note..."
            value={idea.note || ''}
            onChange={(e) => onNoteChange(idea.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [data, setData] = useState(() => {
    const saved = loadData()
    return saved || { backlog: DEFAULT_BACKLOG, schedule: DEFAULT_SCHEDULE }
  })

  const [newIdea, setNewIdea] = useState('')
  const [activeTab, setActiveTab] = useState('planner')
  const [conflict, setConflict] = useState(null)

  useEffect(() => {
    saveData(data)
  }, [data])

  const updateField = useCallback((id, field, value) => {
    trackEvent('status_change', `${id}:${field}:${value}`)
    setData((prev) => ({
      backlog: prev.backlog.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
      schedule: prev.schedule.map((w) =>
        w.idea?.id === id ? { idea: { ...w.idea, [field]: value } } : w
      ),
    }))
  }, [])

  const updateNote = useCallback((id, note) => {
    setData((prev) => ({
      backlog: prev.backlog.map((i) => (i.id === id ? { ...i, note } : i)),
      schedule: prev.schedule.map((w) =>
        w.idea?.id === id ? { idea: { ...w.idea, note } } : w
      ),
    }))
  }, [])

  const addIdea = () => {
    const name = newIdea.trim()
    if (!name) return
    trackEvent('add_idea', name)
    const idea = {
      id: `idea-${Date.now()}`,
      name,
      description: '',
      status: 'Backlog',
      linkedin: 'To Do',
      youtube: 'To Do',
      note: '',
    }
    setData((prev) => ({ ...prev, backlog: [...prev.backlog, idea] }))
    setNewIdea('')
  }

  const removeFromSchedule = useCallback((id) => {
    setData((prev) => {
      const weekIdx = prev.schedule.findIndex((w) => w.idea?.id === id)
      if (weekIdx === -1) return prev
      const idea = { ...prev.schedule[weekIdx].idea, status: 'Backlog' }
      return {
        backlog: [...prev.backlog, idea],
        schedule: prev.schedule.map((w, i) =>
          i === weekIdx ? { idea: null } : w
        ),
      }
    })
  }, [])

  const applyOverwrite = useCallback((sourceInfo, weekIdx) => {
    setData((prev) => {
      const next = {
        backlog: [...prev.backlog],
        schedule: prev.schedule.map((w) => ({ ...w })),
      }
      const displaced = { ...next.schedule[weekIdx].idea, status: 'Backlog' }
      let idea
      if (sourceInfo.from === 'backlog') {
        const idx = next.backlog.findIndex((i) => i.id === sourceInfo.ideaId)
        if (idx === -1) return prev
        ;[idea] = next.backlog.splice(idx, 1)
      } else {
        const srcIdx = sourceInfo.weekIdx
        idea = next.schedule[srcIdx].idea
        next.schedule[srcIdx] = { idea: null }
      }
      next.schedule[weekIdx] = { idea: { ...idea } }
      next.backlog.push(displaced)
      return next
    })
  }, [])

  const applyInsert = useCallback((sourceInfo, weekIdx) => {
    setData((prev) => {
      const next = {
        backlog: [...prev.backlog],
        schedule: prev.schedule.map((w) => ({ ...w })),
      }
      let idea
      if (sourceInfo.from === 'backlog') {
        const idx = next.backlog.findIndex((i) => i.id === sourceInfo.ideaId)
        if (idx === -1) return prev
        ;[idea] = next.backlog.splice(idx, 1)
      } else {
        const srcIdx = sourceInfo.weekIdx
        idea = next.schedule[srcIdx].idea
        next.schedule[srcIdx] = { idea: null }
      }
      // Push ideas down from weekIdx
      let overflow = { idea: { ...idea } }
      for (let i = weekIdx; i < 52; i++) {
        const current = next.schedule[i]
        next.schedule[i] = overflow
        if (!current.idea) {
          overflow = null
          break
        }
        overflow = current
      }
      // If week 52 was full, send the last idea to backlog
      if (overflow?.idea) {
        next.backlog.push({ ...overflow.idea, status: 'Backlog' })
      }
      return next
    })
  }, [])

  const resolveConflict = useCallback((choice) => {
    if (!conflict) return
    const { sourceInfo, weekIdx } = conflict
    setConflict(null)
    if (choice === 'cancel') return
    if (choice === 'overwrite') applyOverwrite(sourceInfo, weekIdx)
    if (choice === 'insert') applyInsert(sourceInfo, weekIdx)
  }, [conflict, applyOverwrite, applyInsert])

  const onDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return

    const srcIsBacklog = source.droppableId === 'backlog'
    const dstIsBacklog = destination.droppableId === 'backlog'
    const dstIsWeek = destination.droppableId.startsWith('week-')
    const srcIsWeek = source.droppableId.startsWith('week-')

    // Reorder within backlog
    if (srcIsBacklog && dstIsBacklog) {
      setData((prev) => {
        const next = { ...prev, backlog: [...prev.backlog] }
        const [moved] = next.backlog.splice(source.index, 1)
        next.backlog.splice(destination.index, 0, moved)
        return next
      })
      return
    }

    // Schedule to backlog
    if (srcIsWeek && dstIsBacklog) {
      const srcIdx = parseInt(source.droppableId.replace('week-', ''), 10)
      setData((prev) => {
        const next = {
          backlog: [...prev.backlog],
          schedule: prev.schedule.map((w) => ({ ...w })),
        }
        const idea = { ...next.schedule[srcIdx].idea, status: 'Backlog' }
        next.schedule[srcIdx] = { idea: null }
        next.backlog.splice(destination.index, 0, idea)
        return next
      })
      return
    }

    // To schedule (from backlog or another week)
    if (dstIsWeek) {
      const weekIdx = parseInt(destination.droppableId.replace('week-', ''), 10)
      let sourceInfo
      if (srcIsBacklog) {
        const idea = data.backlog[source.index]
        sourceInfo = { from: 'backlog', ideaId: idea.id }
      } else {
        const srcIdx = parseInt(source.droppableId.replace('week-', ''), 10)
        if (srcIdx === weekIdx) return
        sourceInfo = { from: 'week', weekIdx: srcIdx, ideaId: data.schedule[srcIdx].idea?.id }
      }

      const slotOccupied = data.schedule[weekIdx].idea != null

      if (!slotOccupied) {
        // Empty slot — just place it
        setData((prev) => {
          const next = {
            backlog: [...prev.backlog],
            schedule: prev.schedule.map((w) => ({ ...w })),
          }
          let idea
          if (sourceInfo.from === 'backlog') {
            const idx = next.backlog.findIndex((i) => i.id === sourceInfo.ideaId)
            if (idx === -1) return prev
            ;[idea] = next.backlog.splice(idx, 1)
          } else {
            idea = next.schedule[sourceInfo.weekIdx].idea
            next.schedule[sourceInfo.weekIdx] = { idea: null }
          }
          next.schedule[weekIdx] = { idea: { ...idea } }
          trackEvent('schedule_idea', `${idea.name}:week${weekIdx + 1}`)
          return next
        })
        return
      }

      // Slot is occupied — check remembered preference
      const pref = loadConflictPref()
      if (pref === 'overwrite') {
        applyOverwrite(sourceInfo, weekIdx)
      } else if (pref === 'insert') {
        applyInsert(sourceInfo, weekIdx)
      } else {
        // Show conflict dialog
        setConflict({
          sourceInfo,
          weekIdx,
          existingName: data.schedule[weekIdx].idea.name,
          droppedName: sourceInfo.from === 'backlog'
            ? data.backlog.find((i) => i.id === sourceInfo.ideaId)?.name
            : data.schedule[sourceInfo.weekIdx].idea?.name,
        })
      }
    }
  }

  const scheduledCount = data.schedule.filter((w) => w.idea).length
  const doneCount = data.schedule.filter((w) => w.idea?.status === 'Done').length

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="header">
        <div>
          <h1>
            <span>52</span> Builds Tracker
          </h1>
          <div className="header-subtitle">
            52 apps in 52 weeks before I turn 52 — Hey I'm Papa
          </div>
        </div>
        <div className="header-right">
          <div className="tab-nav">
            <button
              className={`tab-btn${activeTab === 'planner' ? ' active' : ''}`}
              onClick={() => setActiveTab('planner')}
            >
              Planner
            </button>
            <button
              className={`tab-btn${activeTab === 'about' ? ' active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About This Build
            </button>
          </div>
          <div className="header-subtitle">
            {scheduledCount}/52 scheduled · {doneCount} done · {data.backlog.length} in backlog
          </div>
        </div>
      </div>

      {activeTab === 'about' ? (
        <AboutPage />
      ) : (
      <div className="app-layout">
        {/* Backlog Panel */}
        <div className="backlog-panel">
          <div className="panel-header">
            Ideas Backlog
            <span className="count">{data.backlog.length}</span>
          </div>
          <div className="add-idea-form">
            <input
              type="text"
              placeholder="New app idea..."
              value={newIdea}
              onChange={(e) => setNewIdea(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIdea()}
            />
            <button onClick={addIdea}>Add</button>
          </div>
          <Droppable droppableId="backlog">
            {(provided) => (
              <div
                className="backlog-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.backlog.map((idea, index) => (
                  <Draggable key={idea.id} draggableId={idea.id} index={index}>
                    {(prov, snapshot) => (
                      <IdeaCard
                        idea={idea}
                        onFieldChange={updateField}
                        onNoteChange={updateNote}
                        provided={prov}
                        isDragging={snapshot.isDragging}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {/* Schedule Panel */}
        <div className="schedule-panel">
          <div className="schedule-header">
            <span>Week</span>
            <span>Dates</span>
            <span>App</span>
          </div>
          <div className="schedule-list">
            {data.schedule.map((week, index) => (
              <Droppable key={index} droppableId={`week-${index}`} direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    className={`week-row${index === 0 ? ' current-week' : ''}${
                      snapshot.isDraggingOver ? ' drag-over' : ''
                    }`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <span
                      className={`week-number${index === 0 ? ' current' : ''}`}
                    >
                      W{index + 1}
                    </span>
                    <span className="week-dates">{getWeekDates(index)}</span>
                    {week.idea ? (
                      <Draggable
                        draggableId={week.idea.id}
                        index={0}
                      >
                        {(prov, snap) => (
                          <div
                            className="week-slot"
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                          >
                            <IdeaCard
                              idea={week.idea}
                              onFieldChange={updateField}
                              onNoteChange={updateNote}
                              onRemove={removeFromSchedule}
                              isDragging={snap.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ) : (
                      <div className="week-slot">
                        <div className="empty-slot">Drop an idea here</div>
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </div>
      )}

      {conflict && (
        <ConflictDialog
          existingName={conflict.existingName}
          droppedName={conflict.droppedName}
          onChoice={resolveConflict}
        />
      )}
    </DragDropContext>
  )
}
