import { useState } from 'react'

const MusicApi = () => {
  const [showMusicApi, setShowMusicApi] = useState(false); // State variable for the toggle

  return (
    <div>
      <button onClick={() => setShowMusicApi(!showMusicApi)}> 
        {showMusicApi ? 'Hide Music API' : 'Show Music API'}
      </button>

      {showMusicApi && ( // Conditional rendering
        <div className="container">
          <h2>Music API Details</h2>
          {/* Rest of your MusicApi specific code */}
        </div>
      )}
    </div>
  );
};

export default MusicApi