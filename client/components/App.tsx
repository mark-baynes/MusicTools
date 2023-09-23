import MusicUrl from '../components/MusicUrl'
import MusicApi from '../components/MusicApi'

function App() {
  return (
    <div className="container">
      <h1>
        <p style={{ textAlign: 'center' }}>Music Tools</p>
      </h1>
      <MusicUrl />
      <MusicApi />
    </div>
  )
}

export default App
