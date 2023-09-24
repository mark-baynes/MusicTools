import { useState, useEffect } from 'react'

const Sandpit = () => {
  const [showSandpit, setShowSandpit] = useState(false) // State variable for the toggle

  return (
    <div>
      <button onClick={() => setShowSandpit(!showSandpit)}>
        {showSandpit ? 'Hide Sandpit' : 'Show Sandpit'}
      </button>

      {showSandpit && ( // Conditional rendering
        <div className="container">
          <h2>Sandpit</h2>
          {/* Rest of your MusicApi specific code */}
        </div>
      )}
    </div>
  )
}

export default Sandpit
