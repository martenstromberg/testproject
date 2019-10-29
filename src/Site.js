import React, { Component} from 'react';
import './App.css';
import sendEventToAmplitude from './Amplitude.js'
import amplitude from 'amplitude-js/amplitude';
import {ValidDateFormat, ValidDate} from './DateValidator'
import CurrentOrganizer from './CurrentOrganizer'
import NewOrganizer from './NewOrganizer'

const config = {
    API_DB: process.env.REACT_APP_API_DB,
    AMPLITUDE_API_KEY: process.env.REACT_APP_AMPLITUDE_API_KEY,
    ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT
  }

export default class Site extends Component  {
    constructor(props) {
        super(props)

      this.state = {
        name: '',
        password:'',
        participants: [],
        organizer: '',
        currentOrganizer:[],
        nextEventDate: '',
        responseCode: ''
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
                fetch(request)
                    .then(response => this.setState({responseCode:response.status}))
                    .then(reponse => console.log("updated response code is: " + this.state.responseCode))
                    // .then(data => this.setState({responseCode:"helloWorld"}))
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
        let successfulDatabaseUpdate
        if(this.state.responseCode === 403) {
            successfulDatabaseUpdate = <h4> Misslyckades med att uppdatera organisatör. Använde du korrekt lösenord</h4>
        } else {
            successfulDatabaseUpdate = <h4></h4>
        }
        return (
          <div className="bg-top pb-64" style={{
              backgroundImage: `url(${require('./background.jpg')})`,
                }}>
            <div className=" bg-transparent py-8">
                <h1 className="text-center" >Nästa torsdagsmiddag</h1>
            </div>
            <h2 className="py-2 text-center" style={{
              color:"white",
              fontSize:"1em",
              fontWeight:"400"
            }}>Den som ordnar kommande middag är:</h2>
            <CurrentOrganizer config={config} password={this.state.password}/>

            <NewOrganizer config={config} onHandleNewOrganizer={this.handleNewOrganizer}/>
            <form className="py-2 text-center">
                <h3>Datum för nästa middag</h3>
                <input placeholder="yyyy-mm-dd" value={this.state.nextEventDate} onChange={(event) => this.onChange(event, "nextEventDate")}/>
            </form>
              <input className="py-2 text-center" placeholder="Password to interact with database" value={this.state.password} onChange={(event) => this.onChange(event, "password")}/>
              <button type="submit" onClick={this.confirmNewOrganizer}> Confirm new organizer</button>
              {successfulDatabaseUpdate}
            <div className="py-64">
            </div>
          </div>
    )
    }
}
