import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import MainStack from './src/components/MainStack';
import { connect } from 'react-redux';
import { alreadyLogin, notLoginYet } from './src/actions';

class AppInit extends Component {
  componentDidMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAFWEcPcIGtTxG71mxfBpciFlQTIeO385U",
      authDomain: "instagrin-jc10-15a63.firebaseapp.com",
      databaseURL: "https://instagrin-jc10-15a63.firebaseio.com",
      projectId: "instagrin-jc10-15a63",
      storageBucket: "instagrin-jc10-15a63.appspot.com",
      messagingSenderId: "492831325923",
      appId: "1:492831325923:web:497efc34e3bfda9b370fd6",
      measurementId: "G-S6FZ6MXL09"
    };
    // Initialize Firebase
    //console.log('Isi Firebase Apps', firebase.apps)
    if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.props.alreadyLogin(user);
        } else {
            this.props.notLoginYet();
        }
    });
  }

  render() {
    return (
      <MainStack />
    )
  }
}

export default connect(null, { notLoginYet, alreadyLogin })(AppInit);