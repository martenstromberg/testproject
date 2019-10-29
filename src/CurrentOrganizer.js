import React, { Component} from 'react';
import CountDownClock from './CountDownClock'



export default class CurrentOrganizer extends Component{
    constructor (props) {
        super(props)
        this.state = {
            currentOrganizer:[],
            nextEventDate: '',
            config: this.props.config,
        }
    }

    componentDidMount() {

      // this.currentOrganizer()
    }

    handlError = (err) => {
        alert("Please make sure you have input a password and that it is correct")
        console.log(err)
    }

    currentOrganizer = () => {
        let requestType = (this.state.config.ENVIRONMENT === "local") ? "http" : "https"
        let request = requestType + "://" + this.state.config.API_DB +"/api.json/login?password=hello"
        fetch(request)
        .then(res => res.json())
        .then(res => this.setState({ currentOrganizer: res }))
        .catch(err => this.handlError(err));
    }

    extractDate = (timestamp) => {
        const dateItem = new Date(timestamp)
        let year = dateItem.getFullYear()
        var month = ""
        var day = ""
        if (dateItem.getMonth()<10) {
            month = "0" + (dateItem.getMonth() + 1)
        } else {
            month = dateItem.getMonth() + 1
        }

        if (dateItem.getDate() < 10) {
            day = "0" + dateItem.getDate()
        } else {
            day = dateItem.getDate()
        }
        return year + "-" + month + "-" + day
    }

    render() {
        return(
            <div className="py-2 text-center">

              <h1>
                Pelle Jansson
                </h1>

              </div>
          )}}
