import MusicUrl from '../components/MusicUrl'
import MusicApi from '../components/MusicApi'
import Synth from '../components/Synth'
import Metronome from '../components/Metronome'
import Frequency from '../components/Frequency'
import Sandpit from '../components/Sandpit'

function App() {
  return (
    <div className="container">
      <h1>
        <p style={{ textAlign: 'center' }}>Music Tools</p>
      </h1>
      <MusicUrl />
      <br></br>
      <MusicApi />
      <br></br>
      <Synth />
      <br></br>
      <Metronome />
      <br></br>
      <Frequency />
      <br></br>
      <Sandpit />
    </div>
  )
}

export default App
