import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './CreateGearModal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';
import CreateGear from '../CreateGear'

class CreateGearModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <Button class="btn btn-default" label="Create Gear" click={() => this.openModal()} />
        {this.state.modalVisible &&
          <div className="modal-container">
            <div className="modal">
              <div className="modal-header">
                <h2 className="modal-title">{this.props.title}</h2>
                <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.closeModal()} />
              </div>
              <div className="modal-body">
              <CreateGear />
              </div>
              <div className="modal-footer">
                <Button class="btn btn-default cancel-button" label="Cancel" click={() => this.closeModal()} />
                <Button class="btn btn-default" label="Update" click={() => this.onSubmit()} />
              </div>
            </div>
            
          </div>
        }
      </div>
    );
  }
}

export default withFirebase(CreateGearModal);