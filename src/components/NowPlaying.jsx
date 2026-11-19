import { useEffect, useState } from 'react'
import {
  ArrowDown, Heart, ListMusic, Pause, Play, Repeat, Repeat1,
  SkipBack, SkipForward, Shuffle, Volume2,
} from 'lucide-react'

function formatTime(time) {
  if (!Number.isFinite(time)) return '0:00'
  return `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`
}

function NowPlaying({
  currentSong, isPlaying, currentTime, duration, volume, isShuffling,
  repeatMode, isFavorite, onClose, onTogglePlay, onNext, onPrevious,
  onSeek, onVolumeChange, onToggleShuffle, onCycleRepeat, onToggleFavorite,
}) {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const close = () => {
    if (closing) return
    setClosing(true)
    setVisible(false)
    window.setTimeout(onClose, 300)
  }

  return (
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center bg-background/90 backdrop-blur-xl transition-opacity duration-300 motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={(event) => { if (event.target === event.currentTarget) close() }}
      aria-hidden={closing}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Now Playing"
        className={`relative flex h-full w-full flex-col overflow-y-auto bg-background text-foreground transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none md:h-[min(92vh,900px)] md:max-w-6xl md:rounded-3xl md:border md:border-ui-border md:shadow-2xl ${visible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'}`}
      >
        <header className="flex h-16 shrink-0 items-center justify-between px-4 md:px-8">
          <button onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full bg-hover text-foreground hover:text-red-500" aria-label="Close Now Playing">
            <ArrowDown size={21} />
          </button>
          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-muted">NOW PLAYING</p>
            <p className="mt-0.5 max-w-48 truncate text-xs font-medium">{currentSong?.album || 'Melody Music'}</p>
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-hover text-muted" aria-label="Queue (coming soon)" title="Queue">
            <ListMusic size={20} />
          </button>
        </header>

        <div className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 items-center gap-6 px-5 pb-6 pt-2 md:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] md:gap-12 md:px-12 md:py-8">
          <div className="mx-auto aspect-square w-full max-w-[min(72vw,460px)] md:max-w-[min(42vw,520px)]">
            <div className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${currentSong?.color || 'from-red-600 to-purple-900'} shadow-2xl shadow-black/30`}>
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/20" />
              <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/15" />
              <span className="relative text-[min(38vw,220px)] font-black leading-none text-white/85 drop-shadow-lg md:text-[min(24vw,260px)]">
                {currentSong?.title?.charAt(0) || 'M'}
              </span>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-xl flex-col">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight md:text-4xl">{currentSong?.title || 'No song selected'}</h1>
                <p className="mt-2 truncate text-base text-muted md:text-lg">{currentSong?.artist || 'Unknown artist'}</p>
                <p className="mt-1 truncate text-sm text-subtle">{currentSong?.album || '—'}</p>
              </div>
              <button onClick={onToggleFavorite} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hover transition-colors ${isFavorite ? 'text-red-500' : 'text-muted hover:text-red-500'}`} aria-label={isFavorite ? 'Remove Favorite' : 'Add Favorite'}>
                <Heart size={21} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="mb-7">
              <input type="range" min="0" max={duration || 0} step="0.1" value={Math.min(currentTime, duration || 0)} onChange={(event) => onSeek(event.target.value)} aria-label="Playback position" className="h-6 w-full cursor-pointer accent-red-500" />
              <div className="-mt-1 flex justify-between text-xs tabular-nums text-muted">
                <span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="mb-7 flex items-center justify-between">
              <button onClick={onToggleShuffle} className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${isShuffling ? 'text-red-500' : 'text-muted hover:text-foreground'}`} aria-label="Shuffle" aria-pressed={isShuffling}><Shuffle size={20} /></button>
              <button onClick={onPrevious} className="flex h-12 w-12 items-center justify-center text-foreground hover:text-red-500" aria-label="Previous"><SkipBack size={25} fill="currentColor" /></button>
              <button onClick={onTogglePlay} className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105 active:scale-95" aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
              </button>
              <button onClick={onNext} className="flex h-12 w-12 items-center justify-center text-foreground hover:text-red-500" aria-label="Next"><SkipForward size={25} fill="currentColor" /></button>
              <button onClick={onCycleRepeat} className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${repeatMode !== 'off' ? 'text-red-500' : 'text-muted hover:text-foreground'}`} aria-label={`Repeat ${repeatMode}`} title={`Repeat: ${repeatMode}`}>
                {repeatMode === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
              </button>
            </div>

            <div className="flex items-center gap-3 px-1">
              <Volume2 size={19} className="shrink-0 text-muted" />
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => onVolumeChange(event.target.value)} aria-label="Volume" className="h-5 w-full cursor-pointer accent-red-500" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NowPlaying
