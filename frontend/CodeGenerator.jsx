// Simple code generator panel
import React from 'react'

export default function CodeGenerator() {
  const [prompt, setPrompt] = React.useState('')
  const [code, setCode] = React.useState('')

  const generate = async () => {
    // This is a placeholder for code generation
    setCode(`// Generated code for: ${prompt}`)
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl mb-2">Code Generator</h2>
      <textarea
        className="border p-2 w-full"
        rows="3"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="mt-2 bg-green-500 text-white px-4 py-2" onClick={generate}>
        Generate
      </button>
      {code && (
        <pre className="mt-2 bg-gray-100 p-2 overflow-auto"><code>{code}</code></pre>
      )}
    </div>
  )
}
