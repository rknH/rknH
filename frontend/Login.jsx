// Login component for admin authentication
import React from 'react'

export default function Login({ onSuccess }) {
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (res.ok) {
      setError('')
      onSuccess()
    } else {
      setError('Invalid password')
    }
  }

  return (
    <form className="max-w-sm mx-auto mt-20" onSubmit={submit}>
      <input
        type="password"
        className="border p-2 w-full"
        placeholder="Admin Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="mt-2 bg-blue-500 text-white px-4 py-2" type="submit">
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )
}
