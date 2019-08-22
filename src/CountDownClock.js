import React, {Component} from 'react'


export default class CountDownClock extends Component {

    constructor(props) {

        super(props)

        this.state = {
            secondsToEvent: '',
            clockUnits: {},
            interval: ''
        }
    }

    secondsToEvent = () => {
        let dateOfEvent = new Date(this.props.nextEvent)
        let now = new Date()
        let difference = dateOfEvent.getTime() - now.getTime()
        let secondsDifference = Math.floor(difference/1000)
        return secondsDifference
    }

    tick = () => {
        let secondsToEvent = this.secondsToEvent()
        this.timeItems(secondsToEvent)
        this.setState( {secondsToEvent: secondsToEvent})
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    timeItems = (input) => {
        var remaining = input
        let days = Math.floor(remaining/(60*60*24))
        remaining = remaining - (days * 60 * 60 * 24)
        let hours = Math.floor(remaining/(60*60))
        remaining = remaining - (hours * 60 *60)
        let minutes = Math.floor(remaining/60)
        remaining = remaining - (minutes * 60)
        let timeUnits = {days: days, hours:hours, minutes: minutes, seconds: remaining}
        this.setState({clockUnits: timeUnits})
    }

    getTime = () => {
        let secondsDifference = this.state.secondsToEvent
        this.timeItems(secondsDifference)
    }
    render() {

        return <div>
            <ul>
                <li>{this.state.clockUnits.days} dagar {this.state.clockUnits.hours} timmar, {this.state.clockUnits.minutes} minuter, {this.state.clockUnits.seconds} sekunder till nästa torsdagsmiddag</li>
            </ul>
        </div>
    }
}
