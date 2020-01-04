import React, { Component } from "react";
import Firebase, { withFirebase } from './components/Firebase'



class OsaSection extends Component {

  constructor(props) {
    super(props)

    this.state = {
      signUp: false,
      userName: ""
    }

}

  getNewState = () => {
      if (this.state.signUp == false) {
        return true
      } else {
        return false
        }
      }

  updateState = () => {
    console.log("setting state")
    const newState = this.getNewState()
    this.setState({signUp: newState})
    this.writeToDB()
  }

  attending = () => {

    if (this.state.signUp == false) {
      return "OSA nu!"
    } else {
        return "Du e klaaar"
      }
      }

  message = () => {

    if (this.state.signUp == false) {
      return "Begränsat antal platser - signa upp direkt"
    } else {
        return ":)"
      }
      }

  updateUserName = (event) => {
    const newUserName = event.target.value
    console.log(newUserName)
    this.setState({userName: newUserName})
  }

  writeToDB = () => {
    console.log(this.state.userName)
      this.props.firebase.doWriteData(this.state.userName)
  }

  readFromDB = () => {
      this.props.firebase.doReadData()
  }

  render() {
    this.readFromDB()
    const signUp = this.state.signUp
    let attendanceStatus = this.attending()
    let attendanceMessage = this.message()

    return (
     <div class="flex content-center flex-wrap bg-gray-200 h-48">
      <form class="w-full p-2 text-center">
        <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={this.updateUserName} type="text" placeholder="Username">
        </input>
     </form>
        <div class="w-full p-2 text-center">
          <button class="object-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={this.updateState}> {attendanceStatus} </button>
        </div>

          <div class="w-full p-2">
          <p class='text-center text-grey' > {attendanceMessage} </p>
        </div>
     </div>
    );
  }
}

export default withFirebase(OsaSection);
