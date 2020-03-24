import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './MyBagModal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';

class MyBagModal extends Component {
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

  renderInfoMode() {
    return (
      <div className="modal">
        <div className="modal-header">
          <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.closeModal()} />
          <h2 className="modal-title">{this.props.title}</h2>
        </div>
        <div className="modal-body">
          <h4>Description</h4>
          <p>{this.props.description}</p>
        </div>
        <div className="modal-footer">
          <Button class="btn btn-default close-button" label="Close" click={() => this.closeModal()} />
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
            <div className="modal">
              <div className="modal-header">
                <img className="close-cross" loading="lazy" src={closeButton} alt="close button" onClick={() => this.closeModal()} />
                <h2 className="modal-title">{this.props.title}</h2>
              </div>
              <div className="modal-body">
                <h4>Description</h4>
                <p>{this.props.description}</p>
              </div>
              <div className="modal-footer">
                <Button class="btn btn-default close-button" label="Close" click={() => this.closeModal()} />
              </div>
            </div>
        </div>
        }
      </div>
    );
  }
}

export default withFirebase(MyBagModal);