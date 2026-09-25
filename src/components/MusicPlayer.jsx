import { useMusic } from "../hooks/useMusic";
import { useEffect, useRef, useState } from "react";

export const MusicPlayer = () => {
    const { 
        allSongs,       
        handlePlaySong,  
        currentTrack, 
        currentTime, 
        duration, 
        isPlaying, 
        setIsPlaying, 
        setDuration, 
        formatTime, 
        setCurrentTime,
        handleNextSong,
        handlePrevSong 
    } = useMusic();
    
    const audioRef = useRef(null);
    const [volume, setVolume] = useState(0.5); // Local volume state default 50%

    // 1. Audio Media Element Event Hooks
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleEnded = () => {
            handleNextSong(); // Auto advance to next song when current track ends
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentTrack, setDuration, setCurrentTime, handleNextSong]);

    // 2. Control Side-Effects for Tracks and Play/Pause updates
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying && currentTrack) {
            audio.play().catch(error => console.log("Playback interrupted:", error));
        } else {
            audio.pause();
        }
    }, [isPlaying, currentTrack]);

    // 3. Track reload on track source change
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack) return;
        
        audio.load();
        if (isPlaying) {
            audio.play().catch(error => console.log("Playback interrupted:", error));
        }
    }, [currentTrack]);

    // 4. Volume Side-Effect
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Interaction Handlers
    const togglePlayPause = () => {
        // If no song is loaded yet, play the first track in the array
        if (!currentTrack) {
            if (allSongs && allSongs.length > 0) {
                handlePlaySong(allSongs[0], 0);
            }
            return;
        }
        
        // Otherwise, toggle play/pause normally
        setIsPlaying(!isPlaying);
    };


    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    return (
        <div className="music-player">
            <audio ref={audioRef} preload="metadata" crossOrigin="anonymous" src={currentTrack?.url}/>
            
            <div className="track-info">
                <h3 className="track-title">
                    {currentTrack?.title || "No track playing"}
                </h3>
                <p className="track-artist">
                    {currentTrack?.artist || "Unknown Artist"}
                </p>
            </div>

            <div className="progress-container">
                <span className="time">{formatTime(currentTime)}</span>
                <input 
                    type="range" 
                    min="0" 
                    max={duration || 0} 
                    value={currentTime || 0} 
                    onChange={handleProgressChange} // Scrubbing functionality enabled
                    step="0.1"
                    className="progress-bar"
                />
                <span className="time">{formatTime(duration)}</span>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={handlePrevSong}>⏮</button>
                <button className="control-btn play-btn" onClick={togglePlayPause}>
                    {/* Toggles between your white outline triangle and custom pause bars */}
                    {isPlaying ? "⏸" : "▷"}
                </button>
                <button className="control-btn" onClick={handleNextSong}>⏭</button>
            </div>

            <div className="volume-container"> 
                <span className="volume-icon">{volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}</span>
                <input 
                    type="range" 
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="volume-bar"
                />
            </div>
        </div>
    );
}
