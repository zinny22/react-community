import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore =firebase.firestore();

export { auth, apiKey, firestore};