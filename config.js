import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBo1O-8gpCl3pg3LR8GUSQX18n8wvd0hQ8",
    authDomain: "bmi-calculator-ac1f0.firebaseapp.com",
    projectId: "bmi-calculator-ac1f0",
    storageBucket: "bmi-calculator-ac1f0.appspot.com",
    messagingSenderId: "340912022787",
    appId: "1:340912022787:web:d46574aa607b4a743db536",
    measurementId: "G-M08J0Z191E"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
