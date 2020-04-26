import React, { useEffect, useState, useRef } from "react";
import {
  Page,
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
  f7,
} from "framework7-react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../redux/actions";

import SignUpPopup from "../components/core/SignUp";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignIn, setOpenSignIn] = useState(true);
  const [openedSignUp, setOpenedSignUp] = useState(false);
  const [showInstallPWA, setShowInstallPWA] = useState(false);

  const deferredPromptRef = useRef();

  const auth = useSelector((state) => state.auth);
  const firebase = useSelector((state) => state.firebase);

  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPromptRef.current = e;
      setDeferredPrompt(e);
      // Update UI notify the user they can install the PWA
      showInstallPromotion();
      setShowInstallPWA(true);
    });
  }, []);

  const onClickPrompt = () => {
    setShowInstallPWA(false);
    deferredPromptRef.current.prompt();

    deferredPromptRef.current.userChoice.then((choiceResult) => {
      if (choiceResult === "accepted") console.log("User accepted the A2HS");
      else console.log("User declined the A2HS prompt");
      setDeferredPrompt.current = null;
    });
  };

  useEffect(() => {
    if (auth.authError) {
      f7.toast.show({
        text: "Login failed",
        icon:
          app.theme === "ios"
            ? '<i class="f7-icons">highlight_off</i>'
            : '<i class="material-icons">highlight_off</i>',
        position: "center",
        closeTimeout: 3000,
        destroyOnClose: true,
        cssClass: "login-toast",
      });
    }
  }, [auth]);

  useEffect(() => {
    setOpenSignIn(firebase.auth.uid ? false : true);
  }, [firebase.auth]);

  const signIn = () => {
    dispatch(actions.authActions.signIn({ email, password }));
  };

  const closeSignUp = () => {
    setOpenedSignUp(false);
  };

  const openSignUp = () => {
    setOpenedSignUp(true);
    dispatch(actions.authActions.cleanAuthError());
  };

  // const showSignedIn = () => {
  //   if (auth.authError) {

  //     return <BlockFooter style={{ color: "red" }}>Login failed</BlockFooter>;
  //   }
  // };

  return (
    <LoginScreen opened={openSignIn} id="my-login-screen">
      <View>
        <Page loginScreen>
          <LoginScreenTitle>Bilingualy</LoginScreenTitle>
          <List form>
            <ListInput
              autocomplete="username"
              type="text"
              name="text"
              placeholder="Your email"
              value={email}
              required
              maxlength={30}
              onInput={(e) => setEmail(e.target.value)}
            ></ListInput>
            <ListInput
              type="password"
              name="password"
              autocomplete="current-password"
              required
              maxlength={20}
              placeholder="Your password"
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            ></ListInput>
          </List>
          <List>
            <Button
              style={{ marginLeft: "2rem", marginRight: "2rem" }}
              fill
              onClick={signIn}
            >
              Sign In
            </Button>
            <Button
              style={{
                margin: "var(--f7-login-screen-blocks-margin-vertical) auto",
              }}
              onClick={openSignUp}
            >
              Sign Up
            </Button>
            {(
              <Button
                style={{
                  margin: "var(--f7-login-screen-blocks-margin-vertical) auto",
                }}
                onClick={onClickPrompt}
              >
                Install PWA
              </Button>
            ) && showInstallPWA}
          </List>

          <SignUpPopup openSignUp={openedSignUp} closeSignUp={closeSignUp} />
        </Page>
      </View>
    </LoginScreen>
  );
};

export default LoginPage;
