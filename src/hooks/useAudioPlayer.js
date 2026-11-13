import { useEffect, useRef, useState } from 'react'

function useAudioPlayer(songs) {
  const audioRef = useRef(new Audio())

  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)

  // State Shuffle dan Repeat
  const [isShuffling, setIsShuffling] = useState(false)
  const [repeatMode, setRepeatMode] = useState('off')

  // Mengambil daftar favorit dari LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('melody-favorites')) || []
    } catch {
      return []
    }
  })

  const currentSong = songs[currentSongIndex] ?? null

  const isFavorite = currentSong
    ? favorites.includes(currentSong.id)
    : false

  // Menyimpan favorit ke LocalStorage
  useEffect(() => {
    localStorage.setItem('melody-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Mengatur volume audio
  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  // Event audio
  useEffect(() => {
    const audio = audioRef.current

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration || 0)

    const handleEnded = () => {
      // Repeat One: ulangi lagu yang sama
      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
        return
      }

      let nextIndex

      // Shuffle: pilih lagu secara acak
      if (isShuffling && songs.length > 1) {
        do {
          nextIndex = Math.floor(Math.random() * songs.length)
        } while (nextIndex === currentSongIndex)
      } else if (currentSongIndex < songs.length - 1) {
        nextIndex = currentSongIndex + 1
      } else if (repeatMode === 'all') {
        nextIndex = 0
      } else {
        setIsPlaying(false)
        return
      }

      const nextSong = songs[nextIndex]

      audio.src = nextSong.src
      audio.currentTime = 0

      setCurrentSongIndex(nextIndex)
      setCurrentTime(0)
      setDuration(0)

      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }

    const handleError = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [currentSongIndex, repeatMode, isShuffling, songs])

  // Memutar lagu berdasarkan index
  const changeSong = (index) => {
    if (songs.length === 0) return

    const nextIndex = (index + songs.length) % songs.length
    const song = songs[nextIndex]
    const audio = audioRef.current

    audio.pause()
    audio.src = song.src
    audio.currentTime = 0
    audio.volume = volume

    setCurrentSongIndex(nextIndex)
    setCurrentTime(0)
    setDuration(0)

    audio.play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        console.error('Gagal memutar musik:', error)
        setIsPlaying(false)
      })
  }

  // Memilih lagu dari daftar
  const playSong = (song) => {
    const index = songs.findIndex((item) => item.id === song.id)

    if (index !== -1) {
      changeSong(index)
    }
  }

  // Play dan Pause
  const togglePlay = () => {
    const audio = audioRef.current

    if (!currentSong) return

    if (audio.paused) {
      if (!audio.src) {
        audio.src = currentSong.src
      }

      audio.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error('Gagal memutar musik:', error)
          setIsPlaying(false)
        })
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  // Next
  const nextSong = () => {
    if (isShuffling && songs.length > 1) {
      let randomIndex

      do {
        randomIndex = Math.floor(Math.random() * songs.length)
      } while (randomIndex === currentSongIndex)

      changeSong(randomIndex)
    } else {
      changeSong(currentSongIndex + 1)
    }
  }

  // Previous
  const previousSong = () => {
    changeSong(currentSongIndex - 1)
  }

  // Progress bar
  const seek = (time) => {
    audioRef.current.currentTime = Number(time)
    setCurrentTime(Number(time))
  }

  // Volume
  const changeVolume = (value) => {
    const newVolume = Number(value)
    audioRef.current.volume = newVolume
    setVolume(newVolume)
  }

  // Shuffle
  const toggleShuffle = () => {
    setIsShuffling((previous) => !previous)
  }

  // Repeat: Off -> All -> One -> Off
  const cycleRepeat = () => {
    setRepeatMode((previous) => {
      if (previous === 'off') return 'all'
      if (previous === 'all') return 'one'
      return 'off'
    })
  }

  // Favorite
  const toggleFavorite = () => {
    if (!currentSong) return

    setFavorites((previous) => {
      if (previous.includes(currentSong.id)) {
        return previous.filter((id) => id !== currentSong.id)
      }

      return [...previous, currentSong.id]
    })
  }

  return {
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
  }
}

export default useAudioPlayer