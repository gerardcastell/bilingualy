import socialStory from "./socialStory";
import auth from "./auth";
import device from "./device";
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
  socialStory,
  auth,
  device,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
