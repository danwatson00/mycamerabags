import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthentication } from '../Session';
import './AllBags.css';
import BagCard from '../BagCard';

class AllBags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      users: [],
      allBags: []
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

  getAllBags() {
    let data = [];
    this.props.firebase.getAllBags().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let items = doc.data();
        data.push(items);
      });
    }).then(() => {
      this.setState({ allBags: data });
    });
  }

  componentDidMount() {
    this.getAllBags();
  }

  render() {
    return(
      <div id="all-bags">
        <h1>All Bags</h1>
        {this.state.allBags.map((bag, index) => {
            return (
              <div className="gear-container" key={index}>
                <BagCard
                  bag={bag}
                  users={this.state.users}
                  allGear={this.state.gearData}
                />
              </div>
            );
          })}
        <div>
        </div>
      </div>
    );
  }
}

export default withAuthentication(withFirebase(AllBags));