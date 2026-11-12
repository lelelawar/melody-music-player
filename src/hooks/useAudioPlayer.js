import { useEffect, useRef, useState } from 'react'

function useAudioPlayer(songs) {
  // Menyimpan objek audio agar tidak dibuat ulang setiap render
  const audioRef = useRef(new Audio())

  // Lagu yang sedang dipilih
  const [currentSong, setCurrentSong] = useState(songs[0] ?? null)

  // Status apakah musik sedang diputar
  const [isPlaying, setIsPlaying] = useState(false)

  // Mengatur status ketika audio selesai atau mengalami error
  useEffect(() => {
    const audio = audioRef.current

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
    }
  }, [])

  // Memutar lagu yang dipilih
  const playSong = (song) => {
    const audio = audioRef.current

    audio.pause()
    audio.src = song.src
    audio.currentTime = 0

    setCurrentSong(song)

    audio.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error('Gagal memutar musik:', error)
        setIsPlaying(false)
      })
  }

  // Play atau Pause lagu saat ini
  const togglePlay = () => {
    const audio = audioRef.current

    if (!currentSong) return

    if (audio.paused) {
      if (!audio.src) {
        audio.src = currentSong.src
      }

      audio.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error('Gagal memutar musik:', error)
          setIsPlaying(false)
        })
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return {
    currentSong,
    isPlaying,
    playSong,
    togglePlay,
  }
}

export default useAudioPlayer