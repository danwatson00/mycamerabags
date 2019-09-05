import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './UserGearCard.css';
import Button from '../Button';
import GearModal from '../GearModal';

class UserGearCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="gearCard">
        <img className="gear-card-image" src={this.props.item.imageUrl} alt={this.props.item.make + ' ' + this.props.item.model} />
        <h4>{this.props.item.make + ' ' + this.props.item.model}</h4>
        <Button class="btn btn-default" name="delete" label="Delete" click={this.props.deleteGear(this.props.item.userID, this.props.item.uid)} />
        <GearModal getGear={this.props.getMyGear} item={this.props.item} />
      </div>
    )
  }
}

export default withFirebase(UserGearCard);