import React, { FC, useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import './GearForm.css';
import FileUpload from '../FileUpload';
import { FirebaseTypes, GlobalGearItem } from '../../constants/types';
/* import Button from '../Button'; */

interface GearFormProps {
  isEditMode: Boolean;
  item: GlobalGearItem;
  firebase: FirebaseTypes;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onSelectChange(e: React.ChangeEvent<HTMLSelectElement>): void;
  onTextAreaChange(e: React.ChangeEvent<HTMLTextAreaElement>): void;
  onImageUrlChange(url: string): void;
  isMyGear: boolean;
}

const GearForm: FC<GearFormProps> = (props) => {

  const [gearFormState, setGearFormState] = useState(props);
  useEffect(() => {
    setGearFormState(props)
  }, [props]);

  const categories = [
    'Digital Cameras',
    'Lenses',
    'Drones and Aerial',
    'Tripods and Support',
    'Memory Cards and Accessories',
    'Batteries and Power Accessories',
    'Flashes and On Camera Lighting',
    'Photo Accessories',
    'Lens Filters',
    'Lens Accessories',
    'Lighting',
    'Computers and Accessories',
    'Medium/Large Format Accessories',
    'Film Cameras',
    'Film',
    'Mobile Photo and Video Accessories',
    'Other'
  ];

  function saveImage(file: File) {
   const storageRef = props.firebase.storage.ref();
   const imagesRef = storageRef.child('images');
   const imageRef = imagesRef.child(file.name);
   imageRef.put(file).then((reference: any) => {
     storageRef.child(reference.metadata.fullPath).getDownloadURL().then((url: any) => {
       props.onImageUrlChange(url);
     });
   });;
  }

    /* const isInvalid = 
      this.state.make === '' || 
      this.state.model === '' || 
      this.state.category === '' ||
      this.state.subCategory === '' ||
      this.state.description === '' ||
      this.state.imageUrl === '' ||
      this.state.manualUrl === ''; */

    return (
      <div id="gear-form">
        {/* <img className="modal-image" loading="lazy" src={gearFormState.item.imageUrl} alt={gearFormState.item ? gearFormState.item.make + ' ' + gearFormState.item.model : 'photo equipment'} /> */}
        <div className="form-row">
          <label>Make:</label>
          <input type="text" name="make" value={gearFormState.item.make} onChange={e => props.onChange(e)}/>
        </div>
        <div className="form-row">
          <label>Model:</label>
          <input type="text" name="model" value={gearFormState.item.model} onChange={e => props.onChange(e)}/>
        </div>
        <div className="form-row">
          <label>Category:</label>
          <select name="category" value={gearFormState.item.category} onChange={e => props.onSelectChange(e)}>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>{category}</option>
              )
            })}
          </select>
        </div>
        <div className="form-row">
          <label>SubCategory:</label>
          <input type="text" name="subCategory" value={gearFormState.item.subCategory} onChange={e => props.onChange(e)} />
        </div>
        <div className="form-row">
          <label>Description:</label>
          <textarea name="description" rows={8} cols={45} value={gearFormState.item.description} onChange={e => props.onTextAreaChange(e)} />
        </div>
        <div className="form-row">
          <label>Gear Image:</label>
          <FileUpload
            saveImage={saveImage}
          />
        </div>
        <div className="form-row">
          <label>Instructions/Manual:</label>
          <input type="text" name="manualUrl" value={gearFormState.item.manualUrl} onChange={e => props.onChange(e)} />
        </div>
        <div className="form-row">
          <label>Specs:</label>
          <input type="text" name="specs" value={gearFormState.item.specs} onChange={e => props.onChange(e)} />
        </div>
        {!gearFormState.isMyGear &&
          <div className="form-row">
          <label>Buy New Url:</label>
          <input type="text" name="buyNewUrl" value={gearFormState.item.buyNewUrl} onChange={e => props.onChange(e)} />
        </div>
        }
      </div>
    );
}

export default withFirebase(GearForm);