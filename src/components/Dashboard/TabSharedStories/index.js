import React, { useState } from "react";
import { Tab, Block } from "framework7-react";

import { useDispatch, useSelector } from "react-redux";

import { useFirestoreConnect } from "react-redux-firebase";

import StoryCard from "../../core/StoryCard";

const TabSharedStories = ({ children }) => {
  return (
    <Tab id="tab-shared" className="page-content tab-dashboard">
      {children}
    </Tab>
  );
};

export default TabSharedStories;
