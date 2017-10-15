import firebase from 'firebase'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC433nPDgqTEZfhiDkGFWbc9_TFjLBALCU",
  authDomain: "smartshares-ad83c.firebaseapp.com",
  databaseURL: "https://smartshares-ad83c.firebaseio.com",
  projectId: "smartshares-ad83c",
  storageBucket: "smartshares-ad83c.appspot.com",
  messagingSenderId: "168497874387"
};
var fire = firebase.initializeApp(config);
export default fire;