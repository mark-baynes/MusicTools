/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import * as Tone from 'tone'
import { playNote } from '../components/SynthFunctions'
import '../piano.css'

const Synth = () => {
  const [showSynth, setShowSynth] = useState(false)
  const [synth, setSynth] = useState<Tone.Synth | null>(null)

  useEffect(() => {
    setSynth(new Tone.Synth().toDestination())
  }, [])

  function handleToggle() {
    setShowSynth(!showSynth)
    if (Tone.context.state === 'suspended') {
      Tone.context.resume()
    }
  }

  return (
    <div>
      <button onClick={handleToggle}>
        {showSynth ? 'Hide Synth' : 'Show Synth'}
      </button>

      {showSynth && (
        <div className="piano">
  <div className="white-key" onMouseEnter={() => playNote(synth, 'C4')}></div>
  <div className="black-key" onMouseEnter={() => playNote(synth, 'C#4')}></div>
  <div className="white-key" onMouseEnter={() => playNote(synth, 'D4')}></div>
  <div className="black-key" onMouseEnter={() => playNote(synth, 'D#4')}></div>
  <div className="white-key" onMouseEnter={() => playNote(synth, 'E4')}></div>
  <div className="white-key" onMouseEnter={() => playNote(synth, 'F4')}></div>
  <div className="black-key" onMouseEnter={() => playNote(synth, 'F#4')}></div>
  <div className="white-key" onMouseEnter={() => playNote(synth, 'G4')}></div>
  <div className="black-key" onMouseEnter={() => playNote(synth, 'G#4')}></div>
  <div className="white-key" onMouseEnter={() => playNote(synth, 'A4')}></div>
  <div className="black-key" onMouseEnter={() => playNote(synth, 'A#4')}></div>
  <div className="white-key" onMouseEnter={() => playNote(synth, 'B4')}></div>
  <div className="white-key" onMouseEnter={() => playNote(synth, 'C5')}></div>
</div>

      )}
    </div>
  )
}

export default Synth

