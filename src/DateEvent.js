import React, { Component } from "react";

class DateEvent extends Component {
  render() {

    let today = new Date();
    let date=today.getFullYear() + "-" + parseInt(today.getMonth()+1) + "-" +today.getDate();

    return (
      <div class="flex content-center flex-wrap bg-white h-32">
         <div class="w-full p-2">
                <h1 class='text-center text-gray-500' > NÄSTA TORSDAGSMIDDAG: </h1>
                <p class='text-4xl text-center text-gray-800' > {date} </p>
         </div>
      </div>
    );
  }
}

export default DateEvent;
