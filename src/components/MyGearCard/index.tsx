import React, { FC, useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import './MyGearCard.css';
import Button from '../Button';
import UserGearModal from '../UserGearModal';
import * as Elements from '../Elements';
import { FirebaseTypes, UserGearItem, AuthUser, MyBags } from '../../constants/types';

  interface MyGearCardProps {
    authUser: AuthUser;
    firebase: FirebaseTypes;
    item: UserGearItem;
    myBags: MyBags[];
    addGearToBag(userId: string, uid: string, bagId: string, rank: number): void;
    getMyGear(): void;
  }

  const MyGearCard: FC<MyGearCardProps> = (props) => {

    const [myGearCardState, setGearCardState] = useState(props);
    useEffect(() => {
      setGearCardState(props)
    }, [props]); 
    const [selectedBagId, setSelectedBagId] = useState('');
    const [highestRank, setHighestRank] = useState(0);
    const [gearModalVisible, setGearModalVisible] = useState(false);

    function onSelectChange(e: React.ChangeEvent<HTMLInputElement>) {
      let value = e.target.value;
      setSelectedBagId(e.target.value);
      setHighestRank(0);
      getHighestRank();
    }
    function getSelectedBagInfo(bagId: string) {
      let selectedBag = props.myBags.filter(bag => bag.uid == bagId);
      return selectedBag[0];
    }
    function getHighestRank() {
      let bag = getSelectedBagInfo(selectedBagId);
      if(bag.bagGear.length > 0) {
        let max = bag.bagGear[0].rank;
        for (let i = 1, len = bag.bagGear.length; i < len; i++) {
          let value = bag.bagGear[i].rank;
          max = (value > max) ? value : max;
        }
        setHighestRank(max);
      }
    }
    function addGearToBag() {
      if (selectedBagId) {
        props.addGearToBag(props.item.userId, props.item.uid, selectedBagId, highestRank + 1);
      }
    }
    function deleteUserGear(userId: string, id: string) {
      props.firebase.deleteUserGear(props.item.userId, props.item.uid).then(result => {
        props.getMyGear();
      });
    }
    function hideGearModal() {
      setGearModalVisible(false);
    }
    function showGearModal() {
      setGearModalVisible(true);
    }

    return (
      <div>
        <img className="gear-card-image" src={props.item.imageUrl} alt={props.item.make + ' ' + props.item.model} />
        <h4>{props.item.make + ' ' + props.item.model}</h4>
          <Elements.Select
            placeholder="Select a Bag"
            options={props.myBags} 
            onChange={onSelectChange}
            optionNameRenderer={(value: any) => {
              return value.title;
            }} 
            optionValueRenderer={(value: any) => {
              return value.uid;
            }}
          />
        <Button class="btn btn-default" name="add-to-bag" label="Add to Bag" click={addGearToBag} />
        <Button class="btn btn-default" name="delete" label="Delete" click={deleteUserGear} />
        <Button class="btn btn-default" name="info-modal" label="More Info" click={showGearModal} />
        {gearModalVisible &&
          <UserGearModal
            getMyGear={myGearCardState.getMyGear}
            item={myGearCardState.item}
            hideModal={hideGearModal}
          />
        }
      </div>
    )
}

export default withFirebase(MyGearCard);