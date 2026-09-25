import { useState } from 'react';
import { useMusic } from '../hooks/useMusic';

export const AllSongs = () => {
    const { allSongs, currentTrack, currentQueue, handlePlaySong, playlists, addToPlaylist, searchQuery, setSearchQuery } = useMusic();
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Filter library search dynamically
    const filteredSongs = allSongs.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='all-songs'>
            <h2>All Songs ({filteredSongs.length})</h2>

            {/* Glassmorphic Search Bar Input Field */}
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <input 
                    type="text"
                    placeholder="🔍 Search tracks or artists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'white',
                        outline: 'none',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#10b981'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                />
            </div>

            {filteredSongs.length === 0 ? (
                <p className="empty-message">No matching songs found.</p>
            ) : (
                <div className='songs-grid'>
                    {filteredSongs.map((song, key) => {
                        const isActive = currentQueue === allSongs && currentTrack?.id === song.id;
                        
                        return (
                            <div 
                                key={song.id} 
                                className={`song-card ${isActive ? 'active' : ''}`} 
                                onClick={() => handlePlaySong(song, key, allSongs)}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    border: isActive ? '1px solid #10b981' : '1px solid transparent',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    position: 'relative'
                                }}
                            >
                                <div className='song-info'>
                                    <h3 className='song-title' style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{song.title}</h3>
                                    <p className='song-artist' style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{song.artist}</p>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    {/* Add to Multi-Playlist Add Action Anchor */}
                                    <button 
                                        className="control-btn"
                                        style={{ width: '35px', height: '35px', fontSize: '0.9rem' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveDropdown(activeDropdown === song.id ? null : song.id);
                                        }}
                                    >
                                        ➕
                                    </button>

                                    {activeDropdown === song.id && (
                                        <div style={{
                                            position: 'absolute', right: '50px', top: '45px',
                                            background: '#1f2937', border: '1px solid rgba(255,255,255,0.15)',
                                            borderRadius: '8px', zIndex: 10, minWidth: '150px', overflow: 'hidden'
                                        }}>
                                            {Object.keys(playlists).map(name => (
                                                <div 
                                                    key={name}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        addToPlaylist(name, song);
                                                        setActiveDropdown(null);
                                                    }}
                                                    style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', cursor: 'pointer', color: 'white' }}
                                                    onMouseEnter={(e) => e.target.style.background = 'rgba(16, 185, 129, 0.2)'}
                                                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                                                >
                                                    {name}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className='play-button' style={{ fontSize: '1.2rem' }}>
                                        {isActive ? "🔊" : "▶️"}
                                    </div> 
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
