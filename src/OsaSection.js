import React, { Component } from "react";

class OsaSection extends Component {

  constructor(props) {
    super(props)

    this.state = {
      signUp: false
    }

}

  updateState = () => {
    console.log("setting state")
    this.setState({signUp: true})
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

  render() {

    const signUp = this.state.signUp
    let attendanceStatus = this.attending()
    let attendanceMessage = this.message()

    return (
     <div class="flex content-center flex-wrap bg-gray-200 h-48">
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

export default OsaSection;
