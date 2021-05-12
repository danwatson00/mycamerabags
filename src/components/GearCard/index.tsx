import React, { FC, useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import './GearCard.css';
import Button from '../Button';
import GearModal from '../GearModal';
import * as Utilities from '../Utilities';
import { FirebaseTypes, GlobalGearItem, AuthUser } from '../../constants/types';

interface GearCardProps {
  authUser: AuthUser;
  firebase: FirebaseTypes;
  item: GlobalGearItem;
  deleteGear(gearUid: string): void;
  getAllGear(): void;
}

const GearCard: FC<GearCardProps> = (props) => {

  const [gearCardState, setGearCardState] = useState(props);
  const [gearModalVisible, setGearModalVisible] = useState(false);
  useEffect(() => {
    setGearCardState(props);
  }, [props]);
  
  function addToUserGear() {
    props.firebase.addToUserGear(gearCardState.authUser.uid, userGear).then(function(querySnapshot) {
      console.log("result", querySnapshot);
      if(querySnapshot) {
        Utilities.sendSuccessMessage('The item has been successfully added to your gear.')
      }
    });
  }

  function deleteGear() {
    props.deleteGear(gearCardState.item.uid);
  }

  function showGearModal() {
    setGearModalVisible(true);
  }

  function hideGearModal() {
    console.log("hideGearModal")
    setGearModalVisible(false)
  }
  
  const userGear = {
    userId: gearCardState.authUser.uid,
    make: gearCardState.item.make ? gearCardState.item.make : '',
    model: gearCardState.item.model ? gearCardState.item.model : '',
    category: gearCardState.item.category ? gearCardState.item.category : '',
    subCategory: gearCardState.item.subCategory ? gearCardState.item.subCategory : '',
    imageUrl: gearCardState.item.imageUrl ? gearCardState.item.imageUrl : '',
    description: gearCardState.item.description ? gearCardState.item.description : '',
    manualUrl: gearCardState.item.manualUrl ? gearCardState.item.make : '',
    specs: gearCardState.item.specs ? gearCardState.item.specs : '',
    buyNewUrl: gearCardState.item.buyNewUrl ? gearCardState.item.buyNewUrl : '',
  }
  
  return (
    <div className="gear-card">
      <img className="gear-card-image" src={gearCardState.item.imageUrl} alt={gearCardState.item.make + ' ' + gearCardState.item.model} />
      <h4>{gearCardState.item.make + ' ' + gearCardState.item.model}</h4>
      <Button class="btn btn-default" name="delete" label="Delete" click={deleteGear} />
      <Button class="btn btn-default" name="add_to_user" label="Add to Gear" click={addToUserGear} />
      <Button class="btn btn-default" name="show_gear_modal" label="More Info" click={showGearModal} />
      
      {gearModalVisible &&
        <GearModal
          getAllGear={gearCardState.getAllGear}
          item={gearCardState.item}
          hideGearModal={hideGearModal}
        />
      }
        
    </div>
  )
}

export default withFirebase(GearCard);