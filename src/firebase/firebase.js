import firebase from  'firebase/app';
import 'firebase/auth' ;

// Your web app's Firebase configuration
const config = {
    apiKey: "add own api",
    authDomain: "add own api",
    projectId: "add own apit",
    storageBucket: "add own api",
    messagingSenderId: "add own api",
    appId: "add own api"
  };

class Firebase{
  constructor() {
	  firebase.initializeApp(config);
	  this.auth = firebase.auth();
    this.signAuth = firebase.auth;
	  this.firebase = firebase;
  }

  doSignOut = () => {
	  this.auth.signOut();
  }
}
 
export default Firebase;