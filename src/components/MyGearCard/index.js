import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './MyGearCard.css';
import Button from '../Button';
import GearModal from '../GearModal';
import * as Elements from '../Elements';

class MyGearCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBagId: '',
      highestRank: 0
    };
  }

  onSelectChange(e) {
    this.setState({ selectedBagId: e.target.value }, this.getHighestRank);
  }
  getSelectedBagInfo(bagId) {
    let selectedBag = this.props.myBags.filter(bag => bag.uid === bagId);
    return selectedBag[0];
  }
  getHighestRank() {
    let bag = this.getSelectedBagInfo(this.state.selectedBagId);
    console.log("bag", bag);
    if(bag.bagGear.length > 0) {
      let max = bag.bagGear[0].rank;
      for (let i = 1, len = bag.bagGear.length; i < len; i++) {
        let value = bag.bagGear[i].rank;
        console.log("value", value);
        max = (value > max) ? value : max;
      }
      this.setState({ highestRank: max });
    }
  }
  addGearToBag() {
    if (this.state.selectedBagId) {
      this.props.addGearToBag(this.props.item.userId, this.props.item.uid, this.state.selectedBagId, this.state.highestRank + 1);
    }
  }

  render() {
    return (
      <div className="gear-card" key={this.props.index}>
        <img className="gear-card-image" src={this.props.item.imageUrl} alt={this.props.item.make + ' ' + this.props.item.model} />
        <h4>{this.props.item.make + ' ' + this.props.item.model}</h4>
        <Elements.Select 
          options={this.props.myBags} 
          onChange={this.onSelectChange.bind(this)}
          optionNameRenderer={value => {
            return value.title;
          }} 
          optionValueRenderer={value => {
            return value.uid;
          }}
        />
        <Button class="btn btn-default" name="add-to-bag" label="Add to Bag" click={() => this.addGearToBag()} />
        <Button class="btn btn-default" name="delete" label="Delete" click={this.props.deleteGear(this.props.item.userID, this.props.item.uid)} />
        <GearModal getGear={this.props.getMyGear} item={this.props.item} />
      </div>
    )
  }
}

export default withFirebase(MyGearCard);