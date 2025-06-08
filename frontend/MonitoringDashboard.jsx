// Dashboard component showing CPU, memory and agents count via WebSocket
import React from 'react'
import { io } from 'socket.io-client'
import AgentStatusBadge from './components/AgentStatusBadge'
import SystemAlertPanel from './components/SystemAlertPanel'

export default function MonitoringDashboard() {
  const [metrics, setMetrics] = React.useState({ cpu: 0, memory: 0, disk: 0, agents: 0 })
  const [alerts, setAlerts] = React.useState([])

  React.useEffect(() => {
    const socket = io()
    socket.on('metrics', (data) => setMetrics(data))
    socket.on('alert', (msg) => setAlerts((a) => [...a, msg]))
    return () => socket.disconnect()
  }, [])

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-2">System Monitoring</h2>
      <div className="flex space-x-4">
        <AgentStatusBadge label="CPU" value={metrics.cpu + '%'} />
        <AgentStatusBadge label="Memory" value={metrics.memory + '%'} />
        <AgentStatusBadge label="Disk" value={metrics.disk + '%'} />
        <AgentStatusBadge label="Agents" value={metrics.agents} />
      </div>
      <SystemAlertPanel alerts={alerts} />
    </div>
  )
}
