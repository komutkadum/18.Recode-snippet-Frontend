import firebase from  'firebase/app';
import 'firebase/auth' ;

// Your web app's Firebase configuration
const config = {
  apiKey:"AIzaSyAOsT9doSRNBhWmHVSNyqhoPZJg8ZsjYCM",authDomain:"recode-snippet.firebaseapp.com",projectId:"recode-snippet",storageBucket:"recode-snippet.appspot.com",messagingSenderId:"748437291235",appId:"1:748437291235:web:c1a68a1617cda34c31c5d6"
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