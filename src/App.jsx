import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainContent from './components/MainContent'
import MusicPlayer from './components/MusicPlayer'

function App() {
  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">

      <Sidebar />

      <div className="flex-1 min-w-0 p-8 pb-32">
        <Header />
        <MainContent />
      </div>

      <MusicPlayer />

    </div>
  )
}

export default App
