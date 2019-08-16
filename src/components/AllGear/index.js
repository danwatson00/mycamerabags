import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import CreateGearForm from '../CreateGear';

class AllGear extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gearData: [],
      error: ''
    };
    this.getGear = this.getGear.bind(this);
  }

  getGear = () => {
    let data = [];
    this.props.firebase.getAllGear().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        data.push(doc.data());
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
      console.log("data", data);
      this.setState({ gearData: data });
    })
  }

  componentDidMount() {
    this.getGear();
  }

  render() {

    return(
      <div>
        <CreateGearForm />
        <h1>All Gear</h1>
        {this.state.allGear && 
          this.state.allGear.map((item) => {
            return (
              <div className="gearCard">
                <img src={item.imageUrl} alt={item.make + ' ' + item.model} />
                <h4>{item.make + ' ' + item.model}</h4>

              </div>
            )
          })
        }
        
      </div>
    );
  }
}

export default withFirebase(AllGear);