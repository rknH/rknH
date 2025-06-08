// Main React application entry point
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login'
import MonitoringDashboard from './MonitoringDashboard'
import CodeGenerator from './CodeGenerator'
import TerminalPanel from './TerminalPanel'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)

  return (
    <div className="p-4">
      {loggedIn ? (
        <div className="space-y-4">
          <MonitoringDashboard />
          <TerminalPanel />
          <CodeGenerator />
        </div>
      ) : (
        <Login onSuccess={() => setLoggedIn(true)} />
      )}
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
export default App
