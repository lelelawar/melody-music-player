import { useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import MainContent from './components/MainContent'
import MusicPlayer from './components/MusicPlayer'
import PlaylistModal from './components/PlaylistModal'

import { songs } from './data/songs'
import useAudioPlayer from './hooks/useAudioPlayer'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')

  // Membaca playlist dari LocalStorage
  const [playlists, setPlaylists] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('melody-playlists')) || []
    } catch {
      return []
    }
  })

  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState(null)

  // Menyimpan playlist ke LocalStorage
  useEffect(() => {
    localStorage.setItem('melody-playlists', JSON.stringify(playlists))
  }, [playlists])

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

  // Membuka modal playlist
  const openPlaylistModal = (song = null) => {
    setSelectedSongForPlaylist(song)
    setIsPlaylistModalOpen(true)
  }

  // Membuat playlist baru
  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songIds: [],
    }

    setPlaylists((previous) => [...previous, newPlaylist])
  }

  // Menambahkan lagu ke playlist
  const addSongToPlaylist = (song, playlistId) => {
    setPlaylists((previous) =>
      previous.map((playlist) => {
        if (playlist.id !== playlistId) return playlist

        if (playlist.songIds.includes(song.id)) return playlist

        return {
          ...playlist,
          songIds: [...playlist.songIds, song.id],
        }
      })
    )
  }

      // Mengganti nama playlist
    const renamePlaylist = (playlistId) => {
      const playlist = playlists.find((item) => item.id === playlistId)

      if (!playlist) return

      const newName = window.prompt('Masukkan nama playlist baru:', playlist.name)

      if (newName === null) return

      const trimmedName = newName.trim()

      if (!trimmedName) {
        alert('Nama playlist tidak boleh kosong.')
        return
      }

      setPlaylists((previous) =>
        previous.map((item) =>
          item.id === playlistId
            ? { ...item, name: trimmedName }
            : item
        )
      )
    }

    // Menghapus playlist
    const deletePlaylist = (playlistId) => {
      const playlist = playlists.find((item) => item.id === playlistId)

      if (!playlist) return

      const confirmed = window.confirm(
        `Yakin ingin menghapus playlist "${playlist.name}"?`
      )

      if (!confirmed) return

      setPlaylists((previous) =>
        previous.filter((item) => item.id !== playlistId)
      )

      setActivePage('home')
    }

    // Menghapus lagu dari playlist
    const removeSongFromPlaylist = (songId, playlistId) => {
      setPlaylists((previous) =>
        previous.map((playlist) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songIds: playlist.songIds.filter((id) => id !== songId),
              }
            : playlist
        )
      )
    }

  return (
    <div className="flex min-h-screen bg-[#09090b] text-white">

      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        playlists={playlists}
        onCreateClick={() => openPlaylistModal()}
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
          playlists={playlists}
          onPlaySong={playSong}
          onAddSongToPlaylist={openPlaylistModal}
          onRenamePlaylist={renamePlaylist}
          onDeletePlaylist={deletePlaylist}
          onRemoveSongFromPlaylist={removeSongFromPlaylist}
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

      {isPlaylistModalOpen && (
        <PlaylistModal
          playlists={playlists}
          song={selectedSongForPlaylist}
          onClose={() => setIsPlaylistModalOpen(false)}
          onCreatePlaylist={createPlaylist}
          onAddSong={addSongToPlaylist}
        />
      )}

    </div>
  )
}

export default App