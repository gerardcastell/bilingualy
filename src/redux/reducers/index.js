import currentUser from './currentUser'
import counter from './counter'
import socialStory from './socialStory'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
  currentUser,
  counter,
  socialStory,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer