import {
  Home,
  Compass,
  Library,
  Heart,
  Plus,
} from 'lucide-react'

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#111113] border-r border-white/10 p-6 flex flex-col">
      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10">
        <span className="text-red-500">♪</span> Melody
      </h1>

      {/* Navigation */}
      <div className="mb-8">
        <p className="text-xs text-gray-500 uppercase mb-4">
          Menu
        </p>

        <nav className="space-y-3">
          <a className="flex items-center gap-3 text-white bg-white/10 p-3 rounded-lg">
            <Home size={20} />
            Home
          </a>

          <a className="flex items-center gap-3 text-gray-400 hover:text-white p-3">
            <Compass size={20} />
            Browse
          </a>

          <a className="flex items-center gap-3 text-gray-400 hover:text-white p-3">
            <Library size={20} />
            Library
          </a>

          <a className="flex items-center gap-3 text-gray-400 hover:text-white p-3">
            <Heart size={20} />
            Favorites
          </a>
        </nav>
      </div>

      {/* Playlist */}
      <div>
        <p className="text-xs text-gray-500 uppercase mb-4">
          Your Playlist
        </p>

        <button className="flex items-center gap-3 text-gray-400 hover:text-white p-3">
          <Plus size={20} />
          Create Playlist
        </button>
      </div>

      <div className="mt-auto text-xs text-gray-600">
        Melody Music Player v1.0
      </div>
    </aside>
  )
}

export default Sidebar
