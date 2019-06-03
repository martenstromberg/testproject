import React, { Component} from 'react';
import List from './List.js'
import './App.css';
import amplitude from 'amplitude-js/amplitude';

function  getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendEventToAmplitude(eventName) {
  amplitude.getInstance().logEvent(eventName);
  console.log('event ['+eventName+'] sent to Amplitude')
}

export default class App extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      participants: [],
      organizer: '',
      participantsApi:[]
    }
  }

    componentDidMount() {
      const API_KEY=process.env.AMPLITUDE_KEY
      amplitude.init(API_KEY);
      const eventName = "pageLoaded"
      sendEventToAmplitude(eventName)
    }

  addParticipant = (event) => {
    const eventName = 'addParticipant'
    sendEventToAmplitude(eventName)

    event.preventDefault()
    this.setState({
      term:'',
      participants:[...this.state.participants, this.state.term]
    })
  }

  onChange = (event) => {
    this.setState({
      term:event.target.value
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
  }

  render() {
    return (
      <div>
        <h2>nästatorsdagsmiddag.com</h2>
        <form onSubmit={this.addParticipant}>
          <input placeholder="Participant" value={this.state.term} onChange={this.onChange}/>
          <button type="submit"> Add participant</button>
        </form>
        <List items={this.state.participants} />
        <button type="submit" onClick={this.selectOrganizer}> Select organizer</button>
        <h3>Den som organiserar nästa torsdagsmiddag är:</h3>
        <ul>
          <li>{this.state.organizer}</li>
        </ul>
        <List items={this.state.participantsApi} />
      </div>
    )
  }
}
