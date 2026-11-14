
import { albums, songs } from '../data/songs'
import { Play, Music, Heart } from 'lucide-react'

function MainContent({
  activePage,
  searchQuery,
  favorites,
  onPlaySong,
}) {
  const favoriteSongs = songs.filter((song) =>
    favorites.includes(song.id)
  )

  const pageSongs = activePage === 'favorites'
    ? favoriteSongs
    : songs

  const filteredSongs = pageSongs.filter((song) => {
    const query = searchQuery.toLowerCase()

    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    )
  })

  const pageTitles = {
    home: 'Popular Songs',
    browse: 'Browse Music',
    library: 'Your Library',
    favorites: 'Your Favorites',
  }

  return (
    <main>

      {/* Featured Section */}
      {activePage === 'home' && (
        <section className="mb-10">
          <div className="bg-gradient-to-r from-red-900 to-purple-900 rounded-2xl p-8">
            <p className="text-sm text-red-200 mb-2">
              FEATURED PLAYLIST
            </p>

            <h2 className="text-4xl font-bold mb-3">
              Your Music,
              <br />
              Your Mood.
            </h2>

            <p className="text-gray-300 mb-6">
              Discover music that matches your vibe.
            </p>

            <button
              onClick={() => {
                if (songs.length > 0) onPlaySong(songs[0])
              }}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold flex items-center gap-2"
            >
              <Play size={18} fill="currentColor" />
              Play Music
            </button>
          </div>
        </section>
      )}

      {/* Albums */}
      {(activePage === 'home' ||
        activePage === 'browse' ||
        activePage === 'library') && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-5">
            {activePage === 'library'
              ? 'Your Albums'
              : 'Recently Played'}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {albums.map((album) => (
              <div key={album.id} className="group">
                <div
                  className={`aspect-square rounded-xl bg-gradient-to-br ${album.color} flex items-center justify-center mb-3`}
                >
                  <span className="text-4xl font-bold text-white/80">
                    {album.title.charAt(0)}
                  </span>
                </div>

                <h3 className="font-semibold truncate">
                  {album.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {album.artist}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Song List */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          {activePage === 'favorites' && (
            <Heart size={20} className="text-red-500" />
          )}

          <h2 className="text-xl font-bold">
            {searchQuery
              ? 'Search Results'
              : pageTitles[activePage] || 'Popular Songs'}
          </h2>
        </div>

        {filteredSongs.length > 0 ? (
          <div className="space-y-2">
            {filteredSongs.map((song, index) => (
              <button
                key={song.id}
                onClick={() => onPlaySong(song)}
                className="w-full text-left flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition"
              >
                <span className="text-gray-500 w-5">
                  {index + 1}
                </span>

                <div className={`w-11 h-11 shrink-0 rounded-lg bg-gradient-to-br ${song.color} flex items-center justify-center font-bold`}>
                  {song.title.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">
                    {song.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {song.artist}
                  </p>
                </div>

                <p className="hidden sm:block text-sm text-gray-500">
                  {song.album}
                </p>

                <p className="text-sm text-gray-500">
                  {song.duration}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Music size={40} className="text-gray-600 mb-4" />

            <h3 className="font-semibold mb-2">
              {activePage === 'favorites' && !searchQuery
                ? 'No Favorites Yet'
                : 'No Songs Found'}
            </h3>

            <p className="text-sm text-gray-500">
              {activePage === 'favorites' && !searchQuery
                ? 'Add some songs to your favorites first.'
                : 'Try searching with another keyword.'}
            </p>
          </div>
        )}
      </section>

    </main>
  )
}

export default MainContent
