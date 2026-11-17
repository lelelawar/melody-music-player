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
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 min-h-screen shrink-0 bg-[#111113] border-r border-white/10 p-6 flex-col">
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
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
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
              className="text-gray-400 hover:text-white transition"
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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111113]/95 backdrop-blur-xl border-t border-white/10">
        <nav className="grid grid-cols-4">
          {menus.map((menu) => {
            const Icon = menu.icon
            const isActive = activePage === menu.id

            return (
              <button
                key={menu.id}
                onClick={() => onNavigate(menu.id)}
                className={`flex flex-col items-center justify-center gap-1 py-3 transition ${
                  isActive
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={21} />

                <span className="text-[11px]">
                  {menu.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Mobile Playlist Shortcuts */}
        <div className="flex items-center gap-2 px-3 pb-3 overflow-x-auto">
          <button
            onClick={onCreateClick}
            className="shrink-0 flex items-center gap-1 bg-white/10 text-white px-3 py-2 rounded-full text-xs"
          >
            <Plus size={14} />
            New Playlist
          </button>

          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => onNavigate(`playlist-${playlist.id}`)}
              className={`shrink-0 flex items-center gap-1 px-3 py-2 rounded-full text-xs transition ${
                activePage === `playlist-${playlist.id}`
                  ? 'bg-red-600 text-white'
                  : 'bg-white/5 text-gray-400'
              }`}
            >
              <ListMusic size={14} />
              {playlist.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebar
