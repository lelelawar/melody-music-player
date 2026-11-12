import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainContent from './components/MainContent'
import MusicPlayer from './components/MusicPlayer'

import { songs } from './data/songs'
import useAudioPlayer from './hooks/useAudioPlayer'

function App() {
  const {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
  } = useAudioPlayer(songs)

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">
      <Sidebar />

      <div className="flex-1 min-w-0 p-8 pb-32">
        <Header />

        <MainContent onPlaySong={playSong} />
      </div>

      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
      />
    </div>
  )
}

export default App