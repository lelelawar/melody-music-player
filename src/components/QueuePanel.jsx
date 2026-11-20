import { useEffect, useState } from 'react'
import { ListMusic, Music2, Trash2, X } from 'lucide-react'
import { songs } from '../data/songs'

function QueuePanel({ currentSong, queue, onRemoveFromQueue, onClearQueue, onClose }) {
  const [confirmClear, setConfirmClear] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const closePanel = () => {
    setVisible(false)
    window.setTimeout(onClose, 200)
  }

  const queuedSongs = queue.map((item) => ({
    ...item,
    song: songs.find((song) => song.id === item.songId),
  })).filter((item) => item.song)

  const handleClearQueue = () => {
    onClearQueue()
    setConfirmClear(false)
  }

  return (
    <div
      className={`fixed inset-0 z-[80] flex justify-end bg-black/50 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={(event) => { if (event.target === event.currentTarget) closePanel() }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Queue"
        className={`flex h-full w-full max-w-md flex-col overflow-hidden border-l border-ui-border bg-background text-foreground shadow-2xl transition-transform duration-200 motion-reduce:transition-none ${visible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-ui-border px-5 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <ListMusic size={20} />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">Queue</h2>
              <p className="text-xs text-muted">Up Next · {queuedSongs.length} lagu</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closePanel}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Tutup Queue"
          >
            <X size={21} />
          </button>
        </header>

        <div className="min-h-0 flex-1 space-y-7 overflow-y-auto overscroll-contain p-5 sm:p-6">
          <section aria-labelledby="queue-now-playing">
            <h3 id="queue-now-playing" className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Now Playing</h3>
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-ui-border bg-surface p-3">
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${currentSong?.color || 'from-red-600 to-purple-900'} text-xl font-bold text-white`}>
                {currentSong?.title?.charAt(0) || <Music2 size={23} />}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold">{currentSong?.title || 'Belum ada lagu'}</p>
                <p className="truncate text-sm text-muted">{currentSong?.artist || 'Pilih lagu untuk mulai mendengarkan'}</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="queue-up-next">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 id="queue-up-next" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Up Next</h3>
              {queuedSongs.length > 0 && !confirmClear && (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="rounded-lg px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  Clear Queue
                </button>
              )}
            </div>

            {confirmClear && (
              <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/5 p-4" role="group" aria-label="Konfirmasi hapus antrean">
                <p className="text-sm font-medium">Kosongkan semua lagu dalam antrean?</p>
                <div className="mt-3 flex justify-end gap-2">
                  <button type="button" onClick={() => setConfirmClear(false)} className="min-h-10 rounded-lg px-3 text-sm text-muted hover:bg-hover">Batal</button>
                  <button type="button" onClick={handleClearQueue} className="min-h-10 rounded-lg bg-red-500 px-3 text-sm font-medium text-white hover:bg-red-600">Kosongkan</button>
                </div>
              </div>
            )}

            {queuedSongs.length > 0 ? (
              <ol className="space-y-2">
                {queuedSongs.map((item, index) => (
                  <li key={item.queueItemId} className="flex min-w-0 items-center gap-3 rounded-xl p-2 transition-colors hover:bg-hover">
                    <span className="w-6 shrink-0 text-center text-sm tabular-nums text-muted">{index + 1}</span>
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.song.color} font-bold text-white`}>
                      {item.song.title.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.song.title}</p>
                      <p className="truncate text-xs text-muted">{item.song.artist}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveFromQueue(item.queueItemId)}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-red-500/10 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      aria-label={`Hapus ${item.song.title} dari antrean`}
                      title="Hapus dari antrean"
                    >
                      <Trash2 size={17} />
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="flex flex-col items-center rounded-2xl border border-dashed border-ui-border bg-surface/60 px-6 py-10 text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                  <ListMusic size={25} />
                </span>
                <p className="font-semibold">Antrean masih kosong</p>
                <p className="mt-1 max-w-56 text-sm text-muted">Tambahkan lagu dari daftar untuk melihatnya di sini.</p>
              </div>
            )}
          </section>
        </div>
      </aside>
    </div>
  )
}

export default QueuePanel
