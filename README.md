# 🔉 Music Prayer

A sleek, modern, glassmorphic music streaming web application built with **React**, **Vite**, and **React Router**. The player manages audio streams globally, features live search filtering, and persists custom user-made playlists straight to the browser's persistent storage. 

🔗 **Live Production Deployment:** [https://music-player-website-sigma.vercel.app/](https://music-player-website-sigma.vercel.app/) 

### ✨ Features

* **Global Audio Control Hub:** Seamless persistent sidebar playback that continues playing even when navigating between internal page routes.
* **Dynamic Live Search:** Instantly filter out song tracks or specific artists from your media catalog with a fast glassmorphic search input.
* **Multiple Named Playlists:** Create customized named folders on-demand to curate different moods.
* **LocalStorage Data Sync:** Your custom playlists, track additions, and folder arrangements save and load automatically between browser sessions.
* **🔒 Protected Core Playlist:** The standard Favorites playlist is hardcoded as a protected system core folder—it can never be deleted or modified out of memory.
* **Interactive Control Logic:** Full support for timeline progress scrubbing, custom track skips (next/prev auto-loop queues), automatic song advancing on track end, and master volume controls.

### 🛠️ Tech Stack & Concepts

* **Frontend Library:** React 18+ (Hooks: useState, useEffect, useRef, useContext)
* **Routing Infrastructure:** React Router DOM (v6)
* **State Architecture:** React Context API (Providing a single source of truth for synchronization)
* **Styling Architecture:** Modern CSS Grid, Flexbox alignment, Backdrop filters, and Keyframe animations.

### 💡 The Architecture: Solving the State Challenge

Initially, independent components (MusicPlayer and AllSongs) spun up isolated copies of their data hooks, causing state mismatch bugs and triggering the *"React has detected a change in the order of Hooks"* warning. 

We resolved this by implementing the **React Context API** (MusicContext). By wrapping the <BrowserRouter> layout tree inside a global state provider (<MusicProvider>), both the permanent sidebar layout and your dynamic content pages share a synchronized, single-instance audio state machine. 

### 🎵 How to Add New Audio Files

To expand your music catalog and add more tracks to the application, follow these two steps: 

### 1. Place the Audio File

Drop your compressed audio files (.mp3) directly into the project's public songs folder:
public/songs/your-new-song.mp3 (Ensure folder and file extensions use lowercase lettering) 

### 2. Update the Songs Array

Open src/context/MusicContext.jsx and append a new track object to the static songs array at the top of the file: 

javascript

const songs = [
    // ... existing songs
    {
        id: 9, // Ensure the ID is uniquely incremented
        title: "Your New Song Title",
        artist: "Artist Name",
        url: "songs/your-new-song.mp3", // Omit "public/" from runtime production routing URL pathing
        duration: 210 // Duration of the track in seconds
    }
];

Use code with caution.

### 🚀 Deployment & Local Build Guide

### 1. Run the Project Locally

bash

npm install
npm run dev

Use code with caution.

### 2. Push Updates via SSH

bash

git add .
git commit -m "fix: resolve production audio pathing layout and update readme links"
git push origin main

Use code with caution.

### 3. Client Routing on Vercel

Because this application uses react-router-dom for navigation, refreshing the page on routes like /playlists will cause a Vercel 404 error unless handled. The root-level vercel.json configuration file takes care of this by rewriting all browser path queries back to the core template: 

json

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}

Use code with caution.

### 🗂️ Project Structure

text

├── public/
│   └── songs/                # Lowercase folder containing compressed .mp3 files
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
├── vercel.json               # Vercel SPA client rewrite router instructions
└── README.md

Use code with caution.
