import {
  Home,
  Compass,
  Library,
  Heart,
  Plus,
  ListMusic,
} from 'lucide-react'

function Sidebar({
  activePage,
  onNavigate,
  playlists,
  onCreateClick,
}) {
  const menus = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Browse', icon: Compass },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'favorites', label: 'Favorites', icon: Heart },
  ]

  return (
    <aside className="w-64 min-h-screen shrink-0 bg-[#111113] border-r border-white/10 p-6 flex flex-col">

      <h1 className="text-2xl font-bold mb-10">
        <span className="text-red-500">♪</span> Melody
      </h1>

      <div className="mb-8">
        <p className="text-xs text-gray-500 uppercase mb-4">
          Menu
        </p>

        <nav className="space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon

            return (
              <button
                key={menu.id}
                onClick={() => onNavigate(menu.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  activePage === menu.id
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={20} />
                {menu.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-500 uppercase">
            Your Playlist
          </p>

          <button
            onClick={onCreateClick}
            className="text-gray-400 hover:text-white"
            title="Create Playlist"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="space-y-2">
          {playlists.map((playlist) => {
            const pageId = `playlist-${playlist.id}`

            return (
              <button
                key={playlist.id}
                onClick={() => onNavigate(pageId)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition ${
                  activePage === pageId
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <ListMusic size={18} />
                <span className="truncate text-sm">
                  {playlist.name}
                </span>
              </button>
            )
          })}

          {playlists.length === 0 && (
            <p className="text-xs text-gray-600 px-3">
              No playlists yet
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto text-xs text-gray-600">
        Melody Music Player v1.0
      </div>

    </aside>
  )
}

export default Sidebar