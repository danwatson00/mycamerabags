import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './MyBag.css';
import Button from '../Button';
import * as Elements from '../Elements';

class MyBag extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  getBagGear() {
    this.props.bag.bagGear.forEach(item => {
      console.log("item", item);
    });
    /* this.props.myGear.filter(gear => gear.uid === gearId); */
  }

  componentDidMount() {
    this.getBagGear();
  }

  render() {
    return (
      <div className="my-bag">
        <h1>{this.props.bag.title}</h1>
        <ul>
          {/* {this.props.bag.bagGear.map(item => {
            return (
              <li>
                
              </li>
            )
          })} */}
        </ul>
      </div>
    )
  }
}

export default withFirebase(MyBag);