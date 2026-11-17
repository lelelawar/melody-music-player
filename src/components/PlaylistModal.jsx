import { useState } from 'react'
import { X, Plus, ListMusic } from 'lucide-react'

function PlaylistModal({
  playlists,
  song,
  onClose,
  onCreatePlaylist,
  onAddSong,
}) {
  const [playlistName, setPlaylistName] = useState('')
  const [selectedPlaylist, setSelectedPlaylist] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()

    const name = playlistName.trim()

    if (!name) return

    onCreatePlaylist(name)
    setPlaylistName('')
    onClose()
  }

  const handleAdd = () => {
    if (!selectedPlaylist || !song) return

    onAddSong(song, Number(selectedPlaylist))
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-ui-border rounded-2xl p-6 transition-colors">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ListMusic className="text-red-500" />
            <h2 className="text-xl font-bold">
              {song ? 'Add to Playlist' : 'Create Playlist'}
            </h2>
          </div>

          <button onClick={onClose} className="text-muted hover:text-foreground">
            <X />
          </button>
        </div>

        {song && playlists.length > 0 && (
          <div className="mb-5">
            <label className="block text-sm text-muted mb-2">
              Select Playlist
            </label>

            <select
              value={selectedPlaylist}
              onChange={(event) => setSelectedPlaylist(event.target.value)}
              className="w-full bg-elevated border border-ui-border rounded-lg p-3 text-foreground outline-none"
            >
              <option value="">Choose a playlist</option>

              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAdd}
              disabled={!selectedPlaylist}
              className="w-full mt-3 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg p-3 font-semibold transition"
            >
              Add Song
            </button>
          </div>
        )}

        {song && playlists.length === 0 && (
          <p className="text-sm text-muted mb-5">
            You don't have a playlist yet. Create one below.
          </p>
        )}

        <form onSubmit={handleCreate}>
          <label className="block text-sm text-muted mb-2">
            {song ? 'Or create a new playlist' : 'Playlist Name'}
          </label>

          <input
            type="text"
            value={playlistName}
            onChange={(event) => setPlaylistName(event.target.value)}
            placeholder="Enter playlist name..."
            maxLength={40}
            className="w-full bg-elevated border border-ui-border rounded-lg p-3 text-foreground outline-none focus:border-red-500"
          />

          <button
            type="submit"
            disabled={!playlistName.trim()}
            className="w-full mt-3 bg-foreground text-background hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed rounded-lg p-3 font-semibold transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Create Playlist
          </button>
        </form>

      </div>
    </div>
  )
}

export default PlaylistModal
