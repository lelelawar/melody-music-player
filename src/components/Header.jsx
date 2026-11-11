
import { Search, Bell } from 'lucide-react'

function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <p className="text-sm text-gray-500">
          Welcome back
        </p>

        <h2 className="text-2xl font-bold">
          Listen to your favorite music
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#202023] px-4 py-2 rounded-full">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search music..."
            className="bg-transparent outline-none text-sm w-40 text-white placeholder:text-gray-500"
          />
        </div>

        <button className="text-gray-400 hover:text-white">
          <Bell size={20} />
        </button>

        {/* Profile */}
        <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center font-bold">
          M
        </div>
      </div>
    </header>
  )
}

export default Header
