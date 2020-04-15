// import * as firebase from 'firebase';
//In production change the above import with these below
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
const config = {
  apiKey: "AIzaSyBhygWp3hfBCBVekPtYKJ7mXykySgzKKjU",
  authDomain: "bilingualy.firebaseapp.com",
  databaseURL: "https://bilingualy.firebaseio.com",
  projectId: "bilingualy",
  storageBucket: "bilingualy.appspot.com",
  messagingSenderId: "954301508745",
  appId: "1:954301508745:web:21f7b85f96de9417d72a58",
  measurementId: "G-WJHM4JVY3K",
};
// Initialize Firebase
firebase.initializeApp(config);

firebase.firestore() // <- needed if using firestore

export default firebase;
// firebase.analytics();

// const databaseRef = firebase.database().ref();
// export const todosRef = databaseRef.child("todos")