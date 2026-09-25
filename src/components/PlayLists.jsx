import { useState } from 'react';
import { useMusic } from "../hooks/useMusic";

export const PlayLists = () => {
    const { playlists, currentTrack, currentQueue, handlePlaySong, removeFromPlaylist, createPlaylist, deletePlaylist, formatTime } = useMusic();
    const [selectedListName, setSelectedListName] = useState(Object.keys(playlists)[0] || "");
    const [newListName, setNewListName] = useState("");

    const activeTracks = playlists[selectedListName] || [];
    const isPlayingFromThisPlaylist = currentQueue === activeTracks;

    const handleCreateList = (e) => {
        e.preventDefault();
        if (createPlaylist(newListName)) {
            setSelectedListName(newListName.trim());
            setNewListName("");
        }
    };

    return (
        <div className="playlist">
            <h2>Playlists Hub</h2>

            {/* Playlist Creator Form */}
            <form onSubmit={handleCreateList} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                    type="text" 
                    placeholder="Create new playlist name..." 
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    style={{
                        flex: 1, padding: '0.5rem 0.75rem', borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white'
                    }}
                />
                <button type="submit" className="control-btn" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#10b981', fontSize: '1rem' }}>＋</button>
            </form>

            {/* Playlist Selectors Navigation Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {Object.keys(playlists).map(name => (
                    <button 
                        key={name}
                        onClick={() => setSelectedListName(name)}
                        style={{
                            padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
                            background: selectedListName === name ? '#10b981' : 'rgba(255,255,255,0.05)',
                            color: 'white', cursor: 'pointer', whiteSpace: 'nowrap'
                        }}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {/* Active Playlist Render */}
            {selectedListName && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0 }}>{selectedListName} ({activeTracks.length} tracks)</h3>
                        
                        {/* ONLY render the delete button if it is NOT the Favorites playlist */}
                        {selectedListName !== "Favorites" ? (
                            <button 
                                onClick={() => {
                                    deletePlaylist(selectedListName);
                                    setSelectedListName("Favorites"); // Fallback to Favorites safely
                                }}
                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem' }}
                            >
                                🗑️ Delete Playlist
                            </button>
                        ) : (
                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
                                🔒 Core Playlist
                            </span>
                        )}
                    </div>

                    {activeTracks.length === 0 ? (
                        <p className="empty-playlist">This playlist is empty. Add songs from "All Songs".</p>
                    ) : (
                        <div className="playlist-tracks">
                            {activeTracks.map((song, index) => {
                                const isActive = isPlayingFromThisPlaylist && currentTrack?.id === song.id;
                                
                                return (
                                    <div 
                                        key={song.id} 
                                        className={`playlist-track ${isActive ? 'active' : ''}`}
                                        onClick={() => handlePlaySong(song, index, activeTracks)}
                                    >
                                        <div className="track-number">{isActive ? "🔊" : index + 1}</div>
                                        <div className="track-details">
                                            <div className="track-name">{song.title}</div>
                                            <div className="track-artist">{song.artist}</div>
                                        </div>
                                        <span className="track-duration" style={{ marginRight: '1rem' }}>{formatTime(song.duration)}</span>
                                        <button 
                                            className="control-btn" 
                                            style={{ width: '35px', height: '35px', fontSize: '0.8rem' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFromPlaylist(selectedListName, song.id);
                                            }}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
