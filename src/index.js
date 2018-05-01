import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/root/App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDSukyxringpEjxQcvCL1kvjaLA3JuLDZM",
    authDomain: "campus1010-1010.firebaseapp.com",
    databaseURL: "https://campus1010-1010.firebaseio.com",
    projectId: "campus1010-1010",
    storageBucket: "campus1010-1010.appspot.com",
    messagingSenderId: "882936929243"
  };
  firebase.initializeApp(config);

ReactDOM.render(
<MuiThemeProvider>
<App />   
</MuiThemeProvider>
   , document.getElementById('root'));
registerServiceWorker();
