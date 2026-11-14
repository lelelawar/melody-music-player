
import { Search, Bell } from 'lucide-react'

function Header({ searchQuery, onSearchChange }) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

      <div>
        <p className="text-sm text-gray-500 mb-1">
          Welcome back,
        </p>

        <h2 className="text-2xl font-bold">
          Discover Your Music
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 bg-[#18181b] border border-white/10 rounded-full px-4 py-2 w-full md:w-72">
          <Search size={18} className="text-gray-500 shrink-0" />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search songs, artists..."
            className="bg-transparent outline-none text-sm w-full text-white placeholder:text-gray-500"
          />
        </div>

        <button className="text-gray-400 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-purple-700 flex items-center justify-center font-bold">
          M
        </div>

      </div>
    </header>
  )
}

export default Header
