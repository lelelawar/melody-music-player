
import { Play } from 'lucide-react'

const albums = [
  {
    title: 'Midnight Memories',
    artist: 'The Midnight',
    color: 'from-purple-600 to-indigo-900',
  },
  {
    title: 'After Hours',
    artist: 'The Weeknd',
    color: 'from-red-600 to-orange-900',
  },
  {
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    color: 'from-pink-600 to-purple-900',
  },
  {
    title: 'Random Access',
    artist: 'Daft Punk',
    color: 'from-blue-600 to-cyan-900',
  },
]

const songs = [
  {
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
  },
  {
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    duration: '3:23',
  },
  {
    title: 'Instant Crush',
    artist: 'Daft Punk',
    album: 'Random Access',
    duration: '5:37',
  },
]

function MainContent() {
  return (
    <main>
      {/* Featured Section */}
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

          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold flex items-center gap-2">
            <Play size={18} fill="currentColor" />
            Explore Now
          </button>
        </div>
      </section>

      {/* Albums */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-5">
          Recently Played
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {albums.map((album) => (
            <div key={album.title} className="group">
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

      {/* Song List */}
      <section>
        <h2 className="text-xl font-bold mb-5">
          Popular Songs
        </h2>

        <div className="space-y-2">
          {songs.map((song, index) => (
            <div
              key={song.title}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5"
            >
              <span className="text-gray-500 w-5">
                {index + 1}
              </span>

              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-red-600 to-purple-800 flex items-center justify-center font-bold">
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

              <p className="text-sm text-gray-500">
                {song.album}
              </p>

              <p className="text-sm text-gray-500">
                {song.duration}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default MainContent
