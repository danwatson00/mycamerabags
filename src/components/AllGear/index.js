import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import CreateGearForm from '../CreateGear';
import GearCard from '../GearCard';

class AllGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gearData: [],
      error: ''
    };
    /* this.getGear = this.getGear.bind(this); */
  }

  getGear = () => {
    let data = [];
    this.props.firebase.getAllGear().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        data.push(doc.data());
      });
    }).then(()=> { this.setState({ gearData: data });})
  }

  componentDidMount() {
    this.getGear();
  }

  render() {

    return(
      <div>
        <CreateGearForm getGear={this.getGear} />
        <h1>All Gear</h1>
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
                <div key={key}>
                  <GearCard item={item} />
                </div>
            )
          })
        }
        
      </div>
    );
  }
}

export default withFirebase(AllGear);