import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import GearCard from '../GearCard';
import { withAuthentication } from '../Session';
import './AllGear.css';
import { AuthUserContext } from '../Session';
import GearModal from '../GearModal';
import Button from '../Button';

class AllGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gearData: [],
      error: '',
      gearModalVisible: false
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

  componentDidMount() {
    this.getAllGear();
  }

  showGearModal() {
    this.setState({ gearModalVisible: true });
  }

  hideGearModal() {
    this.setState({ gearModalVisible: false });
  }

  render() {
    /* let user = this.context;
    console.log("context user", user); */
    return(
      <div id="all-gear">
        <div className="create-gear">
          <h2>Create New Gear</h2>
          <Button class="btn btn-default" label="CreateGear" click={() => this.onClick()} />
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
          {this.state.gearModalVisible &&
            <GearModal 
              hideModal={this.hideGearModal.bind(this)}
              isEditMode={false}
            />
          }
      </div>
    );
  }
}

export default withAuthentication(withFirebase(AllGear));