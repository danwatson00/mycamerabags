import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import CreateGearForm from '../CreateGear';
import GearCard from '../GearCard';
import { withAuthentication } from '../Session';
import './AllGear.css';
import { AuthUserContext } from '../Session';

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

  componentDidMount() {
    this.getGear();
  }

  render() {
    let user = this.context;
    console.log("context user", user);
    return(
      <div>
        <CreateGearForm getGear={this.getGear} />
        <h1>All Gear</h1>
        <div>
          {this.state.gearData.map((gear, key) => {
              return (
                <div className="gear-container" key={key}>
                  <AuthUserContext.Consumer>
                    {authUser => (
                      <GearCard 
                        authUser={authUser} 
                        getGear={this.getGear} 
                        addToUserGear={this.props.firebase.addToUserGear} 
                        deleteGear={() => this.props.firebase.deleteGear(gear.uid)} 
                        item={gear}
                      />
                    )}
                  </AuthUserContext.Consumer>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default withAuthentication(withFirebase(AllGear));