import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './GearModal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      editMode: false,
      make: '',
      model: '',
      category: '',
      subCategory: '',
      imageUrl: '',
      description: '',
      manualUrl: '',
      specs: '',
      buyNewUrl: '',
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
    this.onChange = this.onChange.bind(this);
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  onSubmit = event => {
    const item = {};
    if (this.state.make)
      item.make = this.state.make;
    if (this.state.model)
      item.model = this.state.model;
    if (this.state.category)
      item.category = this.state.category;
    if (this.state.subCategory)
      item.subCategory = this.state.subCategory;
    if (this.state.imageUrl)
      item.imageUrl = this.state.imageUrl;
    if (this.state.description)
      item.description = this.state.description;
    if (this.state.manualUrl)
      item.manualUrl = this.state.manualUrl;
    if (this.state.specs)
      item.specs = this.state.specs;
    if (this.state.buyNewUrl)
      item.buyNewUrl = this.state.buyNewUrl;

    event.preventDefault();
    this.props.firebase.updateGear(item, this.props.item.uid)
      .catch(error => {
        console.log("props error", error);
        this.setState({
          error
        });
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
      }).then(() => {
        this.closeModal();
      })
  }

  onClick() {
    this.setState({editMode: true});
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderInfoMode() {
    return (
      <div className="modal">
        <div className="modal-header">
          <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.closeModal()} />
          <h2 className="modal-title">{this.props.item.make + ' ' + this.props.item.model}</h2><br />
          <small>Category: {this.props.item.category}: {this.props.item.subCategory}</small>
        </div>
        <div className="modal-body">
          <img className="modal-image" loading="lazy" src={this.props.item.imageUrl} alt={this.props.item.make + ' ' + this.props.item.model} />
          <h4>Description</h4>
          <p>{this.props.item.description}</p>
          <h4><a href={this.props.item.manualUrl} rel="noopener noreferrer" target="_blank">Download Product Manual</a></h4>
        </div>
        <div className="modal-footer">
          <Button class="btn btn-default" label="Update" click={() => this.onClick()} />
          <Button class="btn btn-default close-button" label="Close" click={() => this.closeModal()} />
        </div>
      </div>
    )
  }

  renderEditMode() {
    return (
      <div className="modal">
        <div className="modal-header">
         <h2>Edit</h2>
        </div>
        <div className="modal-body">
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
              {this.state.categories.map((category, index) => {
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
        <div className="modal-footer">
          <Button class="btn btn-default cancel-button" label="Cancel" click={() => this.closeModal()} />
          <Button class="btn btn-default" label="Update" click={() => this.onSubmit()} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Button class="btn btn-default" label="More Info" click={() => this.openModal()} />
        {this.state.modalVisible &&
        <div className="modal-container">
            {!this.state.editMode && 
              this.renderInfoMode()
            }
            {this.state.editMode &&
              this.renderEditMode()
            }
        </div>
        }
      </div>
    );
  }
}

export default withFirebase(Modal);