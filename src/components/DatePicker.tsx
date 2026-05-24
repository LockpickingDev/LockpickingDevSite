import { useState } from 'react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

interface DatePickerProps {
  value: Date | null
  onChange: (date: Date) => void
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewMonth, setViewMonth] = useState(value ? value.getMonth() : today.getMonth())
  const [viewYear, setViewYear] = useState(value ? value.getFullYear() : today.getFullYear())

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate()

  function isSelected(day: number) {
    return value !== null
      && value.getDate() === day
      && value.getMonth() === viewMonth
      && value.getFullYear() === viewYear
  }

  function isPast(day: number) {
    return new Date(viewYear, viewMonth, day) < today
  }

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ]

  return (
    <div className="cal-wrap">
      <div className="cal-nav-row">
        <button type="button" className="cal-nav" onClick={prevMonth} aria-label="Previous month">‹</button>
        <span className="cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
        <button type="button" className="cal-nav" onClick={nextMonth} aria-label="Next month">›</button>
      </div>
      <div className="cal-grid">
        {DAYS.map(d => <span key={d} className="cal-weekday">{d}</span>)}
        {cells.map((day, i) =>
          day === null ? (
            <span key={`blank-${i}`} />
          ) : (
            <button
              key={day}
              type="button"
              disabled={isPast(day)}
              className={`cal-day${isSelected(day) ? ' cal-day--selected' : ''}${isPast(day) ? ' cal-day--past' : ''}`}
              onClick={() => !isPast(day) && onChange(new Date(viewYear, viewMonth, day))}
            >
              {day}
            </button>
          )
        )}
      </div>
      {value && (
        <div className="cal-selected-label">
          {value.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      )}
    </div>
  )
}
