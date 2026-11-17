import { Sun, Moon } from 'lucide-react'
import { Search, Bell } from 'lucide-react'

function Header({ searchQuery, onSearchChange, theme, onToggleTheme }) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

      <div>
        <p className="text-sm text-muted mb-1">
          Welcome back,
        </p>

        <h2 className="text-2xl font-bold">
          Discover Your Music
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 bg-surface border border-ui-border rounded-full px-4 py-2 w-full md:w-72 transition-colors">
          <Search size={18} className="text-muted shrink-0" />

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-hover active:scale-90 transition-all duration-200"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
        </button>

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search songs, artists..."
            className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted"
          />
        </div>

        <button className="text-muted hover:text-foreground">
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

