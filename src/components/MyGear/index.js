import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import MyGearCard from '../MyGearCard';
import './MyGear.css';
import CreateMyGearModal from '../CreateMyGearModal';

class MyGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myGear: [],
      myBags: [],
      selectedBagId: ''
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
      this.getMyBags();
    });
  }

  createUserGear() {

  }

  componentDidMount() {
    this.getMyGear();
    this.getMyBags();
  }

  render() {
    return(
      <div>
        <h1>My Gear</h1>
        {this.props.authUser &&
          <div className="my-gear-container">
            {this.state.myGear.map((gear, index) => {
                return (
                    <MyGearCard
                      index={index}
                      deleteGear={() => this.props.firebase.deleteUserGear("gear.userId", "gear.uid")} 
                      item={gear}
                      myBags={this.state.myBags}
                      addGearToBag={this.addGearToBag.bind(this)}
                    />
                )
            })}
            <div className="create-my-gear-card">
              <h4>Create A New Item</h4>
              <CreateMyGearModal />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default withFirebase(MyGear);