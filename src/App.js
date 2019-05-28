import React, { Component} from 'react';
import List from './List.js'
import './App.css';

export default class App extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      participants: []
    }
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

  render() {
    return (
      <div>
        <h1>nästatorsdagsmiddag.com</h1>
        <form className="App" onSubmit={this.addParticipant}>
          <input placeholder="Participant" value={this.state.term} onChange={this.onChange}/>
          <button type="submit"> Add participant</button>
        </form>
        <List items={this.state.participants} />
      </div>
    )
  }
}
