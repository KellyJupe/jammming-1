import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
  render () {
    return (
    <div className="SearchResults">
  <h2>Results</h2>
searchResults: this.state.searchResults;
tracks: this.props.searchResults;
</div>
    );
  }
}

export default SearchResults;
