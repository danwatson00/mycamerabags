import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import GearCard from '../GearCard';
/* import { withAuthentication } from '../Session'; */
import './AllGear.css';
import GearModal from '../GearModal';
import Button from '../Button';
import CreateGearModal from '../CreateGearModal';
import * as Utilities from '../Utilities';

class AllGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gearData: [],
      error: '',
      gearModalVisible: false,
      createGearModalVisible: false
    };
  }

  getAllGear = () => {
    let data = [];
    this.props.firebase.getAllGear().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let item = doc.data();
        item.uid = doc.id
        data.push(item);
      });
    }).then(() => { 
      this.setState({ gearData: data });
    })
  }

  deleteGear(gearUid) {
    this.props.firebase.deleteGear(gearUid).then(() => {
      this.getAllGear();
      Utilities.sendSuccessMessage("Your item has been deleted successfully.");
    })
  }

  showGearModal() {
    this.setState({ gearModalVisible: true });
  }

  hideGearModal() {
    this.setState({ gearModalVisible: false });
  }

  showModal(modalStateName) {
    this.setState({ [modalStateName]: true });
  }

  hideModal(modalStateName) {
    this.setState({ [modalStateName]: false });
  }

  componentDidMount() {
    this.getAllGear();
  }

  render() {
    return(
      <div id="all-gear">
        <div className="create-gear">
          <h2>Create New Gear</h2>
          <Button class="btn btn-default" label="CreateGear" click={() => this.showModal('createGearModalVisible')} />
        </div>
        <h1>All Gear</h1>
        <div>
          {this.state.gearData.map((gear, key) => {
              return (
                <div className="gear-container" key={key}>
                      <GearCard 
                        authUser={this.props.authUser} 
                        getAllGear={this.getAllGear.bind(this)} 
                        addToUserGear={this.props.firebase.addToUserGear} 
                        deleteGear={this.deleteGear.bind(this)} 
                        item={gear}
                      />
                </div>
              )
            })
          }
        </div>
          {this.state.gearModalVisible &&
            <GearModal 
              hideModal={this.hideGearModal.bind(this)}
              isEditMode={false}
            />
          }
          {this.state.createGearModalVisible &&
            <CreateGearModal
              getAllGear={this.getAllGear.bind(this)}
              closeModal={this.hideModal.bind(this)}
            />
          }
      </div>
    );
  }
}

export default withFirebase(AllGear);