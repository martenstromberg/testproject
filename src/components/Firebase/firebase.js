import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'



const firebaseConfig = {
    apiKey: "AIzaSyCbZsFObI622NMCl8sEVq6xECiHp1zuX6w",
    authDomain: "nastatorsdagsmiddag.firebaseapp.com",
    databaseURL: "https://nastatorsdagsmiddag.firebaseio.com",
    projectId: "nastatorsdagsmiddag",
    storageBucket: "nastatorsdagsmiddag.appspot.com",
    messagingSenderId: "1042997506844",
    appId: "1:1042997506844:web:cd4a87e9a5e3c056ae40d9",
    measurementId: "G-Q5ZN4TQSQG"
  };


  class Firebase {

    constructor(){
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.firestore()
    }

    doWriteData = (description) => (
        this.db.collection('dinner').add({
            description: description,
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        })
    )
  }

  export default Firebase