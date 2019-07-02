import React, { Component} from 'react';


export default class CurrentOrganizer extends Component{
    constructor (props) {
        super(props)
        this.state = {
            currentOrganizer:[],
            nextEventDate: '',
            config: this.props.config,
        }
    }

    currentOrganizer = () => {
        console.log(this.state.config)
        console.log("current password from child" + this.props.password)
      fetch("http://" + this.state.config.API_DB +"/api.json/login?password=" + this.props.password)
        .then(res => res.json())
        .then(res => this.setState({ currentOrganizer: res }))
        .catch(err => console.log(err));

        console.log(this.state.currentOrganizer)
    }

    extractDate = (timestamp) => {
        const dateItem = new Date(timestamp)
        if (dateItem.getMonth()<10) {
            return dateItem.getFullYear() + "-0" + (dateItem.getMonth() + 1) + "-" + dateItem.getDate()
        } else {
            return dateItem.getFullYear() + "-" + (dateItem.getMonth() + 1) + "-" + dateItem.getDate()
        }
    }

    render() {
        return(
            <div>
            <button type="submit" onClick={this.currentOrganizer}> Se vem som ordnar nuvarande torsdagsmiddag</button>
            {this.state.currentOrganizer.map((item, i) => {
                console.log(item)
                const nextDinnerDate = this.extractDate(item.date_of_next_dinner)
                const timestampSelectedDate = this.extractDate(item.timestamp_selected)
                return (
                  <div key={i}>
                    <ul>
                      <li>{item.name} ordnar nästa middag den: {nextDinnerDate},  Utsedd att organisera: {timestampSelectedDate}</li>
                    </ul>
                  </div>)
              })} </div>
          )}}
