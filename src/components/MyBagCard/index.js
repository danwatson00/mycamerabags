import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './MyBagCard.css';
import Button from '../Button';
import MyBagModal from '../MyBagModal';
import blankLogo from '../../images/logo-blank-sm.png'
import { AuthUserContext } from '../Session';

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
        <AuthUserContext.Consumer>
          {authUser =>
            <MyBagModal bag={this.props.bag} authUser={authUser} firebase={this.props.firebase} />
          }
        </AuthUserContext.Consumer>
        
        <Button class="btn btn-default" label="Delete Bag" click={this.deleteBag.bind(this)} />
      </div>
    )
  }
}

export default withFirebase(MyBagCard);