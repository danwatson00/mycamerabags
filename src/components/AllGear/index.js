import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import CreateGearForm from '../CreateGear';
import GearCard from '../GearCard';
import { withAuthentication } from '../Session';
import './AllGear.css';
import { AuthUserContext } from '../Session';
import CreateGearModal from '../CreateGearModal';

class AllGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gearData: [],
      error: '',
      createGearModalIsVisible: false
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

  renderCreateGearModal() {
    return (
      <CreateGearForm getGear={this.getGear} />
    )
  }

  componentDidMount() {
    this.getAllGear();
  }

  render() {
    /* let user = this.context;
    console.log("context user", user); */
    return(
      <div id="all-gear">
        <div className="create-gear">
          <h2>Create New Gear</h2>
          <CreateGearModal 
            getAllGear={this.getAllGear.bind(this)} 
            title="Create Gear"
          />
        </div>
        <h1>All Gear</h1>
        <div>
          {this.state.gearData.map((gear, key) => {
            /* let imageUrl = this.props.firebase.downloadImage(gear.imagePath); */
              return (
                <div className="gear-container" key={key}>
                  <AuthUserContext.Consumer>
                    {authUser => (
                      <GearCard 
                        authUser={authUser} 
                        getAllGear={this.getAllGear.bind(this)} 
                        addToUserGear={this.props.firebase.addToUserGear} 
                        deleteGear={() => this.props.firebase.deleteGear(gear.uid)} 
                        item={gear}
                        /* imageUrl={imageUrl} */
                      />
                    )}
                  </AuthUserContext.Consumer>
                </div>
              )
            })
          }
        </div>
          {this.state.isCreateGearModalVisible &&
            this.renderCreateGearModal()
          }
      </div>
    );
  }
}

export default withAuthentication(withFirebase(AllGear));