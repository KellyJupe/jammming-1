import React from 'react';
import './Track.css';
let isRemoval = true;

class Track extends React.Component {

  constructor(isRemoval){
    super(isRemoval);
    isRemoval = true;
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>'Track Name'</h3>
          <p>'Track Artist | Track Album'</p>
        </div>
          <a className="Track-action">


      </a>
      </div>
    );
  }

  renderAction()
  {

    if (isRemoval) {
      return <span>-</span>;
    } else {
      return <span>+</span>;
    }
  }
}




export default Track;
