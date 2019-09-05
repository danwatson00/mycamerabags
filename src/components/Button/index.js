import React, { Component } from 'react';
import './Button.css';


class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log("click");
    this.props.click()
  }

  render() {

    return (
      <div className="button">
        <button name={this.props.name} className={this.props.class} onClick={this.handleClick}>{this.props.label}</button>
      </div>
    )
  }
}

export default Button;