import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  NavRight,
  Link,
  Button,
  LoginScreen,
  View,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  Popup,
} from "framework7-react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../redux/actions";
import { f7 } from "framework7-react";

const SignUpPopup = ({ openSignUp, closeSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const auth = useSelector((state) => state.auth);
  const firebase = useSelector((state) => state.firebase);

  const dispatch = useDispatch();

  useEffect(() => {
    closeSignUp();
  }, [firebase.auth.uid]);

  const signIn = async () => {
    await dispatch(actions.authActions.signUp({ username, email, password }));
  };

  const showSignedIn = () => {
    if (auth.authError) {
      return (
        <BlockFooter style={{ color: "red" }}>{auth.authError}</BlockFooter>
      );
    }
  };

  return (
    <Popup
      className="signup-popup"
      opened={openSignUp}
      onPopupClose={closeSignUp}
      swipeToClose
    >
      <Page loginScreen>
        <Navbar>
          <NavRight>
            <Link popupClose>Close</Link>
          </NavRight>
        </Navbar>
        <div className="signup-popup__container display-flex justify-content-center align-items-center">
          <LoginScreenTitle>Welcome to Bilingualy!</LoginScreenTitle>
          <List form style={{ margin: 0, width: "100%" }}>
            <ListInput
              type="text"
              name="Username"
              autocomplete="username"
              placeholder="Your username"
              value={username}
              required
              maxlength={15}
              onInput={(e) => setUsername(e.target.value)}
            ></ListInput>
            <ListInput
              type="text"
              name="Email"
              autocomplete="email"
              placeholder="Your email"
              value={email}
              required
              maxlength={30}
              onInput={(e) => setEmail(e.target.value)}
            ></ListInput>
            <ListInput
              type="password"
              name="password"
              autocomplete="new-password"
              placeholder="Your password"
              value={password}
              required
              maxlength={20}
              onInput={(e) => setPassword(e.target.value)}
            ></ListInput>
          </List>
          <List style={{ margin: 0, width: "100%", marginTop: "1.5rem" }}>
            <Button onClick={signIn}>Sign Up</Button>
            <BlockFooter>{showSignedIn()}</BlockFooter>
          </List>
        </div>
      </Page>
    </Popup>
  );
};

export default SignUpPopup;
