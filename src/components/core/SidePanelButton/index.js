import React from "react";
import { ListItem, Icon, f7, f7ready } from "framework7-react";

const SidePanelButton = ({ title, link, icon }) => {
  const waitForF7ready = () => {
    if (f7ready) {
      f7.panel.close("right");
    }
  };
  return (
    <ListItem onClick={waitForF7ready} title={title} link={link}>
      <Icon slot="media" md={icon} ios={icon} aurora={icon}></Icon>
    </ListItem>
  );
};

export default SidePanelButton;
