import React, { FC, useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import './CreateGear.css';
import FileUpload from '../FileUpload';
import { FirebaseTypes, GlobalGearItem, AuthUser } from '../../constants/types';

interface MyGearFormProps {
  isEditMode: Boolean;
  item: GlobalGearItem;
  firebase: FirebaseTypes;
  getAllGear(): void;
  hideModal(): void;
  authUser: AuthUser;
}

const MyGearForm: FC<MyGearFormProps> = (props) => {

  const [make, setMake] = useState(props.isEditMode ? props.item.make : '');
  const [model, setModel] = useState(props.isEditMode ? props.item.model : '');
  const [category, setCategory] = useState(props.isEditMode ? props.item.category : '');
  const [subCategory, setSubCategory] = useState(props.isEditMode ? props.item.subCategory : '');
  const [imageUrl, setImageUrl] = useState(props.isEditMode ? props.item.imageUrl : '');
  const [description, setDescription] = useState(props.isEditMode ? props.item.description : '');
  const [manualUrl, setManualUrl] = useState(props.isEditMode ? props.item.manualUrl : '');
  const [specs, setSpecs] = useState(props.isEditMode ? props.item.specs : '');
  const [buyNewUrl, setBuyNewUrl] = useState(props.isEditMode ? props.item.buyNewUrl : '');

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
        setImageUrl(url);
      });
    });;
  }

  const item = {
    make: make,
    model: model,
    category: category,
    subCategory: subCategory,
    imageUrl: imageUrl,
    description: description,
    manualUrl: manualUrl,
    specs: specs,
    buyNewUrl: buyNewUrl,
    userId: props.authUser.uid
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (props.isEditMode) {
      props.firebase.updateGear(item, props.item.uid).then(() => {
        setMake('');
        setModel('');
        setCategory('');
        setSubCategory('');
        setImageUrl('');
        setDescription('');
        setManualUrl('');
        setSpecs('');
        setBuyNewUrl('');
        props.getAllGear();
        props.hideModal();
      }).catch(error => {
        console.log("error", error);
      });
    } else {
      props.firebase.createUserGear(item, props.authUser.uid).then(() => {
        setMake('');
        setModel('');
        setCategory('');
        setSubCategory('');
        setImageUrl('');
        setDescription('');
        setManualUrl('');
        setSpecs('');
        setBuyNewUrl('');
        props.getAllGear();
        props.hideModal();
      }).catch(error => {
        console.log("error", error);
      });
    }
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
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Make:</label>
          <input type="text" name="make" value={make} onChange={e => setMake(e.target.value)} />
        </div>
        <div>
          <label>Model:</label>
          <input type="text" name="model" value={model} onChange={e => setModel(e.target.value)} />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>{category}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label>SubCategory:</label>
          <input type="text" name="subCategory" value={subCategory} onChange={e => setSubCategory(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <input type="textarea" name="description" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Gear Image:</label>
          <FileUpload
            saveImage={saveImage}
          />
        </div>
        <div>
          <label>Instructions/Manual:</label>
          <input type="text" name="manualUrl" value={manualUrl} onChange={e => setManualUrl(e.target.value)} />
        </div>
        <label>Specs:</label>
        <input type="text" name="specs" value={specs} onChange={e => setSpecs(e.target.value)} />
        <div>
          <label>Buy New Url:</label>
          <input type="text" name="buyNewUrl" value={buyNewUrl} onChange={e => setBuyNewUrl(e.target.value)} />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default withFirebase(MyGearForm);