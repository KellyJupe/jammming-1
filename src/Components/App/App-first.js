import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Playlist from './Components/Playlist/Playlist';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    //<!-- Add a SearchBar component -->
    <div className="App-playlist">
      //<!-- Add a SearchResults component -->
      //<!-- Add a Playlist component -->
    </div>
  </div>
</div>
    );
  }
}

export default App;