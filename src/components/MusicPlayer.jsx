
import {
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Heart,
} from 'lucide-react'

function formatTime(time) {
  if (!Number.isFinite(time)) return '0:00'

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function MusicPlayer({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  isShuffling,
  repeatMode,
  isFavorite,
  isMobileNavVisible,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleShuffle,
  onCycleRepeat,
  onToggleFavorite,
}) {
  return (
    <footer className={`fixed ${isMobileNavVisible ? 'bottom-[var(--mobile-nav-height)]' : 'bottom-0'} md:bottom-0 left-0 right-0 min-h-[112px] md:h-24 bg-surface border-t border-ui-border px-3 md:px-6 py-3 md:py-0 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0 z-50 transition-[bottom,background-color,border-color,color] duration-300`}>

      {/* Song Information */}
      <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0">
        <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-lg bg-gradient-to-br ${currentSong?.color || 'from-red-600 to-purple-800'} flex items-center justify-center font-bold`}>
          {currentSong?.title?.charAt(0) || 'M'}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold truncate">
            {currentSong?.title || 'No song selected'}
          </h3>

          <p className="text-xs text-muted truncate">
            {currentSong?.artist || 'Unknown artist'}
          </p>
        </div>

        <button
          onClick={onToggleFavorite}
          className={`transition ${
            isFavorite
              ? 'text-red-500'
              : 'text-muted hover:text-red-500'
          }`}
          title={isFavorite ? 'Remove Favorite' : 'Add Favorite'}
        >
          <Heart
            size={18}
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Music Controls */}
      <div className="flex flex-col items-center gap-2 w-full md:w-2/4">
        <div className="flex items-center justify-center gap-5 md:gap-6">

          <button
            onClick={onToggleShuffle}
            className={`hidden sm:block transition ${
              isShuffling
                ? 'text-red-500'
                : 'text-muted hover:text-foreground'
            }`}
            title="Shuffle"
          >
            <Shuffle size={17} />
          </button>

          <button
            onClick={onPrevious}
            className="text-muted hover:text-foreground"
            title="Previous"
          >
            <SkipBack size={20} />
          </button>

          <button
            onClick={onTogglePlay}
            className="bg-foreground text-background rounded-full p-2 hover:scale-110 active:scale-90 transition-all duration-200"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          <button
            onClick={onNext}
            className="text-muted hover:text-foreground"
            title="Next"
          >
            <SkipForward size={20} />
          </button>

          <button
            onClick={onCycleRepeat}
            className={`hidden sm:block transition ${
              repeatMode !== 'off'
                ? 'text-red-500'
                : 'text-muted hover:text-foreground'
            }`}
            title={`Repeat: ${repeatMode}`}
          >
            {repeatMode === 'one' ? (
              <Repeat1 size={17} />
            ) : (
              <Repeat size={17} />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 md:gap-3 w-full max-w-xl">
          <span className="text-[10px] md:text-xs text-muted w-9 text-right">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => onSeek(event.target.value)}
            className="flex-1 min-w-0 h-1 accent-red-500 cursor-pointer"
          />

          <span className="text-[10px] md:text-xs text-muted w-9">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
        <Volume2 size={20} className="text-muted" />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => onVolumeChange(event.target.value)}
          className="w-24 accent-red-500 cursor-pointer"
        />
      </div>

    </footer>
  )
}

export default MusicPlayer

