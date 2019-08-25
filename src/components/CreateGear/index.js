import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './CreateGear.css';

class CreateGearForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      make:'',
      model:'',
      category:'',
      subCategory:'',
      imageUrl: '',
      description: '',
      manualUrl: '',
      specs: '',
      buyNewUrl: ''

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
      }, this.props.getGear())
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

    return(
      <div>
        <h1>Create Item</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Make:
            <input type="text" name="make" value={this.state.make} onChange={this.onChange}/>
          </label>
          <label>
            Model:
            <input type="text" name="model" value={this.state.model} onChange={this.onChange}/>
          </label>
          <label>
          Category:
            <select name="category" value={this.state.category} onChange={this.onChange}>
              {categories.map((category, index) => {
                return (
                  <option key={index} name={category} value={category}>{category}</option>
                )
              })}
            </select>
          </label>
          <label>
            SubCategory:
            <input type="text" name="subCategory" value={this.state.subCategory} onChange={this.onChange} />
          </label>
          <label>
            Description:
            <input type="textarea" name="description" value={this.state.description} onChange={this.onChange} />
          </label>
          <label>
            ImageUrl:
            <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onChange} />
          </label>
          <label>
            Instructions/Manual:
            <input type="text" name="manualUrl" value={this.state.manualUrl} onChange={this.onChange} />
          </label>
          <label>
            Reviews:
            <input type="text" name="reviews" value={this.state.reviews} onChange={this.onChange} />
          </label>
          <label>
            Specs:
            <input type="text" name="specs" value={this.state.specs} onChange={this.onChange} />
          </label>
          <label>
            Buy New Url:
            <input type="text" name="buyNewUrl" value={this.state.buyNewUrl} onChange={this.onChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withFirebase(CreateGearForm);