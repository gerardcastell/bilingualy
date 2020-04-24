import React from "react";
import {
  Panel,
  View,
  Page,
  Navbar,
  Icon,
  Block,
  Button,
  f7,
  List,
  ListItem,
} from "framework7-react";
import { useSelector, useDispatch } from "react-redux";

import actions from "../../../redux/actions";

const SidePanel = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const username = useSelector((state) => state.firebase.profile.username);

  const dispatch = useDispatch();

  const showLogButton = () => {
    if (auth.uid) {
      return (
        <>
          <Button
            fill
            onClick={() => {
              dispatch(actions.authActions.signOut());
              f7.panel.close("right");
            }}
          >
            Log out
          </Button>
        </>
      );
    } else {
      return (
        <Button fill href="/login/">
          Log in
        </Button>
      );
    }
  };
  return (
    <Panel right cover themeDark className="sidepanel">
      <View>
        <Page>
          <Navbar>
            <Icon
              md={`material:person`}
              ios={`material:person`}
              aurora={`material:person`}
            ></Icon>
            Logged as {auth.uid ? username : "guest"}
          </Navbar>
          <Block>{showLogButton()}</Block>
        </Page>
      </View>
    </Panel>
  );
};

export default SidePanel;
