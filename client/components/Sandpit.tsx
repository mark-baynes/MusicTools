import { useState, useEffect } from 'react'

const Sandpit = () => {
  const [showSandpit, setShowSandpit] = useState(false) // State variable for the toggle
  const [count, setCount] = useState(0)

  useEffect(() => {
  document.title = `You've clicked ${count} times `
})

  return (
    <div>
      <button onClick={() => setShowSandpit(!showSandpit)}>
        {showSandpit ? 'Hide Sandpit' : 'Show Sandpit'}
      </button>

      {showSandpit && ( // Conditional rendering && means
        <div className="container">
          <h2>Sandpit</h2>
          <div>
            <p>You've clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sandpit
