import React, {Component} from 'react';
import List from './List.js'
import randomInt from './RandomInt.js'
import sendEventToAmplitude from './Amplitude.js'

export default class NewOrganizer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            participants:[],
            name:'',
            organizer:'',
            config: this.props.config,
        }
    }

    componentDidUpdate = () => {
        console.log(this.state.organizer)
    }

    addParticipant = (event) => {
      const eventName = 'addParticipant'
      sendEventToAmplitude(eventName)
      event.preventDefault()
      this.setState({
        participants:[...this.state.participants, this.state.name],
        name:''
      })
    }

    onChange = (event, field) => {
      this.setState({
        [field]:event.target.value
      })
    }

    handleNewOrganizer = (newOrganizer) => {
        console.log("handle new organizer from child " + newOrganizer)
        this.props.onHandleNewOrganizer(newOrganizer)
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
        console.log("selected organizer in formula is" + selectedOrganizer)
      } else {
        selectedOrganizer= "None, you need to add participants first"
      }
      this.setState(
        {
          organizer:selectedOrganizer
        }
      )
      this.handleNewOrganizer()

      console.log("selected organizer is " + this.state.organizer)

      return selectedOrganizer
    }

    newOrganizer = () => {
        let newOrganizer = this.selectOrganizer()
        this.handleNewOrganizer(newOrganizer)
    }

    render() {
        return <div>
                <h2>Val av ny organisatör </h2>
                <h3>potentiella organisatörer</h3>
                <form onSubmit={this.addParticipant}>
                  <input placeholder="Participant" value={this.state.name} onChange={(event) => this.onChange(event, "name")}/>
                  <button type="submit" onClick={this.addParticipant}> Add participant</button>
                </form>
                <List items={this.state.participants} />
                <button type="submit" onClick={this.newOrganizer}> Select new organizer</button>
                <h3>Utvald att organisera:</h3>
                <ul>
                  <li>{this.state.organizer}</li>
                </ul>
            </div>
    }
}
