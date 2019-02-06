var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyBo5WFUJXjDC0q4OQcd9lYIEgTsWyD2hWc",
  authDomain: "medicamentos-node-api.firebaseapp.com",
  databaseURL: "https://medicamentos-node-api.firebaseio.com",
  projectId: "medicamentos-node-api",
  storageBucket: "medicamentos-node-api.appspot.com",
  messagingSenderId: "990205164144"
};

firebase.initializeApp(config);

module.exports = firebase.database()
  