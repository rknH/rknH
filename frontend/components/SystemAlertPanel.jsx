// Display alerts and warnings
import React from 'react'

export default function SystemAlertPanel({ alerts }) {
  if (!alerts.length) return null
  return (
    <div className="mt-4 bg-yellow-100 p-2 rounded">
      {alerts.map((a, i) => (
        <div key={i} className="text-sm text-yellow-800">
          {a}
        </div>
      ))}
    </div>
  )
}
