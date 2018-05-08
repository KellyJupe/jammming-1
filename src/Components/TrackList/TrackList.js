import React, { Component } from 'react';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
          tracks = this.props.searchResults;
      </div>
    );
  }
}

export default TrackList;
