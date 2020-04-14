import React, { useEffect, useState } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Button,
  LoginScreen,
  View,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
} from "framework7-react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../redux/actions";
import { f7 } from "framework7-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [opened, setOpened] = useState(true);

  const auth = useSelector((state) => state.auth);
  const firebase = useSelector((state) => state.firebase);
  const store = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    setOpened(firebase.auth.uid ? false : true);
  });

  const signIn = () => {
    // f7.dialog.preloader();
    dispatch(actions.authActions.signIn({ email, password }));
    // setTimeout(() => {
    //   console.log(store);
    // }, 2000);
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
    <LoginScreen opened={opened} id='my-login-screen'>
      <View>
        <Page loginScreen>
          <LoginScreenTitle>Bilingualy</LoginScreenTitle>
          <List form>
            <ListInput
              type='text'
              name='Email'
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
          </List>
        </Page>
      </View>
    </LoginScreen>
  );
};

export default LoginPage;
