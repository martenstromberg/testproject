import React, { Component} from 'react';
import './App.css';
import sendEventToAmplitude from './Amplitude.js'
import amplitude from 'amplitude-js/amplitude';
import {ValidDateFormat, ValidDate} from './DateValidator'
import CurrentOrganizer from './CurrentOrganizer'
import NewOrganizer from './NewOrganizer'
import NavBar from './NavBar'
import DateEvent from './DateEvent'
import OsaSection from './OsaSection'
import Attendants from './Attendants'
import Firebase, { withFirebase } from './components/Firebase'

const config = {
    API_DB: process.env.REACT_APP_API_DB,
    AMPLITUDE_API_KEY: process.env.REACT_APP_AMPLITUDE_API_KEY,
    ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT
  }

class Site extends Component  {
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
        <div>
            <NavBar/>
            <DateEvent/>
            <OsaSection/>
            <Attendants/>
        </div>


    )
    }
}

export default withFirebase(Site)
