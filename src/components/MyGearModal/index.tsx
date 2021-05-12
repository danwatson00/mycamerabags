import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './MyGearModal.css';
import Button from '../Button';
import GearForm from '../GearForm';
import closeButton from '../../images/close-button.svg';
import { FirebaseTypes, UserGearItem, AuthUser } from '../../constants/types';

interface MyGearModalProps {
  getMyGear(): void;
  item: UserGearItem;
  hideGearModal(): void;
  firebase: any;
  isEdit: boolean;
}

interface MyGearModalState {
  modalVisible: boolean;
  editMode: boolean;
  make: string;
  model: string;
  category: string;
  subCategory: string;
  imageUrl: string;
  description: string;
  manualUrl: string;
  specs: string;
  buyNewUrl: string;
  categories: string[];
  item: any;
}

class MyGearModal extends Component<MyGearModalProps, MyGearModalState> {
  constructor(props: MyGearModalProps) {
    super(props);

    this.state = {
      modalVisible: false,
      editMode: false,
      item: this.props.item ? this.props.item :
        {
          make: '',
          model: '',
          category: '',
          subCategory: '',
          imageUrl: '',
          description: '',
          manualUrl: '',
          specs: '',
          buyNewUrl: ''
        },
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
  }*/

  deleteMyGear(userId: string, id: string) {
    this.props.firebase.deleteUserGear(this.props.item.userId, this.props.item.uid).then(() => {
      this.props.getMyGear();
    });
  }

  onImageUrlChange(url: string) {
    this.setState({ imageUrl: url });
  }

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
      <div className="modal-container modal-lg">
        <div className="modal">
          <div className="modal-header">
            {!this.props.isEdit &&
              <div>
                <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.props.hideGearModal()} />
                <h2 className="modal-title">{this.props.item.make + ' ' + this.props.item.model}</h2><br />
                <small>Category: {this.props.item.category}: {this.props.item.subCategory}</small>
              </div>
            }
            {this.props.isEdit &&
              <h2>Edit My Gear</h2>
            }
          </div>
          <div className="modal-body">
            {!this.props.isEdit &&
              this.renderInfoMode()
            }
            {this.props.isEdit &&
              <GearForm
                  isEditMode={true}
                  item={this.props.item}
                  isUserGear={true}
              />
            }
          </div>
          <div className="modal-footer">
            {!this.props.isEdit &&
              <div>
                <Button class="btn btn-default cancel-button" label="Close" click={() => this.props.hideGearModal()} />
              </div>
            }
            {this.props.isEdit &&
              <div>
                <Button class="btn btn-default close-button" label="Close" click={() => this.props.hideGearModal()} />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default withFirebase(MyGearModal);