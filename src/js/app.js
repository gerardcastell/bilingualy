// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom";

// Import Framework7
import Framework7 from "framework7/framework7-lite.esm.bundle.js";

// Import Framework7-React Plugin
import Framework7React from "framework7-react";

// Import Framework7 Styles
import "framework7/css/framework7.bundle.css";

// Import Icons and App Custom Styles
import "../css/icons.css";
import "../css/app.scss";

// Import App Component
import App from "../components/app.jsx";

// Init F7 Vue Plugin
Framework7.use(Framework7React);

//Import logo
import logo from "../static/icons/512x512.png";

//Import Redux libraries
import { Provider, useSelector } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../redux/reducers";
import thunk from "redux-thunk";

//Import Firebase modules
import firebase from "firebase/app";
import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from "react-redux-firebase";
//Import Firebase project config
import firebaseConfig from "../services/firebase/config";

import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

//construct required properties
const profileSpecificProps = {
  userProfile: "users",
  useFirestoreForProfile: true,
  enableRedirectHandling: false,
  resetBeforeLogin: false,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, firebaseConfig)
  )
);

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div
        style={{
          color: "white",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#68a3e3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Logo" style={{ height: "150px" }} />
      </div>
    );
  return children;
};

const reactReduxFirebaseProps = {
  firebase,
  config: firebaseConfig,
  config: profileSpecificProps,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// Mount React App
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
      <AuthIsLoaded>{React.createElement(App)}</AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("app")
);
