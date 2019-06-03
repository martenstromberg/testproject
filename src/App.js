import React, { Component} from 'react';
import List from './List.js'
import './App.css';

function  getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getData() {
  const response = await fetch("https://randomuser.me/api/?results=5")
  const result = await response.json()
  const fullName = result.results.map(result =>  result.name.first + " " + result.name.last)
  fullName.map(names => console.log(names))

  this.setState({
    participantsApi: fullName
  })


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



   getData = async (event) => {
    const response = await fetch("https://randomuser.me/api/?results=5")
    const result = await response.json()
    const fullName = result.results.map(result =>  result.name.first + " " + result.name.last)
    fullName.map(names => console.log(names))

    this.setState({
      participantsApi: fullName
    })
  }

    componentDidMount() {

      this.getData()

    }

  addParticipant = (event) => {
    console.log("added participant")
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
        <h1>nästatorsdagsmiddag.com</h1>
        <form className="App" onSubmit={this.addParticipant}>
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
