import React from 'react';
import { withFirebase } from '../Firebase';
import './bagCard.css';
import BagModal from '../BagModal';
import blankLogo from '../../images/logo-blank-sm.png';

function BagCard(props) {
  return (
      <div className="bag-card">
        <img src={blankLogo} className="bag-card-graphic" alt="Camera Bag" />
        <h4 className="card-title">{props.bag.title}</h4>
            <BagModal 
              bag={props.bag}
              allGear={props.allGear}
              users={props.users}
            />
      </div>
    )
}

export default withFirebase(BagCard);