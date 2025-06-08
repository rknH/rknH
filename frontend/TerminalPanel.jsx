// Terminal-like panel to send commands to agents
import React from 'react'

export default function TerminalPanel() {
  const [command, setCommand] = React.useState('')
  const [log, setLog] = React.useState([])

  const send = async () => {
    if (!command) return
    const res = await fetch('/api/agents/command', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command })
    })
    const data = await res.json()
    setLog((l) => [...l, JSON.stringify(data)])
    setCommand('')
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-2">Terminal</h2>
      <div className="flex">
        <input
          className="border p-2 flex-1"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command"
        />
        <button className="ml-2 bg-gray-800 text-white px-4" onClick={send}>
          Send
        </button>
      </div>
      <pre className="mt-2 bg-gray-100 p-2 h-40 overflow-auto">
        {log.join('\n')}
      </pre>
    </div>
  )
}
