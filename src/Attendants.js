import React, { Component } from "react";
import Firebase, { withFirebase } from './components/Firebase'


class Attendants extends Component {

  constructor(props) {
    super(props)
}

  readFromDB = () => {
      this.props.firebase.doReadData()
  }

  render() {

    return (
     <div class="flex content-center flex-wrap bg-white-200 h-48">

     </div>
    );
  }
}

export default withFirebase(Attendants);
