import { useState, useEffect } from 'react'
import * as Tone from 'tone'

const Metronome = () => {
  const [showMetronome, setShowMetronome] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [bpm, setBpm] = useState(120)
  let timer: string | number | NodeJS.Timeout | undefined

  const noiseSynth = new Tone.NoiseSynth({
    noise: {
      type: 'white',
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0,
    },
  }).toDestination()

  useEffect(() => {
    if (isPlaying) {
      clearInterval(timer)
      const msPerBeat = 60000 / bpm
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timer = setInterval(() => {
        noiseSynth.triggerAttackRelease('8n') // 8n represents an 8th note duration
      }, msPerBeat)
    } else {
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [isPlaying, bpm])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleBpmChange = (event: { target: { value: number } }) => {
    const newBpm = event.target.value
    setBpm(newBpm)
  }

  return (
    <div>
      <button onClick={() => setShowMetronome(!showMetronome)}>
        {showMetronome ? 'Hide Metronome' : 'Show Metronome'}
      </button>

      {showMetronome && (
        <div className="container">
          {/* <h2>Metronome</h2> */}
          <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Start'}</button>
          <input
            type="number"
            value={bpm}
            min="40"
            max="220"
            onChange={handleBpmChange}
          />
          <p>{bpm} BPM</p>
        </div>
      )}
    </div>
  )
}

export default Metronome
