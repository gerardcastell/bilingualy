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

//Import Redux libraries
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
// Mount React App
ReactDOM.render(
  <Provider store={store}>{React.createElement(App)}</Provider>, 
  document.getElementById("app")
);
