import MusicUrl from '../components/MusicUrl'
import MusicApi from '../components/MusicApi'
import Synth from '../components/Synth'


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
    </div>
  )
}

export default App
