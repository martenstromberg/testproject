import React, { Component} from 'react';
import List from './List.js'
import './App.css';
import amplitude from 'amplitude-js/amplitude';
// var dotenv = require("dotenv").config();


function  getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const API_KEY=process.env.REACT_APP_AMPLITUDE_API_KEY
const config = {
    API_DB: process.env.REACT_APP_API_DB

  }

function sendEventToAmplitude(eventName) {
  amplitude.getInstance().logEvent(eventName);
  console.log('event ['+eventName+'] sent to Amplitude')
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
    }
  }

    componentDidMount() {
      // const API_KEY=process.env.REACT_APP_AMPLITUDE_API_KEY
      amplitude.init(API_KEY);
      const eventName = "pageLoaded"
      sendEventToAmplitude(eventName)
    }

  currentOrganizer = () => {
    fetch("https://" + config.API_DB +"/api.json/login?password=" + this.state.password)
    .then(res => res.json())
    .then(res => this.setState({ currentOrganizer: res }))
    .catch(err => console.log(err));
    console.log(this.state.currentOrganizer)
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

  onChange = (event) => {
    console.log(event.target.value)
    this.setState({
      name:event.target.value
    })
  }

  onChangePassword = (event) => {
    console.log(event.target.value)
    this.setState({
      password:event.target.value
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
      const selectedId = getRandomInt(min, max)
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
    const array = this.state.organizer.replace(" ", "+")
    console.log("confirming new organizer...")
    fetch("https://" + config.API_DB +"/api.json/new_organiser?organiser="+ array+"&password="+this.state.password)
    .catch(err => console.log(err))

  }

  render() {
    return (
      <div>
        <h1>nästatorsdagsmiddag.com</h1>
          <input placeholder="Password to interact with database" value={this.state.password} onChange={this.onChangePassword}/>
        <h2>Den som ordnar kommande middag är</h2>
        <button type="submit" onClick={this.currentOrganizer}> Se vem som ordnar nuvarande torsdagsmiddag</button>
        {this.state.currentOrganizer.map((item, i) => {
            return (
              <div key={i}>
                <ul>
                  <li>{item.name},  Utsedd att organisera: {item.timestamp_selected}</li>
                </ul>
              </div>)
        })}
        <h2>Val av nästa organisatör - potentiella organisatörer</h2>
        <form onSubmit={this.addParticipant}>
          <input placeholder="Participant" value={this.state.name} onChange={this.onChange}/>
          <button type="submit"> Add participant</button>
        </form>
        <List items={this.state.participants} />
        <button type="submit" onClick={this.selectOrganizer}> Select organizer</button>
        <h3>Den som organiserar nästa torsdagsmiddag är:</h3>
        <ul>
          <li>{this.state.organizer}</li>
        </ul>
        <button type="submit" onClick={this.confirmNewOrganizer}> Confirm new organizer</button>
      </div>
    )
  }
}
