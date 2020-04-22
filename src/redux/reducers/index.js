import socialStory from './socialStory';
import auth from './auth';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  socialStory,
  auth,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer;