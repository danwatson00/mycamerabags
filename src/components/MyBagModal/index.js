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
      myGear: [],
      bagGear: []
    };
    /* this.onChange = this.onChange.bind(this); */
  }

  getMyGear() {
    let data = [];
    if (this.props.authUser) {
      this.props.firebase.getMyGear(this.props.authUser.uid).then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let item = doc.data();
          data.push(item);
        });
      }).then(() => {
        this.setState({ myGear: data }, this.getBagGear);
      })
    }
  }

  getBagGear() {
    let bagGear = [];
    if(this.props.bag.bagGear.length > 0) {
      this.props.bag.bagGear.forEach(gearId => {
        let gear = this.state.myGear.filter(gear => gear.uid === gearId);
        bagGear.push(gear[0]);
      });
      this.setState({ bagGear });
    }
  }

  getGreatestSortValue() {
    Math.max.apply(Math, this.state.bagGear.map(function (gearItem) {
      return gearItem.sortValue;
    }))
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

/*   allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  } */
  /* onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  } */

  renderGearRow(item, index) {
    return (
      <tr key={index} /* draggable={true} ondragstart={(event) => this.drag(event)} */ >
        <td>
          <img className="my-bag-modal-image" src={item.imageUrl} alt={item.make + ' ' + item.model} />
        </td>
        <td className="my-bag-modal-desc">
          {item.make + ' ' + item.model}
        </td>
        <td>
          <img className="sort-arrow clickable" src={upArrow} alt="sort up arrow" />
          <img className="sort-arrow clickable" src={downArrow} alt="sort down arrow" />
        </td>
      </tr>
    )
  }

  componentDidMount() {
    this.getMyGear();
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
                <h2 className="modal-title">{this.props.bag.title}</h2>
              </div>
              <div className="modal-body">
                <h4>Description</h4>
                <p>{this.props.bag.description}</p>
                {/* <ul>
                {this.state.bagGear.map((item, index) => {
                  return (
                    this.renderGearItem(item, index)
                  );
                })}
              </ul> */}
              <table>
                {
                  this.state.bagGear.map((item, index) => {
                    return (
                      this.renderGearRow(item, index)
                    );
                  })
                }
              </table>
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