/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react'
import * as Tone from 'tone'
import { playNote } from '../components/SynthFunctions'
import '../piano.css'

const Synth = () => {
  const [showSynth, setShowSynth] = useState(false)
  const [synth, setSynth] = useState<Tone.Synth | null>(null)

  useEffect(() => {
    if (showSynth) {
      setSynth(new Tone.Synth().toDestination())
    } else {
      if (synth) {
        synth.dispose()
      }
    }
  }, [showSynth])

  function handleToggle() {
    setShowSynth(!showSynth)
    if (Tone.context.state === 'suspended') {
      Tone.context.resume()
    }
  }

  useEffect(() => {
    function keyboardNotes(event: { keyCode: unknown }) {
      const keyCode = event.keyCode
      // console.log(keyCode)
      if (keyCode === 65) {
        playNote(synth, 'C4')
      }
      if (keyCode === 87) {
        playNote(synth, 'C#4')
      }
      if (keyCode === 83) {
        playNote(synth, 'D4')
      }
      if (keyCode === 69) {
        playNote(synth, 'D#4')
      }
      if (keyCode === 68) {
        playNote(synth, 'E4')
      }
      if (keyCode === 70) {
        playNote(synth, 'F4')
      }
      if (keyCode === 84) {
        playNote(synth, 'F#4')
      }
      if (keyCode === 71) {
        playNote(synth, 'G4')
      }
      if (keyCode === 89) {
        playNote(synth, 'G#4')
      }
      if (keyCode === 72) {
        playNote(synth, 'A4')
      }
      if (keyCode === 85) {
        playNote(synth, 'A#4')
      }
      if (keyCode === 74) {
        playNote(synth, 'B4')
      }
      if (keyCode === 75) {
        playNote(synth, 'C5')
      }
    }

    window.addEventListener('keydown', keyboardNotes)
    return () => {
      window.removeEventListener('keydown', keyboardNotes)
    }
  }, [synth])

  return (
    <div>
      <button onClick={handleToggle}>
        {showSynth ? 'Hide Synth' : 'Show Synth'}
      </button>

      {showSynth && (
        <div className="container">
          <div className="piano">
            <div className="white-key" onClick={() => playNote(synth, 'C4')}>
              A
            </div>
            <div className="black-key" onClick={() => playNote(synth, 'C#4')}>
              W
            </div>
            <div className="white-key" onClick={() => playNote(synth, 'D4')}>
              S
            </div>
            <div className="black-key" onClick={() => playNote(synth, 'D#4')}>
              E
            </div>
            <div className="white-key" onClick={() => playNote(synth, 'E4')}>
              D
            </div>
            <div className="white-key" onClick={() => playNote(synth, 'F4')}>
              F
            </div>
            <div className="black-key" onClick={() => playNote(synth, 'F#4')}>
              T
            </div>
            <div className="white-key" onClick={() => playNote(synth, 'G4')}>
              G
            </div>
            <div className="black-key" onClick={() => playNote(synth, 'G#4')}>
              Y
            </div>
            <div className="white-key" onClick={() => playNote(synth, 'A4')}>
              H
            </div>
            <div className="black-key" onClick={() => playNote(synth, 'A#4')}>
              U
            </div>
            <div className="white-key" onClick={() => playNote(synth, 'B4')}>
              J
            </div>
            <div className="white-key" onClick={() => playNote(synth, 'C5')}>
              K
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Synth
