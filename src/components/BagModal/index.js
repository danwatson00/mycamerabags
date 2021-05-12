import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import './bagModal.css';
import Button from '../Button';
import closeButton from '../../images/close-button.svg';

function BagModal(props) {
  const [modalVisible, setModalVisible] = useState(false);

  function renderGearRow(item, index) {
    console.log("item", item);
    let gearItem = props.users.filter(x => x.uid === item.gearId);
    console.log("gearItem", gearItem);
    return (
      <tr key={index}>
        <td>
          <img className="my-bag-modal-image" src={gearItem[0].imageUrl ? gearItem[0].imageUrl : ''} alt={gearItem[0].make + ' ' + gearItem[0].model} />
        </td>
        <td className="my-bag-modal-desc">
          {gearItem[0].make + ' ' + gearItem[0].model}
        </td>
      </tr>
    )
  }

  return (
    <div>
        <button className="btn btn-default" onClick={() => setModalVisible(true)}>More Info</button>
        {modalVisible &&
        <div className="modal-container">
            <div className="modal">
              <div className="modal-header">
                <img className="close-cross" loading="lazy" width="35px" height="35px" src={closeButton} alt="close button" onClick={() => setModalVisible(false)} />
                <h2 className="modal-title">{props.bag.title}</h2>
              </div>
              <div className="modal-body">
                <h4>Description</h4>
                <p>{props.bag.description}</p>
                <table>
                  <tbody>
                    {props.bag.bagGear.map((item, index) => {
                        return (
                        renderGearRow(item, index)
                        );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                  <div>
                    <Button class="btn btn-default close-button" label="Close" click={() => setModalVisible(false)} />
                  </div>
              </div>
            </div>
        </div>
        }
      </div>
  )
} 
/* class BagModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      editMode: false
    };
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
  renderGearRow(item, index) {
    let gearItem = this.props.allGear.filter(x => x.uid === item.gearId);
    return (
      <tr key={index}>
        <td>
          <img className="my-bag-modal-image" src={gearItem[0].imageUrl} alt={gearItem[0].make + ' ' + gearItem[0].model} />
        </td>
        <td className="my-bag-modal-desc">
          {gearItem[0].make + ' ' + gearItem[0].model}
        </td>
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
                  <div>
                    <Button class="btn btn-default close-button" label="Close" click={() => this.closeModal()} />
                  </div>
              </div>
            </div>
        </div>
        }
      </div>
    );
  }
} */

export default withFirebase(BagModal);