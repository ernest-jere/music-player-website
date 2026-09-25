# 🔉 Music Prayer

A sleek, modern, glassmorphic music streaming web application built with **React**, **Vite**, and **React Router**. The player manages audio streams globally, features live search filtering, and persists custom user-made playlists straight to the browser's persistent storage.

---

## ✨ Features

- **Global Audio Control Hub:** Seamless persistent sidebar playback that continues singing even when navigating between internal page routes.
- **Dynamic Live Search:** Instantly filter out song tracks or specific artists from your media catalog with a fast glassmorphic search input.
- **Multiple Named Playlists:** Create customized named folders on-demand to curate different moods.
- **LocalStorage Data Sync:** Your custom playlists, track additions, and folder arrangements save and load automatically between browser sessions.
- **🔒 Protected Core Playlist:** The standard `Favorites` playlist is hardcoded as a protected system core folder—it can never be deleted or modified out of memory.
- **Interactive Control Logic:** Full support for timeline progress scrubbing, custom track skips (next/prev auto-loop queues), automatic song advancing on track end, and master volume controls.

---

## 🛠️ Tech Stack & Concepts

- **Frontend Library:** React 18+ (Hooks: `useState`, `useEffect`, `useRef`, `useContext`)
- **Routing Infrastructure:** React Router DOM (v6)
- **State Architecture:** React Context API (Providing a single source of truth for synchronization)
- **Styling Architecture:** Modern CSS Grid, Flexbox alignment, Backdrop filters, and Keyframe animations.

---

## 💡 The Architecture: Solving the State Challenge

Initially, independent components (`MusicPlayer` and `AllSongs`) spun up isolated copies of their data hooks, causing state mismatch bugs and triggering the *"React has detected a change in the order of Hooks"* warning. 

We resolved this by implementing the **React Context API** (`MusicContext`). By wrapping the `<BrowserRouter>` layout tree inside a global state provider (`<MusicProvider>`), both the permanent sidebar layout and your dynamic content pages share a synchronized, single-instance audio state machine.

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### 1. Clone the Project
```bash
git clone <your-repository-url>
cd music-player-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Audio Assets
Make sure your audio tracks are placed inside the project's public folder path so the HTML5 audio element can fetch them:
`public/songs/Breaching.wav`
`public/songs/Forgotten Memories.wav`
*(etc...)*

### 4. Boot Up Local Server
```bash
npm run dev
```
Open the provided local server URL (usually `http://localhost:5173`) in your browser to experience the player!

---

## 🗂️ Project Structure

```text
├── src/
│   ├── components/
│   │   ├── AllSongs.jsx      # Media grid layout + Search bar + Playlist drops
│   │   ├── MusicPlayer.jsx   # Sidebar controller with useRef HTML5 Audio bridge
│   │   └── PlayLists.jsx    # Playlists Hub tab navigator with deletion safety
│   ├── context/
│   │   └── MusicContext.jsx  # Global audio engine state machine & LocalStorage sync
│   ├── hooks/
│   │   └── useMusic.js       # Custom consumer hook wrapper
│   ├── App.jsx               # Layout Router initialization
│   ├── index.css             # Glassmorphic themes, track styling, animations
│   └── main.jsx              # DOM Mounting point
└── README.md
```
---

## 🎵 How to Add New Audio Files

To expand your music catalog and add more tracks to the application, follow these two steps:

### 1. Place the Audio File
Drop your audio files (`.wav` or `.mp3`) directly into the project's public songs folder:
`public/songs/Your-New-Song.wav`

### 2. Update the Songs Array
Open `src/context/MusicContext.jsx` and append a new track object to the static `songs` array at the top of the file:

```javascript
const songs = [
    // ... existing songs
    {
        id: 9, // Ensure the ID is unique incremented
        title: "Your New Song Title",
        artist: "Artist Name",
        url: "songs/Your-New-Song.wav", // Note: Omit "public/" from the runtime URL
        duration: 210 // Duration of the track in seconds
    }
];
```

*Note: In production deployments like Vercel, the contents of the `public/` directory are hosted at the root level. Ensure your `url` path starts directly with `songs/...` rather than `public/songs/...` so the paths don't break online.*

---

