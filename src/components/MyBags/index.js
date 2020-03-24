import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Button from '../Button';
import UserBagCard from '../MyBagCard';
import CreateBagForm from '../CreateBag';


class MyBags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myBags: [],
      showCreateBag: false
    };
    this.onClick = this.onClick.bind(this);
  }
  

  onClick() {
    this.setState({showCreateBag: !this.state.showCreateBag });
  }

  getMyBags() {
    let data = [];
    if (this.props.authUser.uid) {
      this.props.firebase.getMyBags(this.props.authUser.uid).then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let item = doc.data();
          data.push(item);
        });
      }).then(() => {
        this.setState({
          myBags: data
        });
      })
    }
  }

  componentDidMount() {
    this.getMyBags();
  }

  render() {
    return(
      <div>
        <h1>My Bags</h1>
        <Button class="btn btn-default" name="addBag" label="Create New Bag" click={this.onClick} />
        {this.state.showCreateBag && 
          <div>
            <CreateBagForm getMyBags={this.getMyBags.bind(this)} authUser={this.props.authUser} />
          </div>
        }
        <div className="my-bags-container">
          {this.state.myBags.map((bag, index) => {
              return (
                <div className="gear-container" key={index}>
                  <UserBagCard
                    deleteBag={() => this.props.firebase.deleteBag.bind(this)}
                    getMyGear={this.getMyBags.bind(this)}
                    bag={bag}
                  />
                </div>
              )
            })
          }
          <div className="create-bag-card">
            <h4>Create A New Bag</h4>
            
          </div>
        </div>
      </div>
    )
  }
}

export default withFirebase(MyBags);