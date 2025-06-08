// Simple status badge component
import React from 'react'

export default function AgentStatusBadge({ label, value }) {
  return (
    <div className="border rounded p-2 text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-bold">{value}</div>
    </div>
  )
}
