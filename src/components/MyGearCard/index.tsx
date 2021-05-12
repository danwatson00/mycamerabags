import React, { FC, useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import './MyGearCard.css';
import MyGearModal from '../MyGearModal';
import { SelectButtonGroup } from '../Elements';
import { FirebaseTypes, UserGearItem, AuthUser, MyBags } from '../../constants/types';
import editButton from '../../images/edit.svg';
import deleteButton from '../../images/garbage-2.svg';
import infoButton from '../../images/search-1.svg';

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
  const [gearModalVisible, setGearModalVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function onSelectChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedBagId(e.target.value);
  }

  function getSelectedBagInfo(bagId: string) {
    let selectedBag = props.myBags.filter(bag => bag.uid === bagId);
    return selectedBag[0];
  }
  function getHighestRank() {
    let bag = getSelectedBagInfo(selectedBagId);
    let max = 0;
    if(bag.bagGear.length > 0) {
      let max = bag.bagGear[0].rank;
      for (let i = 1, len = bag.bagGear.length; i < len; i++) {
        let value = bag.bagGear[i].rank;
        max = (value > max) ? value : max;
      }
    }
    return max;
  }
  function addGearToBag() {
    const highestRank = getHighestRank();
    if (selectedBagId) {
      props.addGearToBag(props.item.userId, props.item.uid, selectedBagId, highestRank + 1);
    }
  }
  function deleteUserGear() {
    props.firebase.deleteUserGear(props.item.userId, props.item.uid).then(result => {
      props.getMyGear();
    });
  }
  function hideGearModal() {
    setGearModalVisible(false);
  }
  function showGearModal(editFlag: boolean) {
    setIsEdit(editFlag);
    setGearModalVisible(true);
  }
  function renderGearToolbar() {
    return (
      <div className="gear-toolbar center">
        <div className="clickable toolbar-button" onClick={() => showGearModal(false)}>
          <img src={infoButton} alt="more info button" />
          <span>Info</span>
        </div>
        <div className="clickable toolbar-button" onClick={() => showGearModal(true)}>
          <img src={editButton} alt="edit button"/>
          <span>Edit</span>
        </div>
        {!deleteConfirmVisible &&
          <div className="clickable toolbar-button" onClick={() => setDeleteConfirmVisible(true)}>
            <img src={deleteButton} alt="delete button" />
            <span>Delete</span>
          </div>
        }
        {deleteConfirmVisible &&
          <div className="clickable toolbar-button" onClick={() => deleteUserGear()}>
            <span>Click Again To Delete</span>
          </div>
        }
        
      </div>
    )
  }

  return (
    <div>
      <img className="gear-card-image" src={props.item.imageUrl} alt={props.item.make + ' ' + props.item.model} />
      <h4 className="center">{props.item.make + ' ' + props.item.model}</h4>
      <div className="gear-card-select-btn-group">
        <SelectButtonGroup
          value={selectedBagId}
          placeholder="Select a Bag"
          options={props.myBags} 
          onChange={onSelectChange}
          optionNameRenderer={(value: any) => {
            return value.title;
          }} 
          optionValueRenderer={(value: any) => {
            return value.uid;
          }}
          disabled={selectedBagId === ""}
          label={"Add to Bag"}
          click={addGearToBag}
          name="add-to-bag"
        />
      </div>
      {renderGearToolbar()}
      {gearModalVisible &&
        <MyGearModal
          getMyGear={myGearCardState.getMyGear}
          item={myGearCardState.item}
          hideGearModal={hideGearModal}
          isEdit={isEdit}
        />
      }
    </div>
  )
}

export default withFirebase(MyGearCard);