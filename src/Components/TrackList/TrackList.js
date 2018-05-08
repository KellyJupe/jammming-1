import React, { Component } from 'react';
import './TrackList.css';
import '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
      {
          tracks = this.props.tracks.map(function(tracks, i) {
              return <Track key={track.id} tracks={tracks}/>;
          })
        }
      </div>
    );
  }
}

export default TrackList;
