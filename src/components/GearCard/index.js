import React, { Component } from 'react';
import './GearCard.css';


class GearCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <div className="gearCard">
        <img src={this.props.item.imageUrl} alt={this.props.item.make + ' ' + this.props.item.model} />
        <h4>{this.props.item.make + ' ' + this.props.item.model}</h4>
      </div>
    )
  }
}

export default GearCard;