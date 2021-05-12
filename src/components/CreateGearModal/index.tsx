import React, { FC, useState } from 'react';
import { withFirebase } from '../Firebase';
import './CreateGearModal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';
import GearForm from '../GearForm';
import { FirebaseTypes } from '../../constants/types';

interface CreateGearModalProps {
  getAllGear(): void;
  closeModal(modalStateName: string): void;
  firebase: FirebaseTypes;
}

const CreateGearModal: FC<CreateGearModalProps> = (props) => {

  const [item, setItem] = useState({
    make: '',
    model: '',
    category: '',
    subCategory: '',
    imageUrl: '',
    description: '',
    manualUrl: '',
    specs: '',
    buyNewUrl: ''
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    let value = e.target.value;
    setItem({ ...item, [name]: value });
  }

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    let name = e.target.name;
    let value = e.target.value;
    setItem({ ...item, [name]: value });
  }

  function onImageUrlChange(url: string) {
    setItem({ ...item, imageUrl: url });
  }

  function onTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    let name = e.target.name;
    let value = e.target.value;
    setItem({ ...item, [name]: value });
  }

  function onSubmit() {
    props.firebase.createGear(item).then(() => {
      props.getAllGear();
      props.closeModal('createGearModalVisible');
    }).catch(error => {
      console.log("props error", error);
    });
  }

  return (
    <div>
        <div className="modal-container">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">Create Gear</h2>
              <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => props.closeModal('createGearModalVisible')} />
            </div>
            <div className="modal-body">
              <GearForm
                getAllGear={props.getAllGear}
                isEditMode={false}
                onChange={onChange}
                onSelectChange={onSelectChange}
                onImageUrlChange={onImageUrlChange}
                onTextAreaChange={onTextAreaChange}
                item={item}
              />
            </div>
            <div className="modal-footer">
              <Button class="btn btn-default cancel-button" label="Cancel" click={props.closeModal} />
              <Button class="btn btn-default" label="Update" click={onSubmit} />
            </div>
          </div>
        </div>
    </div>
  );
}

export default withFirebase(CreateGearModal);