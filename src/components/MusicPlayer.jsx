
import {
  SkipBack,
  Play,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Heart,
} from 'lucide-react'

function MusicPlayer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 bg-[#18181b] border-t border-white/10 px-6 flex items-center justify-between z-50">

      {/* Song Information */}
      <div className="flex items-center gap-3 w-1/4">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-purple-800 flex items-center justify-center font-bold">
          B
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">
            Blinding Lights
          </h3>

          <p className="text-xs text-gray-500">
            The Weeknd
          </p>
        </div>

        <button className="text-gray-500 hover:text-red-500">
          <Heart size={18} />
        </button>
      </div>

      {/* Music Controls */}
      <div className="flex flex-col items-center gap-2 w-2/4">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white">
            <Shuffle size={17} />
          </button>

          <button className="text-gray-400 hover:text-white">
            <SkipBack size={20} />
          </button>

          <button className="bg-white text-black rounded-full p-2">
            <Play size={20} fill="currentColor" />
          </button>

          <button className="text-gray-400 hover:text-white">
            <SkipForward size={20} />
          </button>

          <button className="text-gray-400 hover:text-white">
            <Repeat size={17} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full max-w-xl">
          <span className="text-xs text-gray-500">
            0:00
          </span>

          <div className="flex-1 h-1 bg-gray-700 rounded-full">
            <div className="w-1/3 h-full bg-red-500 rounded-full" />
          </div>

          <span className="text-xs text-gray-500">
            3:20
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-3 w-1/4">
        <Volume2 size={20} className="text-gray-400" />

        <div className="w-24 h-1 bg-gray-700 rounded-full">
          <div className="w-2/3 h-full bg-white rounded-full" />
        </div>
      </div>

    </footer>
  )
}

export default MusicPlayer
