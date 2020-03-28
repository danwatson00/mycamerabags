import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './MyBagCard.css';
import Button from '../Button';
import MyBagModal from '../MyBagModal';
import blankLogo from '../../images/logo-blank-sm.png'

class MyBagCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  deleteBag() {
    this.props.firebase.deleteBag(this.props.bag.user, this.props.bag.uid).then(result => {
        this.props.getMyBags();
    });
  }

  render() {
    return (
      <div className="bag-card">
        <img src={blankLogo} className="bag-card-graphic" alt="Camera Bag" />
        <h4 className="card-title">{this.props.bag.title}</h4>
        <MyBagModal getGear={this.props.getMyGear} item={this.props.bag} />
        <Button class="btn btn-default" label="Delete Bag" click={this.deleteBag.bind(this)} />
      </div>
    )
  }
}

export default withFirebase(MyBagCard);