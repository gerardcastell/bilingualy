import React from "react";
import ReactDOM from "react-dom";
import { Tab, Block } from "framework7-react";

import { useDispatch, useSelector } from "react-redux";

import { useFirestoreConnect } from "react-redux-firebase";

import StoryCard from "../../core/StoryCard";

const container = document.querySelector("#prueba");
console.log(container);
const TabMyStories = ({ onTouchCard, children }) => {
  const uid = useSelector((state) => state.firebase.auth.uid);
  const myStories = useSelector(
    (state) => state.firestore.ordered.privateStories
  );

  const showMyStories = () => {
    let items = myStories ? myStories : [];
    if (items.length) {
      return items.map((item, idx) => (
        <StoryCard key={idx} data={item} onTouchCard={onTouchCard} />
      ));
    } else {
      return <p>You don't have created any Social Story yet.</p>;
    }
  };

  return (
    <Tab id="tab-private" className="page-content tab-dashboard" tabActive>
      {/* {showMyStories()} */}
      {/* {ReactDOM.createPortal(children, container)} */}
      {children}
    </Tab>
  );
};

export default TabMyStories;
