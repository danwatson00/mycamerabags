import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './CreateGear.css';
import FileUpload from '../FileUpload';

class CreateGearForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: this.props.isEditMode ? this.props.item.make  : '',
      model: this.props.isEditMode ? this.props.item.model : '',
      category: this.props.isEditMode ? this.props.item.category : '',
      subCategory: this.props.isEditMode ? this.props.item.subCategory : '',
      imageUrl: this.props.isEditMode ? this.props.item.imageUrl : '',
      description: this.props.isEditMode ? this.props.item.description : '',
      manualUrl: this.props.isEditMode ? this.props.item.manualUrl : '',
      specs: this.props.isEditMode ? this.props.item.specs : '',
      buyNewUrl: this.props.isEditMode ? this.props.item.buyNewUrl : '',
      categories: [
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
      ]

    };
    /* this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this); */
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  saveImage(file) {
   const storageRef = this.props.firebase.storage.ref();
   const imagesRef = storageRef.child('images');
   const imageRef = imagesRef.child(file.name);
   imageRef.put(file).then((reference) => {
     storageRef.child(reference.metadata.fullPath).getDownloadURL().then((url) => {
       this.setState({ imageUrl: url });
     });
   });;
  }

  onSubmit = event => {
    const item = {
      make: this.state.make,
      model: this.state.model,
      category: this.state.category,
      subCategory: this.state.subCategory,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      manualUrl: this.state.manualUrl,
      specs: this.state.specs,
      buyNewUrl: this.state.buyNewUrl
    }
    event.preventDefault();
    this.props.firebase.createGear(item)
    .catch(error => {
      console.log("props error", error);
      this.setState({ error });
    })
    .then(() => {
      this.setState({
        make: '',
        model: '',
        category: '',
        subCategory: '',
        imageUrl: '',
        description: '',
        manualUrl: '',
        specs: '',
        buyNewUrl: ''
      }, () => this.props.getAllGear());
    })
  }

  render() {

    /* const isInvalid = 
      this.state.make === '' || 
      this.state.model === '' || 
      this.state.category === '' ||
      this.state.subCategory === '' ||
      this.state.description === '' ||
      this.state.imageUrl === '' ||
      this.state.manualUrl === ''; */

    return(
      <div>
        <h1>{this.props.isEditMode ? 'Edit Gear' : 'Create Item'}</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Make:</label>
            <input type="text" name="make" value={this.state.make} onChange={this.onChange}/>
          </div>
          <div>
            <label>Model:</label>
            <input type="text" name="model" value={this.state.model} onChange={this.onChange}/>
          </div>
          <div>
            <label>Category:</label>
            <select name="category" value={this.state.category} onChange={this.onChange}>
              {this.state.categories.map((category, index) => {
                return (
                  <option key={index} name={category} value={category}>{category}</option>
                )
              })}
            </select>
          </div>
          <div>
            <label>SubCategory:</label>
            <input type="text" name="subCategory" value={this.state.subCategory} onChange={this.onChange} />
          </div>
          <div>
            <label>Description:</label>
            <input type="textarea" name="description" value={this.state.description} onChange={this.onChange} />
          </div>
          <div>
            <label>Gear Image:</label>
            <FileUpload
              saveImage={this.saveImage.bind(this)}
            />
            <button>Image URL</button>
            <label>Url:</label>
            <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onChange} />
          </div>
          <div>
            <label>Instructions/Manual:</label>
            <input type="text" name="manualUrl" value={this.state.manualUrl} onChange={this.onChange} />
          </div>
          <div>
            <label>Reviews:</label>
            <input type="text" name="reviews" value={this.state.reviews} onChange={this.onChange} />
          </div>
            <label>Specs:</label>
            <input type="text" name="specs" value={this.state.specs} onChange={this.onChange} />
          <div>
            <label>Buy New Url:</label>
            <input type="text" name="buyNewUrl" value={this.state.buyNewUrl} onChange={this.onChange} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withFirebase(CreateGearForm);