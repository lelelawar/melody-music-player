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
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleShuffle,
  onCycleRepeat,
  onToggleFavorite,
}) {
  const progress = duration > 0
    ? (currentTime / duration) * 100
    : 0

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-[#18181b] border-t border-white/10 px-6 flex items-center justify-between z-50">

      {/* Song Information */}
      <div className="flex items-center gap-3 w-1/4 min-w-0">
        <div className={`w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br ${currentSong?.color || 'from-red-600 to-purple-800'} flex items-center justify-center font-bold`}>
          {currentSong?.title?.charAt(0) || 'M'}
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">
            {currentSong?.title || 'No song selected'}
          </h3>

          <p className="text-xs text-gray-500 truncate">
            {currentSong?.artist || 'Unknown artist'}
          </p>
        </div>

        <button
          onClick={onToggleFavorite}
          className={`transition ${
            isFavorite
              ? 'text-red-500'
              : 'text-gray-500 hover:text-red-500'
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
      <div className="flex flex-col items-center gap-2 w-2/4">
        <div className="flex items-center gap-6">

          {/* Shuffle */}
          <button
            onClick={onToggleShuffle}
            className={`transition ${
              isShuffling
                ? 'text-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
            title="Shuffle"
          >
            <Shuffle size={17} />
          </button>

          {/* Previous */}
          <button
            onClick={onPrevious}
            className="text-gray-400 hover:text-white"
            title="Previous"
          >
            <SkipBack size={20} />
          </button>

          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            className="text-gray-400 hover:text-white"
            title="Next"
          >
            <SkipForward size={20} />
          </button>

          {/* Repeat */}
          <button
            onClick={onCycleRepeat}
            className={`transition ${
              repeatMode !== 'off'
                ? 'text-red-500'
                : 'text-gray-400 hover:text-white'
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
        <div className="flex items-center gap-3 w-full max-w-xl">
          <span className="text-xs text-gray-500 w-10 text-right">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) => onSeek(event.target.value)}
            className="flex-1 h-1 accent-red-500 cursor-pointer"
          />

          <span className="text-xs text-gray-500 w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-3 w-1/4">
        <Volume2 size={20} className="text-gray-400" />

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