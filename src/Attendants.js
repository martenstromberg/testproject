import React, { Component } from "react";
import Firebase, { withFirebase } from './components/Firebase'


class Attendants extends Component {

  constructor(props) {
    super(props)

    this.state = {

      attendants: []
    }
}

componentDidMount() {

  this.doReadData()


}

  readFromDB = () => {
      this.props.firebase.doReadData()
  }

  doReadData = () => {
      this.props.firebase.db.collection("dinner").get().then((querySnapshot) => {

          querySnapshot.forEach((doc) => {
              if (doc.id === "dinner1") {
                this.setState({attendants: doc.data().attendants})
              }
              })
            })
        }

  showNames = () => {

     const list = ["dag", "mprten", "ohilipo"]

              return (
                  list.map((item) => (
                    <li>{item} </li>
                  ))
              )
            }

  render() {

    this.showNames()
    return (


     <div class="flex content-center flex-wrap bg-white-200 h-48">
     <p class="w-full p-2 text-center">
     Vi som kommer:
     </p>
     <ol class="w-full p-2 text-center">
      {
      this.state.attendants.map( attendant => (
        <li>{attendant}</li>
        )
      )
      }
      </ol>
     </div>
    );
  }
}

export default withFirebase(Attendants);
