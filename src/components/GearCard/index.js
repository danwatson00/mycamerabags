import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './GearCard.css';
import Button from '../Button';
import GearModal from '../GearModal';

class GearCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const userGear = {
      userId: this.props.userId,
      make: this.props.item.make ? this.props.item.make : '',
      model: this.props.item.model ? this.props.item.model : '',
      category: this.props.item.category ? this.props.item.category : '',
      subCategory: this.props.item.subCategory ? this.props.item.subCategory : '',
      imageUrl: this.props.item.imageUrl ? this.props.item.imageUrl : '',
      description: this.props.item.description ? this.props.item.description : '',
      manualUrl: this.props.item.manualUrl ? this.props.item.make : '',
      specs: this.props.item.specs ? this.props.item.specs: '',
      buyNewUrl: this.props.item.buyNewUrl ? this.props.item.buyNewUrl : '',
    }

    return (
      <div className="gearCard">
        <img className="gear-card-image" src={this.props.item.imageUrl} alt={this.props.item.make + ' ' + this.props.item.model} />
        <h4>{this.props.item.make + ' ' + this.props.item.model}</h4>
        <Button class="btn btn-default" name="delete" label="Delete" click={this.props.deleteGear} />
        <Button class="btn btn-default" name="add_to_user" label="Add to My Gear" click={() => this.props.firebase.addToUserGear(userGear)} />
        <GearModal getGear={this.props.getGear} item={this.props.item} />
      </div>
    )
  }
}

export default withFirebase(GearCard);