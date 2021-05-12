import React, { Component } from 'react';
import './Button.css';


class Button extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleClick = () => {
    if (this.props.click) {
      this.props.click()
    }
  }

  render() {
    return (
      <button 
        disabled={this.props.disabled}
        type="button" 
        name={this.props.name} 
        className={this.props.class} 
        onClick={() => this.props.click()}>
        {this.props.label}
      </button>
    )
  }
}

export default Button;