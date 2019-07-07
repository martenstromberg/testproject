import React, { Component} from 'react';
import CountDownClock from './CountDownClock'


export default class CurrentOrganizer extends Component{
    constructor (props) {
        super(props)
        this.state = {
            currentOrganizer:[],
            nextEventDate: '',
            config: this.props.config,
        }
    }

    handlError = (err) => {
        alert("Please make sure you have input a password and that it is correct")
        console.log(err)
    }

    currentOrganizer = () => {
        let requestType = (this.state.config.ENVIRONMENT === "local") ? "http" : "https"
        let request = requestType + "://" + this.state.config.API_DB +"/api.json/login?password=" + this.props.password
        fetch(request)
        .then(res => res.json())
        .then(res => this.setState({ currentOrganizer: res }))
        .catch(err => this.handlError(err));
    }

    extractDate = (timestamp) => {
        const dateItem = new Date(timestamp)
        let year = dateItem.getFullYear()
        var month = ""
        var day = ""
        if (dateItem.getMonth()<10) {
            month = "0" + (dateItem.getMonth() + 1)
        } else {
            month = dateItem.getMonth() + 1
        }

        if (dateItem.getDate() < 10) {
            day = "0" + dateItem.getDate()
        } else {
            day = dateItem.getDate()
        }
        return year + "-" + month + "-" + day
    }

    render() {
        return(
            <div>
            <button type="submit" onClick={this.currentOrganizer}> Se vem som ordnar nuvarande torsdagsmiddag</button>
            {this.state.currentOrganizer.map((item, i) => {
                const nextDinnerDate = this.extractDate(item.date_of_next_dinner)
                const timestampSelectedDate = this.extractDate(item.timestamp_selected)
                return (
                  <div key={i}>
                    <ul>
                      <li>{item.name} ordnar nästa middag den: {nextDinnerDate},  Utsedd att organisera: {timestampSelectedDate}</li>
                    </ul>
                  </div>)
              })}
              {this.state.currentOrganizer.map((item) => {
                  return (
                      <CountDownClock nextEvent={item.date_of_next_dinner}/>
                  )
              })}

              </div>
          )}}
