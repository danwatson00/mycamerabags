import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './GearModal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';
import GearForm from '../GearForm';

class GearModal extends Component {
  constructor(props) {
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

  onChange = (e) => {
    let item = this.state.item;
    let name = e.target.name;
    let value = e.target.value;
    item[name] = value;
    this.setState({ item });
  }

  onSelectChange = (e) => {
    let item = this.state.item;
    let name = e.target.name;
    let value = e.target.value;
    item[name] = value;
    this.setState({ item });
  }

  onImageUrlChange(url) {
    let item = this.state.item;
    item.imageUrl = url;
    this.setState({ item });
  }

  onTextAreaChange(e) {
    let item = this.state.item;
    let name = e.target.name;
    let value = e.target.value;
    item[name] = value;
    this.setState({ item });
  }

  onSubmit = () => {
    this.props.firebase.updateGear(this.state.item, this.props.item.uid).then(() => {
      this.props.getAllGear();
      this.props.hideGearModal();
    }).catch(error => {
      console.log("props error", error);
      this.setState({
        error
      });
    });
  }

  toggleEditMode() {
    this.setState({editMode: !this.state.editMode});
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  renderInfoMode() {
    return (
      <div>
        <img className="modal-image" loading="lazy" src={this.props.item.imageUrl} alt={this.props.item.make + ' ' + this.props.item.model} />
        <h4>Description</h4>
        <p>{this.props.item.description}</p>
        <h4><a href={this.props.item.manualUrl} rel="noopener noreferrer" target="_blank">Download Product Manual</a></h4>
        <h4>Specs</h4>
        <p>{this.props.item.specs}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          {!this.state.editMode &&
            <div className="modal-header">
              <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.props.hideGearModal()} />
              <h2 className="modal-title">{this.props.item.make + ' ' + this.props.item.model}</h2><br />
              <small>Category: {this.props.item.category}: {this.props.item.subCategory}</small>
            </div>
          }
          {this.state.editMode &&
            <div className="modal-header">
              <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.props.hideGearModal()} />
              <h2>Edit Gear</h2>
            </div>
          }
          <div className="modal-body">
            {!this.state.editMode && 
              this.renderInfoMode()
            }
            {this.state.editMode &&
              <GearForm
                isEditMode={true}
                item={this.state.item}
                onChange={this.onChange.bind(this)}
                onSelectChange={this.onSelectChange.bind(this)}
                onImageUrlChange={this.onImageUrlChange.bind(this)}
                onTextAreaChange={this.onTextAreaChange.bind(this)}
              />
            }
          </div>
          {this.state.editMode &&
            <div className="modal-footer">
            <Button class="btn btn-default cancel-button" label="Back" click={() => this.toggleEditMode()} />
              <Button class="btn btn-default cancel-button" label="Cancel" click={() => this.props.hideGearModal()} />
              <Button class="btn btn-default" label="Save Changes" click={() => this.onSubmit()} />
            </div>
          }
          {!this.state.editMode &&
            <div className="modal-footer">
              <Button class="btn btn-default" label="Edit" click={() => this.toggleEditMode()} />
              <Button class="btn btn-default close-button" label="Close" click={() => this.props.hideGearModal()} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withFirebase(GearModal);