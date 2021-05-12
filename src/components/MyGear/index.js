import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import MyGearCard from '../MyGearCard';
import './MyGear.css';
import CreateMyGearModal from '../CreateMyGearModal';
import Button from '../Button';

class MyGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myGear: [],
      myBags: [],
      selectedBagId: '',
      createModalVisible: false
    };
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
        this.setState({
          myGear: data
        });
      })
    }
  }

  getMyBags() {
    let data = [];
    if (this.props.authUser.uid) {
      this.props.firebase.getMyBags(this.props.authUser.uid).then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let item = doc.data();
          data.push(item);
        });
      }).then(() => {
        this.setState({
          myBags: data
        });
      })
    }
  }
  
  addGearToBag(userId, gearId, selectedBagId, rank) {
    this.props.firebase.addToUserBag(userId, gearId, selectedBagId, rank).then(() => {
      console.log("addToBag worked")
      this.getMyBags();
    });
  }

  openModal() {
    this.setState({ createModalVisible: true })
  }

  handleHideModal() {
    this.setState({ createModalVisible: false });
  }

  componentDidMount() {
    this.getMyGear();
    this.getMyBags();
  }

  render() {
    return(
      <div>
        <div style={{ marginTop: 15 }}>
          <h2 className="inline">My Gear</h2>
          <button class="btn btn-default pull-right" label="Create Gear" onClick={() => this.openModal()}>Create New Item</button>
        </div>
        {this.props.authUser &&
          <div className="my-gear-container">
            {this.state.myGear.map((gear, index) => {
                return (
                  <div key={index} className="gear-card">
                    <MyGearCard
                      key={index}
                      deleteGear={() => this.props.firebase.deleteUserGear("gear.userId", "gear.uid")} 
                      item={gear}
                      myBags={this.state.myBags}
                      addGearToBag={this.addGearToBag.bind(this)}
                      getMyGear={this.getMyGear.bind(this)}
                    />
                  </div>
                )
            })}
            {this.state.createModalVisible &&
              <CreateMyGearModal 
                handleHideModal={this.handleHideModal.bind(this)}
              />
            }
          </div>
        }
      </div>
    )
  }
}

export default withFirebase(MyGear);