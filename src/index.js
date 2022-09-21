import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'

import Firebase, { FirebaseContext } from './firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);


