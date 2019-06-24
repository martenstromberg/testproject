import amplitude from 'amplitude-js/amplitude';


const sendEventToAmplitude = (eventName) => {
    amplitude.getInstance().logEvent(eventName);
    console.log('event ['+eventName+'] sent to Amplitude')
}

export default sendEventToAmplitude
