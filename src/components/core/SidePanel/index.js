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
            <Icon
              className="sidepanel__exit"
              md="material:exit_to_app"
              ios="material:exit_to_app"
              aurora="material:exit_to_app"
            />
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
      <Navbar>
        <Icon
          md={`material:person`}
          ios={`material:person`}
          aurora={`material:person`}
          className="sidepanel__logo-title"
        ></Icon>
        Logged as {auth.uid ? username : "guest"}
      </Navbar>
      <List>
        <ListItem title="My Stories" link="/">
          <Icon
            slot="media"
            md={`material:folder_shared`}
            ios={`material:folder_shared`}
            aurora={`material:folder_shared`}
          ></Icon>
        </ListItem>
        <ListItem title="Community Stories" link="/social/">
          <Icon
            slot="media"
            md={`material:group`}
            ios={`material:group`}
            aurora={`material:group`}
          ></Icon>
        </ListItem>
        <ListItem title="Create new story" link="/create/">
          <Icon
            slot="media"
            md={`material:create`}
            ios={`material:create`}
            aurora={`material:create`}
          ></Icon>
        </ListItem>
        <ListItem title="Why pictograms?" link="/about/">
          <Icon
            slot="media"
            md={`material:face`}
            ios={`material:face`}
            aurora={`material:face`}
          ></Icon>
        </ListItem>
        <ListItem title="About PWA's" link="/about/">
          <Icon
            slot="media"
            md={`material:network_check`}
            ios={`material:network_check`}
            aurora={`material:network_check`}
          ></Icon>
        </ListItem>
      </List>
      <Block>{showLogButton()}</Block>
    </Panel>
  );
};

export default SidePanel;
