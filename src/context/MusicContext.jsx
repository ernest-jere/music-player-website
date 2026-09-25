import { createContext, useState, useEffect } from 'react';

export const MusicContext = createContext(null);

const songs = [
    { id: 1, title: "Breaching", artist: "EchoBR", url: "public/songs/Breaching.mp3", duration: 180 },
    { id: 2, title: "Forgotten Memories", artist: "EchoBR", url: "public/songs/Forgotten Memories.mp3", duration: 180 },
    { id: 3, title: "Glacier Blue", artist: "EchoBR", url: "public/songs/Glacier Blue.mp3", duration: 180 },
    { id: 4, title: "In Love", artist: "EchoBR", url: "public/songs/In Love.mp3", duration: 180 },
    { id: 5, title: "Keep You Away", artist: "EchoBR", url: "public/songs/Keep You Away.mp3", duration: 180 },
    { id: 6, title: "Lemon Balm", artist: "EchoBR", url: "public/songs/Lemon Balm.mp3", duration: 180 },
    { id: 7, title: "Momentary Bliss", artist: "EchoBR", url: "public/songs/Momentary Bliss.mp3", duration: 180 },
    { id: 8, title: "nothing you really want", artist: "EchoBR", url: "public/songs/nothing you really want.mp3", duration: 180 },
];

export const MusicProvider = ({ children }) => {
    const [allSongs] = useState(songs);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);    
    const [isPlaying, setIsPlaying] = useState(false);
    
    // Search Bar Global Query State
    const [searchQuery, setSearchQuery] = useState("");

    // Multiple Playlists State Initialization
    const [playlists, setPlaylists] = useState(() => {
        const saved = localStorage.getItem('user_playlists');
        // Fallback default playlist if local storage is completely empty
        return saved ? JSON.parse(saved) : { "Favorites": [] };
    });

    const [currentQueue, setCurrentQueue] = useState(allSongs);

    // Save playlists automatically whenever they change
    useEffect(() => {
        localStorage.setItem('user_playlists', JSON.stringify(playlists));
    }, [playlists]);

    const handlePlaySong = (song, index, targetQueue = allSongs) => {
        setCurrentQueue(targetQueue);
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const handleNextSong = () => {
        if (currentQueue.length === 0) return;
        const nextIndex = (currentTrackIndex + 1) % currentQueue.length;
        setCurrentTrack(currentQueue[nextIndex]);
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    };

    const handlePrevSong = () => {
        if (currentQueue.length === 0) return;
        const prevIndex = (currentTrackIndex - 1 + currentQueue.length) % currentQueue.length;
        setCurrentTrack(currentQueue[prevIndex]);
        setCurrentTrackIndex(prevIndex);
        setIsPlaying(true);
    };

    // Create a new blank playlist
    const createPlaylist = (name) => {
        const trimmedName = name.trim();
        if (!trimmedName || playlists[trimmedName]) return false; // Prevent empty names or duplicates
        setPlaylists({
            ...playlists,
            [trimmedName]: []
        });
        return true;
    };

    // Delete an entire playlist (with safety check)
    const deletePlaylist = (name) => {
        // CRITICAL: Block the deletion if the name is 'Favorites'
        if (name === "Favorites") return;

        const updatedPlaylists = { ...playlists };
        delete updatedPlaylists[name];
        setPlaylists(updatedPlaylists);

        // If playing from the deleted list, stop playback safely
        if (currentQueue === playlists[name]) {
            setIsPlaying(false);
            setCurrentTrack(null);
            setCurrentTrackIndex(-1);
        }
    };


    // Add track to a targeted playlist string key
    const addToPlaylist = (playlistName, song) => {
        const targetList = playlists[playlistName];
        if (!targetList || targetList.some(item => item.id === song.id)) return;
        
        setPlaylists({
            ...playlists,
            [playlistName]: [...targetList, song]
        });
    };

    // Remove track from a targeted playlist string key
    const removeFromPlaylist = (playlistName, songId) => {
        const targetList = playlists[playlistName];
        if (!targetList) return;

        const updatedTracks = targetList.filter(item => item.id !== songId);
        setPlaylists({
            ...playlists,
            [playlistName]: updatedTracks
        });

        if (currentTrack?.id === songId && currentQueue === playlists[playlistName]) {
            setIsPlaying(false);
            setCurrentTrack(null);
            setCurrentTrackIndex(-1);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time) || time === undefined) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <MusicContext.Provider value={{
            allSongs, 
            currentTrack, 
            currentTrackIndex, 
            currentTime,
            duration,
            isPlaying,
            playlists,
            currentQueue,
            searchQuery,
            setSearchQuery,
            setIsPlaying,
            setDuration,
            setCurrentTime,
            handlePlaySong,
            handleNextSong,
            handlePrevSong,
            createPlaylist,
            deletePlaylist,
            addToPlaylist,
            removeFromPlaylist,
            formatTime
        }}>
            {children}
        </MusicContext.Provider>
    );
};
