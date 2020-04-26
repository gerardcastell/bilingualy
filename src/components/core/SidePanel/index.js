import React, { useState } from "react";
import {
  Panel,
  Navbar,
  Icon,
  Block,
  Button,
  f7,
  List,
} from "framework7-react";
import { useSelector, useDispatch } from "react-redux";

import actions from "../../../redux/actions";

import SidePanelButton from "../SidePanelButton";

const SidePanel = () => {
  const auth = useSelector((state) => state.firebase.auth);
  const username = useSelector((state) => state.firebase.profile.username);

  const dispatch = useDispatch();

  return (
    <Panel closeByBackdropClick right cover themeDark className="sidepanel">
      <Navbar>
        <Icon
          md={`material:person`}
          ios={`material:person`}
          aurora={`material:person`}
          className="sidepanel__logo-title"
        ></Icon>
        <span>
          Logged as{" "}
          <b>
            <i>{auth.uid ? username : "guest"}</i>
          </b>
        </span>
      </Navbar>

      <List>
        <ul>
          <SidePanelButton
            title="My Stories"
            link="/"
            icon="material:folder_shared"
          />
          <SidePanelButton
            title="Community Stories"
            link="/social/"
            icon="material:group"
          />
          <SidePanelButton
            title="Create new story"
            link="/create/"
            icon="material:create"
          />
          <SidePanelButton
            title="Why pictograms?"
            link="/about-pictograms/"
            icon="material:face"
          />
          <SidePanelButton
            title="About PWA's"
            link="/about-pwa/"
            icon="material:network_check"
          />
        </ul>
      </List>
      <Block>
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
      </Block>
    </Panel>
  );
};

export default SidePanel;
