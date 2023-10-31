import React, { useState, useEffect } from 'react'
import * as Tone from 'tone'

const FrequencySlider = () => {
  const [frequency, setFrequency] = useState(440) // Initial frequency
  const [volume, setVolume] = useState(0.5) // Initial volume (0 to 1 range)
  const [oscillator, setOscillator] = useState(null)

  useEffect(() => {
    const gain = new Tone.Gain(volume).toDestination()
    const newOscillator = new Tone.Oscillator({
      frequency,
      type: 'sine',
    }).connect(gain)

    setOscillator(newOscillator)

    return () => {
      newOscillator.dispose()
    }
  }, [volume])

  useEffect(() => {
    if (oscillator) {
      oscillator.frequency.setValueAtTime(frequency, Tone.context.currentTime)
    }
  }, [frequency, oscillator])

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value)
  }

  const handleVolumeChange = (event) => {
    setVolume(event.target.value)
  }

  const handlePlay = () => {
    oscillator.start()
  }

  const handleStop = () => {
    oscillator.stop()
  }

  return (
    <div>
      <h2>Frequency Slider</h2>
      <input
        type="range"
        min="20"
        max="20000"
        step="1"
        value={frequency}
        onChange={handleFrequencyChange}
      />
      <p>Frequency: {frequency} Hz</p>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <p>Volume: {volume}</p>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  )
}

const Frequency = () => {
  const [showMusicApi, setShowMusicApi] = useState(true) // State variable for the toggle

  return (
    <div>
      <button onClick={() => setShowMusicApi(!showMusicApi)}>
        {showMusicApi ? 'Hide Frequency' : 'Show Frequency'}
      </button>

      {showMusicApi && ( // Conditional rendering
        <div className="container">
          
          <FrequencySlider />
        </div>
      )}
    </div>
  )
}

export default Frequency
