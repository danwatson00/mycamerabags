import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './CreateMyGearModal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';
import CreateMyGearForm from '../CreateMyGearForm'

class CreateMyGearModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          <div className="modal-header">
            <h2 className="modal-title">{this.props.title}</h2>
            <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.props.handleHideModal()} />
          </div>
          <div className="modal-body">
            <CreateMyGearForm />
          </div>
          <div className="modal-footer">
            <Button class="btn btn-default cancel-button" label="Cancel" click={() => this.props.handleHideModal()} />
            <Button class="btn btn-default" label="Update" click={() => this.onSubmit()} />
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(CreateMyGearModal);