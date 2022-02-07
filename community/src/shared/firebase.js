import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC9PwA3G81gEfoDkyyTX6rZUDaLull--is",
    authDomain: "hyejin-community.firebaseapp.com",
    projectId: "hyejin-community",
    storageBucket: "hyejin-community.appspot.com",
    messagingSenderId: "939704749371",
    appId: "1:939704749371:web:a4318b9e88ca874533bb1e",
    measurementId: "G-DH3E81M3J9"
  };

firebase.initializeApp(firebaseConfig);

const apikey = firebaseConfig.apikey;
const auth = firebase.auth();

export { auth, apikey};