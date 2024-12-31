import React, {useState, useCallback} from 'react';
import '../css/App.css';
import Spotify from "../util/Spotify.js";
import Playlist from "./Playlist.js";
import SearchResults from "./SearchResults.js";
import SearchBar from "./SearchBar.js";


function App() {

  const [searchResults, setSearchResults] = useState('');
  const [playlistName, setPlaylistName]= useState('New Playlist');
  const [playlistTrack, setPlaylistTracks] = useState([]);

    //search for a track  using the Spotify API
    const search = useCallback((inputSearch) => {
        Spotify.search(inputSearch).then(setSearchResults);
    },[]);

    
    const addToPlaylist = useCallback((track) => {
      if(!playlistTrack.some((existingTrack) => existingTrack.id === track.id)) {
        setPlaylistTracks([...playlistTrack, track]);
      }
    },[playlistTrack]);
   
    const removeFromPlaylist = useCallback((track) => {
      setPlaylistTracks(playlistTrack.filter((existingTrack) => existingTrack.id !== track.id));
    }, [playlistTrack]);

    const updatePlaylist = useCallback((name) => {
      setPlaylistName(name);
    }, []);

    const savePlaylist = useCallback(() => {
      const trackURIs = playlistTrack.map((track) => track.uri);
      Spotify.savePlaylist(playlistName, trackURIs).then(() => {
        setPlaylistName('New Playlist');
        setPlaylistTracks([]);
      });
    }, [playlistName, playlistTrack]);
    
  return (
    <div className="App">
      <header> 
        <h1>JamSess</h1>
      </header>
      <div className="BannerContainer">
        <h2>Search for your favorite songs on Spotify and add them to your playlist</h2>
      </div>
      <div className="SearchContainer">
        <SearchBar onSearch={search}/>
      </div>
      <div className="ResultsSection">
        <SearchResults searchResults={searchResults} addSong={addToPlaylist} />
      </div>
     
     <div className="PlaylistContainer"> 
      <Playlist
        playlistName={playlistName}
        playlistTracks={playlistTrack}
        onUpdateName={updatePlaylist}
        onRemoveTrack={removeFromPlaylist}
        onSave={savePlaylist} />
    </div>
      <footer className="footer">
        <p> © Copyright <a href="https://www.linkedin.com/in/keshia-coriolan/">Keshia C. 2024</a></p>
      </footer> 
    </div>

    );
};



export default App;