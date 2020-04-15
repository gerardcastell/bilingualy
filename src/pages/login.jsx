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
import actions from "../redux/actions";
import { f7 } from "framework7-react";

import SignUpPopup from "../components/core/SignUp";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignIn, setOpenSignIn] = useState(true);
  const [openSignUp, setOpenSignUp] = useState(false);

  const auth = useSelector((state) => state.auth);
  const firebase = useSelector((state) => state.firebase);

  const dispatch = useDispatch();

  useEffect(() => {
    setOpenSignIn(firebase.auth.uid ? false : true);
  }, [firebase.auth]);

  const signIn = () => {
    dispatch(actions.authActions.signIn({ email, password }));
  };

  const closeSignUp = () => {
    setOpenSignUp(false);
  };

  const showSignedIn = () => {
    if (auth.authError) {
      return <BlockFooter style={{ color: "red" }}>Login failed</BlockFooter>;
    }
  };

  return (
    <LoginScreen opened={openSignIn} id='my-login-screen'>
      <View>
        <Page loginScreen>
          <LoginScreenTitle>Bilingualy</LoginScreenTitle>
          <List form>
            <ListInput
              type='text'
              name='text'
              placeholder='Your email'
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            ></ListInput>
            <ListInput
              type='password'
              name='password'
              placeholder='Your password'
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            ></ListInput>
          </List>
          <List>
            <ListButton title='Sign In' onClick={signIn} />
            <BlockFooter>{showSignedIn()}</BlockFooter>
            <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
          </List>

          <SignUpPopup openSignUp={openSignUp} closeSignUp={closeSignUp} />
        </Page>
      </View>
    </LoginScreen>
  );
};

export default LoginPage;
