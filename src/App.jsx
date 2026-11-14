
import { useState } from 'react'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainContent from './components/MainContent'
import MusicPlayer from './components/MusicPlayer'

import { songs } from './data/songs'
import useAudioPlayer from './hooks/useAudioPlayer'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')

  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffling,
    repeatMode,
    isFavorite,
    favorites,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
    seek,
    changeVolume,
    toggleShuffle,
    cycleRepeat,
    toggleFavorite,
  } = useAudioPlayer(songs)

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">

      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="flex-1 min-w-0 p-8 pb-32">

        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <MainContent
          activePage={activePage}
          searchQuery={searchQuery}
          favorites={favorites}
          onPlaySong={playSong}
        />

      </div>

      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isShuffling={isShuffling}
        repeatMode={repeatMode}
        isFavorite={isFavorite}
        onTogglePlay={togglePlay}
        onNext={nextSong}
        onPrevious={previousSong}
        onSeek={seek}
        onVolumeChange={changeVolume}
        onToggleShuffle={toggleShuffle}
        onCycleRepeat={cycleRepeat}
        onToggleFavorite={toggleFavorite}
      />

    </div>
  )
}

export default App
