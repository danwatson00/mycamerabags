import React, { Component } from 'react';
import './Modal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  render() {
    return (
      <div>
      <Button class="btn btn-default" label="More Info" click={() => this.openModal()} />
        {this.state.modalVisible &&
        <div className="modal-container">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">{this.props.title}</h2>
              <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.closeModal()} />
            </div>
            <div className="modal-body">
            </div>
            <div className="modal-footer">
              <Button class="btn btn-default close-button" label="Close" click={() => this.closeModal()} />
            </div>
          </div>
        </div>
        }
      </div>

    )
  }
}

export default Modal;