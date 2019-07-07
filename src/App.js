import React, { Component} from 'react';
import './App.css';
import sendEventToAmplitude from './Amplitude.js'
import amplitude from 'amplitude-js/amplitude';
import {ValidDateFormat, ValidDate} from './DateValidator'
import CurrentOrganizer from './CurrentOrganizer'
import NewOrganizer from './NewOrganizer'
import CountDownClock from './CountDownClock'

const config = {
    API_DB: process.env.REACT_APP_API_DB,
    AMPLITUDE_API_KEY: process.env.REACT_APP_AMPLITUDE_API_KEY,
    ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT
  }

export default class App extends Component  {
    constructor(props) {
        super(props)

      this.state = {
        name: '',
        password:'',
        participants: [],
        organizer: '',
        currentOrganizer:[],
        nextEventDate: ''
      }
    }

    componentDidMount() {
        amplitude.init(config.AMPLITUDE_API_KEY);
        const eventName = "pageLoaded"
        sendEventToAmplitude(eventName)
    }

    confirmNewOrganizer = () => {
        if(ValidDateFormat(this.state.nextEventDate)) {
            if(ValidDate(this.state.nextEventDate)) {
                console.log(config.ENVIRONMENT)
                const array = this.state.organizer.replace(" ", "+")
                let requestType = (config.ENVIRONMENT === "local") ? "http" : "https"
                let request = requestType + "://" + config.API_DB +"/api.json/new_organiser?organiser="+ array+"&password="+this.state.password + "&nextdate="+this.state.nextEventDate
                console.log("request is " + request)
                fetch(request)
                .catch(err => console.log(err))
            } else {
                alert("Please make sure selected date does not occur in the past")
            }
        } else {
            alert("please make sure date of next Event is in correct format")
        }
    }

    handleNewOrganizer = (newOrganizer) => {
        this.setState({organizer:newOrganizer})
    }


    onChange = (event, field) => {

        this.setState({
          [field]:event.target.value
        })
        console.log(this.state.nextEventDate)
    }

    render() {
        return (
          <div>
            <h1>nästatorsdagsmiddag.com</h1>
              <input placeholder="Password to interact with database" value={this.state.password} onChange={(event) => this.onChange(event, "password")}/>
            <h2>Den som ordnar kommande middag är</h2>
            <CurrentOrganizer config={config} password={this.state.password}/>
            <NewOrganizer config={config} onHandleNewOrganizer={this.handleNewOrganizer}/>
            <form>
                <h3>Datum för nästa middag</h3>
                <input placeholder="yyyy-mm-dd" value={this.state.nextEventDate} onChange={(event) => this.onChange(event, "nextEventDate")}/>
            </form>
            <button type="submit" onClick={this.confirmNewOrganizer}> Confirm new organizer</button>
          </div>
    )
    }
}
