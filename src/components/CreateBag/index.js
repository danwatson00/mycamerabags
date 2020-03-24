import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './CreateBag.css';

class CreateBagForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    const bag = {
      title: this.state.title,
      description: this.state.description
    }
    console.log("bag", bag);
    event.preventDefault();
    this.props.firebase.createBag(this.props.authUser.uid, bag)
    .catch(error => {
      console.log("create bag error", error);
      this.setState({ error });
    })
    .then(() => {
      this.setState({
        title: '',
        description: ''
      }, this.props.getMyBags())
    })
  }

  render() {

    const isInvalid = this.state.title === '';

    return(
      <div>
        <h1>Create Bag</h1>
        <form onSubmit={this.onSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={this.state.title} onChange={this.onChange}/>
          </label>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.onChange}/>
          </label>
          <input disabled={isInvalid} type="submit" value="Create Bag" className="btn btn-default" />
        </form>
      </div>
    );
  }
}

export default withFirebase(CreateBagForm);