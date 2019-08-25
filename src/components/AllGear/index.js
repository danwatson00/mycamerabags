import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import CreateGearForm from '../CreateGear';
import GearCard from '../GearCard';
import './AllGear.css';

class AllGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gearData: [],
      error: '',
      authUser: {}
    };
  }

  getGear = () => {
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

  getUser = () => {
    /* let authUser = localStorage.getItem('authUser');
    let user = JSON.stringify(authUser)
    let theUser = JSON.parse(user); */
    /* this.setState({authUser: theUser}); */
  }

  getUid = () => {
    Object.keys(this.state.authUser).map(key => {
      console.log(this.state.authUser[key].uid);
      return this.state.authUser;
    })
  }

  componentDidMount() {
    this.getGear();
    this.getUser();
  }

  render() {
    
    return(
      <div>
        <CreateGearForm getGear={this.getGear} />
        <h1>All Gear</h1>
        <div>
          {this.state.gearData.map((gear, key) => {
              let item = {
                description: gear.description,
                make: gear.make,
                model: gear.model,
                imageUrl: gear.imageUrl,
                buyNowUrl: gear.buyNowUrl,
                category: gear.category,
                subCategory: gear.subCategory,
                manualUrl: gear.manualUrl,
                specs: gear.specs,
                reviews: gear.reviews
              }
              return (
                  <div className="gear-container" key={key}>
                    <GearCard userId={this.state.authUser.uid} getGear={this.getGear} updateGear={() => this.props.firebase.addToUserGear(item)} deleteGear={() => this.props.firebase.deleteGear(item.uid)} item={item} />
                  </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default withFirebase(AllGear);