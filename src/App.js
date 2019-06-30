import React, { Component} from 'react';
import List from './List.js'
import './App.css';
import randomInt from './RandomInt.js'
import sendEventToAmplitude from './Amplitude.js'
import amplitude from 'amplitude-js/amplitude';
import ValidDateFormat from './DateValidator'

const config = {
    API_DB: process.env.REACT_APP_API_DB,
    AMPLITUDE_API_KEY: process.env.REACT_APP_AMPLITUDE_API_KEY
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

  currentOrganizer = () => {
    fetch("http://" + config.API_DB +"/api.json/login?password=" + this.state.password)
      .then(res => res.json())
      .then(res => this.setState({ currentOrganizer: res }))
      .catch(err => console.log(err));
  }

  addParticipant = (event) => {
    const eventName = 'addParticipant'
    sendEventToAmplitude(eventName)
    event.preventDefault()
    this.setState({
      name:'',
      participants:[...this.state.participants, this.state.name]
    })
  }

  onChange = (event, field) => {
    this.setState({
      [field]:event.target.value
    })
  }

  selectOrganizer = () => {
    const eventName = 'organizationSelected'
    sendEventToAmplitude(eventName)

    const min  = 0
    var selectedOrganizer = ''

    if (this.state.participants.length > 0) {
      const max = this.state.participants.length - 1
      console.log("max value is " + max)
      const selectedId = randomInt(min, max)
      selectedOrganizer = this.state.participants[selectedId]
    } else {
      selectedOrganizer= "None, you need to add participants first"
    }
    this.setState (
      {
        organizer:selectedOrganizer
      }
    )
    console.log("selected organizer is " + this.state.organizer)
  }

  confirmNewOrganizer = () => {

    if(ValidDateFormat(this.state.nextEventDate)) {
        const array = this.state.organizer.replace(" ", "+")
        console.log("confirming new organizer...")
        fetch("http://" + config.API_DB +"/api.json/new_organiser?organiser="+ array+"&password="+this.state.password + "&nextdate="+this.state.nextEventDate)
        .catch(err => console.log(err))
    } else {
        alert("please make sure date of next in correct format")
    }
  }

  extractDate = (timestamp) => {
      const dateItem = new Date(timestamp)
      if (dateItem.getMonth()<10) {
          return dateItem.getFullYear() + "-0" + dateItem.getMonth() + "-" + dateItem.getDate()
      } else {
          return dateItem.getFullYear() + "-" + dateItem.getMonth() + "-" + dateItem.getDate()
      }
  }

  render() {
    return (
      <div>
        <h1>nästatorsdagsmiddag.com</h1>
          <input placeholder="Password to interact with database" value={this.state.password} onChange={(event) => this.onChange(event, "password")}/>
        <h2>Den som ordnar kommande middag är</h2>
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
        <h2>Val av nästa organisatör - potentiella organisatörer</h2>
        <form onSubmit={this.addParticipant}>
          <input placeholder="Participant" value={this.state.name} onChange={(event) => this.onChange(event, "name")}/>
          <button type="submit"> Add participant</button>
        </form>
        <List items={this.state.participants} />
        <button type="submit" onClick={this.selectOrganizer}> Select organizer</button>
        <h3>Den som organiserar nästa torsdagsmiddag är:</h3>
        <ul>
          <li>{this.state.organizer}</li>
        </ul>
        <form>
            <h3>Datum för nästa middag</h3>
            <input placeholder="yyyy-mm-dd" value={this.state.nextEventDate} onChange={(event) => this.onChange(event, "nextEventDate")}/>
        </form>
        <button type="submit" onClick={this.confirmNewOrganizer}> Confirm new organizer</button>
      </div>
    )
  }
}
