import React from 'react';
import './Track.css';

class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>'Track Name'</h3>
          <p>'Track Artist | Track Album'</p>
        </div>
          <a className="Track-action">
        //function renderAction() {
          //const isRemoval = props.isRemoval;
        // isRemoval = true ? false {
        //  return '-';
        //  }
      //    return '+';
      //  }
        renderAction() {
          if (isRemoval) = true {
            return '-';
          }
          else {
            return '+';
          }
        }

        </a>
      </div>
    )
  }
}

/*class Track-action extends React.Component {
  render() {

  }
}

function renderAction() {
  if ('isRemoval === isRemoval ? isRemoval') {
  return '-';
  }
  else {
    return '+';
  }
}*/

export default Track;
