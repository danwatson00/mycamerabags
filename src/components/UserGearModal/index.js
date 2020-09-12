import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './UserGearModal.css';
import Button from '../Button';
import GearForm from '../GearForm';
import closeButton from '../../images/close-button.svg';

class UserGearModal extends Component {
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
  }

 /*  onSubmit = event => {
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
  } */

  renderInfoMode() {
    return (
      <div>
        <img className="modal-image" loading="lazy" src={this.props.item.imageUrl} alt={this.props.item.make + ' ' + this.props.item.model} />
        <h4>Description</h4>
        <p>{this.props.item.description}</p>
        <h4><a href={this.props.item.manualUrl} rel="noopener noreferrer" target="_blank">Download Product Manual</a></h4>
      </div>
    )
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          <div className="modal-header">
            {!this.state.editMode &&
              <div>
                <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.props.hideModal()} />
                <h2 className="modal-title">{this.props.item.make + ' ' + this.props.item.model}</h2><br />
                <small>Category: {this.props.item.category}: {this.props.item.subCategory}</small>
              </div>
            }
            {this.state.editMode &&
              <h2>Edit Gear</h2>
            }
          </div>
          <div className="modal-body">
          {!this.state.editMode && 
            this.renderInfoMode()
          }
          {this.state.editMode &&
            <GearForm
                isEditMode={true}
                item={this.props.item}
                isUserGear={true}
            />
          }
          </div>
          <div className="modal-footer">
            {!this.state.editMode && 
              <div>
                <Button class="btn btn-default cancel-button" label="Close" click={() => this.props.hideModal()} />
                <Button class="btn btn-default" label="Edit" click={() => this.onClick()} />
              </div>
            }
            {this.state.editMode &&
              <div>
                <Button class="btn btn-default" label="Update" click={() => this.onClick()} />
                <Button class="btn btn-default close-button" label="Close" click={() => this.props.hideModal()} />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withFirebase(UserGearModal);