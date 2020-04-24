import React from "react";
import { ListItem, Icon, f7 } from "framework7-react";
const SidePanelButton = ({ title, link, icon }) => {
  return (
    <ListItem onClick={() => f7.panel.close("right")} title={title} link={link}>
      <Icon slot="media" md={icon} ios={icon} aurora={icon}></Icon>
    </ListItem>
  );
};

export default SidePanelButton;
