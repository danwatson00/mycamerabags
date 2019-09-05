import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import UserGearCard from '../UserGearCard';
import './MyGear.css'
import Button from '../Button'

class MyGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myGear: []
    };
  }

  getMyGear() {
    let data = [];
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

  createUserGear() {

  }

  componentDidMount() {
    this.getMyGear();
  }

  render() {
    return(
      <div>
        <h1>My Gear</h1>
        <div className="my-gear-container">
          {this.state.myGear.map((gear, key) => {
            console.log(gear);
              return (
                <div className="gear-container" key={key}>
                  <UserGearCard
                    deleteGear={() => this.props.firebase.deleteUserGear("gear.userId", "gear.uid")} 
                    item={gear}
                    getMyGear={this.getMyGear.bind(this)}
                  />
                </div>
              )
            })
          }
          <div className="create-user-gear-card">
            <h4>Create A New Item</h4>
            <Button class="btn btn-default" name="addGear" label="Add New" click={this.props.deleteGear} />
          </div>
        </div>
      </div>
    )
  }
}

export default withFirebase(MyGear);