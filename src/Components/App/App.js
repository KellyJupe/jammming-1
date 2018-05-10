import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React {
  constructor(props) {
    super(props);
this.state = {
  searchResults: [],
  playlistName: '',
  playlistTracks: []
};

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
}

addTrack(track) {
    console.log(`App.addTrack: ${track.id} named: ${track.name}`);

    let tracks = this.state.playlistTracks;
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }
  removeTrack(track) {
    console.log(`App:removeTrack(track): ${track}`);
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(item => {
      console.log(`Filter item: ${item.id} & track item: ${track.id}`);
      if (item.id !== track.id) {
        console.log('To Be Passed!!!!!!');
      } else {
        console.log('FILTERED');
      }
      return item.id !== track.id;
    });
    console.log(`App:removeTrack(track):tracks: ${tracks}`);
    this.setState({playlistTracks: tracks});
  }search(term) {
    console.log(term);
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }
    render() {
          return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
  <SearchBar onSearch={this.search} />
    <div className="App-playlist">
    <SearchResults searchResults={this.state.searchResults}
                      onAdd={this.addTrack} />
      <Playlist playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onNameChange={this.updatePlaylistName}
                      onSave={this.savePlaylist} />
    </div>
  </div>
</div>
    );
  }
}


export default App;
