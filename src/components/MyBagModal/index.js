import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './MyBagModal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';
import upArrow from '../../images/sort-up-arrow.png';
import downArrow from '../../images/sort-down-arrow.png';

class MyBagModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      editMode: false
    };
  }
  moveUpRank(index) {
    this.props.moveUpRank(this.props.bag.uid, index);
  }
  moveDownRank(index) {
    this.props.moveDownRank(this.props.bag.uid, index);
  }
  openModal() {
    this.setState({ modalVisible: true });
  }
  closeModal() {
    this.setState({ modalVisible: false });
  }
  handleCancelClick() {
    this.setState({ editMode: false });
  }
  handleEditClick() {
    this.setState({ editMode: true });
  }
  handleSaveClick() {
    this.props.saveBagGear(this.props.bag.uid, this.props.bag.bagGear);
  }
  renderGearRow(item, index) {
    let gearItem = this.props.myGear.filter(x => x.uid === item.gearId);
    return (
      <tr key={index}>
        <td>
          <img className="my-bag-modal-image" src={gearItem[0].imageUrl} alt={gearItem[0].make + ' ' + gearItem[0].model} />
        </td>
        <td className="my-bag-modal-desc">
          {gearItem[0].make + ' ' + gearItem[0].model}
        </td>
        {this.state.editMode &&
          <td>
            <img className="sort-arrow clickable" src={upArrow} alt="sort up arrow" onClick={() => this.moveUpRank(index)}/>
            <img className="sort-arrow clickable" src={downArrow} alt="sort down arrow" onClick={() => this.moveDownRank(index)}/>
        </td>
        }
      </tr>
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
                <img className="close-cross" loading="lazy" width="35px" height="35px" src={closeButton} alt="close button" onClick={() => this.closeModal()} />
                <h2 className="modal-title">{this.props.bag.title}</h2>
              </div>
              <div className="modal-body">
                <h4>Description</h4>
                <p>{this.props.bag.description}</p>
                <table>
                  <tbody>
                    {this.props.bag.bagGear.map((item, index) => {
                        return (
                          this.renderGearRow(item, index)
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                {this.state.editMode &&
                  <div>
                    <Button class="btn cancel-button" label="Cancel" click={() => this.handleCancelClick()} />
                    <Button class="btn save-button" label="Save Changes" click={() => this.handleSaveClick()} />
                  </div>
                }
                {!this.state.editMode &&
                  <div>
                    <Button class="btn edit-button" label="Edit" click={() => this.handleEditClick()} />
                    <Button class="btn btn-default close-button" label="Close" click={() => this.closeModal()} />
                  </div>
                }
                
              </div>
            </div>
        </div>
        }
      </div>
    );
  }
}

export default withFirebase(MyBagModal);