import './index.css';
import { MusicPlayer } from './components/MusicPlayer';
import { AllSongs } from './components/AllSongs';
import { PlayLists } from './components/PlayLists';
import { Navbar } from './components/Navbar'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext'; // Import the provider

function App() {
  return (
    <MusicProvider> {/* Wrapped at the root level */}
      <BrowserRouter>
        <div className="app">
          <Navbar /> 
          <div className="app-main">
            {/* Left Side: Fixed Sidebar Player */}
            <div className="player-section">
              <MusicPlayer />
            </div>
            {/* Right Side: Dynamic Content Routes */}
            <div className="content-section">
              <Routes>
                <Route path="/" element={<AllSongs />} />
                <Route path="/playlists" element={<PlayLists />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </MusicProvider>
  );
}

export default App;
