import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Button,
  loginScreen,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
} from "framework7-react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../redux/actions";
import { useFirebaseConnect } from "react-redux-firebase";
import { f7 } from "framework7-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const firebase = useSelector((state) => state.firebase);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const signIn = async () => {
    // f7.dialog.preloader();
    dispatch(actions.authActions.signIn({ email, password }));
    // setTimeout(() => {
    //   console.log(store);
    // }, 2000);

    // while (!(auth.authError && firebase.auth.uid)) {
    //   console.log("a");
    // }
    // f7.dialog.close();
  };

  const signOut = () => {
    dispatch(actions.authActions.signOut());
    setTimeout(() => {
      console.log(store);
    }, 2000);
  };

  const showSignedIn = () => {
    if (auth.authError) {
      return <BlockFooter style={{ color: "red" }}>Login failed</BlockFooter>;
    }
  };

  return (
    <Page noToolbar noNavbar noSwipeback loginScreen>
      <LoginScreenTitle>Bilingualy</LoginScreenTitle>
      <List form>
        <ListInput
          label='Email'
          type='text'
          placeholder='Your Email'
          value={email}
          onInput={(e) => {
            setEmail(e.target.value);
          }}
        />
        <ListInput
          label='Password'
          type='password'
          placeholder='Your password'
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
      </List>
      <List>
        <ListButton onClick={signIn}>Sign In</ListButton>
        <ListButton onClick={signOut}>Sign Out</ListButton>
        {/* <BlockFooter>Some text about login information.</BlockFooter> */}
        {showSignedIn()}
      </List>
    </Page>
  );
};

export default LoginPage;
