import React, { FC, useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import './MyBagCard.css';
import Button from '../Button';
import MyBagModal from '../MyBagModal';
import blankLogo from '../../images/logo-blank-sm.png'
import { AuthUserContext } from '../Session';
import { FirebaseTypes, MyGear, MyBag } from '../../constants/types';

interface MyBagCardProps {
  firebase: FirebaseTypes;
  myGear: MyGear[];
  bag: MyBag;
  getMyBags(): void;
  moveUpRank(bagUid: string, index: number): void;
  moveDownRank(bagUid: string, index: number): void;
  saveBagGear(bagUid: string, bagGear: string[]): void;
}

const MyBagCard: FC<MyBagCardProps> = (props) => {

  const [myBagCardState, setBagCardState] = useState(props);
  useEffect(() => {
    setBagCardState(props)
  }, [props]); 
  

  function deleteBag() {
    props.firebase.deleteBag(myBagCardState.bag.user, myBagCardState.bag.uid).then(result => {
      if (result) {
        myBagCardState.getMyBags();
      }
    });
  }
  return (
    <div className="bag-card">
      <img src={blankLogo} className="bag-card-graphic" alt="Camera Bag" />
      <h4 className="card-title">{myBagCardState.bag.title}</h4>
      <AuthUserContext.Consumer>
        {authUser =>
          <MyBagModal 
            bag={myBagCardState.bag}
            authUser={authUser} 
            firebase={myBagCardState.firebase}
            getMyBags={myBagCardState.getMyBags}
            moveUpRank={myBagCardState.moveUpRank}
            moveDownRank={myBagCardState.moveDownRank}
            saveBagGear={myBagCardState.saveBagGear}
            myGear={myBagCardState.myGear}
          />
        }
      </AuthUserContext.Consumer>
      <Button class="btn btn-default" label="Delete Bag" click={deleteBag} />
    </div>
  );
}

export default withFirebase(MyBagCard);