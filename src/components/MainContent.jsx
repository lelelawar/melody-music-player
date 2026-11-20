
import { useEffect, useState } from 'react'
import { albums, songs } from '../data/songs'
import { Play, Music, Heart, Plus, Pencil, Trash2, MoreVertical, ListPlus, SkipForward } from 'lucide-react'

function MainContent({
  activePage,
  searchQuery,
  favorites,
  playlists,
  onPlaySong,
  onAddToQueue,
  onPlayNext,
  onAddSongToPlaylist,
  onRenamePlaylist,
  onDeletePlaylist,
  onRemoveSongFromPlaylist,
}) {
  const [openActionSongId, setOpenActionSongId] = useState(null)
  const [queueNotice, setQueueNotice] = useState('')

  useEffect(() => {
    if (!queueNotice) return undefined

    const timeoutId = window.setTimeout(() => setQueueNotice(''), 2200)
    return () => window.clearTimeout(timeoutId)
  }, [queueNotice])

  const handleQueueAction = (event, song, action) => {
    event.stopPropagation()
    if (action === 'add') {
      onAddToQueue(song)
      setQueueNotice('Ditambahkan ke antrean')
    } else {
      onPlayNext(song)
      setQueueNotice('Akan diputar berikutnya')
    }
    setOpenActionSongId(null)
  }

  const selectedPlaylist = activePage.startsWith('playlist-')
    ? playlists.find(
        (playlist) =>
          String(playlist.id) === activePage.replace('playlist-', '')
      )
    : null

  const favoriteSongs = songs.filter((song) =>
    favorites.includes(song.id)
  )

  const playlistSongs = selectedPlaylist
    ? songs.filter((song) => selectedPlaylist.songIds.includes(song.id))
    : songs

  const pageSongs = activePage === 'favorites'
    ? favoriteSongs
    : selectedPlaylist
      ? playlistSongs
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

  const pageTitle = selectedPlaylist
    ? selectedPlaylist.name
    : pageTitles[activePage] || 'Popular Songs'

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
              className="bg-foreground text-background px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-red-500 hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-200"
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
            {activePage === 'library' ? 'Your Albums' : 'Recently Played'}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {albums.map((album) => (
          <div key={album.id}
            className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 motion-reduce:transition-none">
                <div className={`aspect-square rounded-xl bg-gradient-to-br ${album.color} flex items-center justify-center mb-3 
                     shadow-lg transition-all duration-300 group-hover:shadow-red-500/20 group-hover:scale-[1.02]`}>
                  <span className="text-4xl font-bold text-white/80">
                    {album.title.charAt(0)}
                  </span>
                </div>

                <h3 className="font-semibold truncate">
                  {album.title}
                </h3>

                <p className="text-sm text-muted">
                  {album.artist}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Song List */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            {activePage === 'favorites' && (
              <Heart size={20} className="text-red-500" />
            )}

            <h2 className="text-xl font-bold">
              {searchQuery ? 'Search Results' : pageTitle}
            </h2>
          </div>

          {selectedPlaylist && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onRenamePlaylist(selectedPlaylist.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-hover text-muted hover:bg-hover hover:text-foreground transition text-sm"
              >
                <Pencil size={16} />
                Rename
              </button>

              <button
                onClick={() => onDeletePlaylist(selectedPlaylist.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>

        {filteredSongs.length > 0 ? (
          <div className="space-y-2">
            {filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className="group flex items-center gap-4 p-3 rounded-xl hover:bg-hover hover:translate-x-1 active:bg-active active:scale-[0.99] transition-all duration-200 motion-reduce:transition-none"
              >
                <button
                  onClick={() => onPlaySong(song)}
                  className="flex flex-1 min-w-0 items-center gap-4 text-left"
                >
                  <span className="text-muted w-5">
                    {index + 1}
                  </span>

                  <div
                    className={`w-11 h-11 shrink-0 rounded-lg bg-gradient-to-br ${song.color} flex items-center justify-center font-bold shadow-md transition-transform duration-300 group-hover:scale-110`}
                  >
                    {song.title.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">
                      {song.title}
                    </h3>

                    <p className="text-sm text-muted truncate">
                      {song.artist}
                    </p>
                  </div>

                  <p className="hidden sm:block text-sm text-muted">
                    {song.album}
                  </p>

                  <p className="text-sm text-muted">
                    {song.duration}
                  </p>
                </button>

                {selectedPlaylist ? (
                  <button
                    onClick={() =>
                      onRemoveSongFromPlaylist(song.id, selectedPlaylist.id)
                    }
                    className="text-muted hover:text-red-500 p-2 transition"
                    title="Remove from Playlist"
                  >
                    <Trash2 size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => onAddSongToPlaylist(song)}
                    className="text-muted hover:text-red-500 p-2 transition"
                    title="Add to Playlist"
                  >
                    <Plus size={18} />
                  </button>
                )}

                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      setOpenActionSongId((currentId) => currentId === song.id ? null : song.id)
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    aria-label={`More actions for ${song.title}`}
                    aria-haspopup="menu"
                    aria-expanded={openActionSongId === song.id}
                    title="Song actions"
                  >
                    <MoreVertical size={19} />
                  </button>

                  {openActionSongId === song.id && (
                    <div
                      role="menu"
                      aria-label={`Actions for ${song.title}`}
                      onClick={(event) => event.stopPropagation()}
                      className="absolute right-0 top-full z-40 mt-1 w-48 overflow-hidden rounded-xl border border-ui-border bg-surface p-1.5 text-foreground shadow-xl"
                    >
                      <button
                        type="button"
                        role="menuitem"
                        onClick={(event) => handleQueueAction(event, song, 'add')}
                        className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <ListPlus size={17} className="text-muted" />
                        Add to Queue
                      </button>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={(event) => handleQueueAction(event, song, 'next')}
                        className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        <SkipForward size={17} className="text-muted" />
                        Play Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Music size={40} className="text-subtle mb-4" />

            <h3 className="font-semibold mb-2">
              {activePage === 'favorites' && !searchQuery
                ? 'No Favorites Yet'
                : selectedPlaylist && !searchQuery
                  ? 'This Playlist Is Empty'
                  : 'No Songs Found'}
            </h3>

            <p className="text-sm text-muted">
              {selectedPlaylist && !searchQuery
                ? 'Add songs using the plus button in your music list.'
                : 'Try searching with another keyword.'}
            </p>
          </div>
        )}
      </section>

      {queueNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-28 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-ui-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-xl"
        >
          {queueNotice}
        </div>
      )}
    </main>
  )
}

export default MainContent

