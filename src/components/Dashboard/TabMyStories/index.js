import React from "react";
import { Tab } from "framework7-react";

const TabMyStories = ({ children, tabId, isActive }) => {
  return (
    <Tab id="tab-private" className="page-content tab-dashboard" tabActive>
      {children}
    </Tab>
  );
};

export default TabMyStories;
