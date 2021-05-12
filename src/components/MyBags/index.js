import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Button from '../Button';
import MyBagCard from '../MyBagCard';
import CreateBagForm from '../CreateBag';


class MyBags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myBags: [],
      myGear: [],
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
        this.setState({ myBags: data });
      })
    }
  }
  getMyGear() {
    let data = [];
    if (this.props.authUser) {
      this.props.firebase.getMyGear(this.props.authUser.uid).then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let item = doc.data();
          data.push(item);
        });
      }).then(() => {
        this.setState({ myGear: data }, this.getBagGear);
      })
    }
  }
  findIndexWithAttribute(array, attribute, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attribute] === value) {
            return i;
        }
    }
    return -1;
  }
  moveUpRank(bagUid, index) {
    let bagIndex = this.findIndexWithAttribute(this.state.myBags, 'uid', bagUid);
    let myBags = this.state.myBags;
    let selectedItemRank = myBags[bagIndex].bagGear[index].rank;
    myBags[bagIndex].bagGear[index].rank = selectedItemRank - 1;
    if (myBags[bagIndex].bagGear[index - 1]) {
      myBags[bagIndex].bagGear[index - 1].rank = selectedItemRank;
    }
    myBags[bagIndex].bagGear.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
    this.setState({ myBags });
  }
  moveDownRank(bagUid, index) {
    let bagIndex = this.findIndexWithAttribute(this.state.myBags, 'uid', bagUid);
    let myBags = this.state.myBags;
    //let selectedItemRank = myBags[bagIndex].bagGear[index].rank;
    //myBags[bagIndex].bagGear[index].rank = myBags[bagIndex].bagGear[index].rank + 1;
    myBags[bagIndex].bagGear[index].rank++;
    if (myBags[bagIndex].bagGear[index + 1]) {
      //myBags[bagIndex].bagGear[index + 1].rank = selectedItemRank;
      myBags[bagIndex].bagGear[index + 1].rank--;
    }
    myBags[bagIndex].bagGear.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
    this.setState({ myBags });
  }
  saveBagGear(bagUid, bagGear) {
    this.props.firebase.updateBagGear(this.props.authUser.uid, bagUid, bagGear).then(() => {
      this.getMyBags();
    });
  }
  componentDidMount() {
    this.getMyBags();
    this.getMyGear();
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
                <MyBagCard
                  deleteBag={this.props.firebase.deleteBag.bind(this)}
                  bag={bag}
                  getMyBags={this.getMyBags.bind(this)}
                  moveUpRank={this.moveUpRank.bind(this)}
                  moveDownRank={this.moveDownRank.bind(this)}
                  saveBagGear={this.saveBagGear.bind(this)}
                  myGear={this.state.myGear}
                />
              </div>
            );
          })}
        </div>
        <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div>
    )
  }
}

export default withFirebase(MyBags);