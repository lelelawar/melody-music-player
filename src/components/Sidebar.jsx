
import {
  Home,
  Compass,
  Library,
  Heart,
  Plus,
} from 'lucide-react'

function Sidebar({ activePage, onNavigate }) {
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
            const isActive = activePage === menu.id

            return (
              <button
                key={menu.id}
                onClick={() => onNavigate(menu.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
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

      <div>
        <p className="text-xs text-gray-500 uppercase mb-4">
          Your Playlist
        </p>

        <button
          onClick={() => onNavigate('library')}
          className="flex items-center gap-3 text-gray-400 hover:text-white p-3"
        >
          <Plus size={20} />
          My Collection
        </button>
      </div>

      <div className="mt-auto text-xs text-gray-600">
        Melody Music Player v1.0
      </div>
    </aside>
  )
}

export default Sidebar
