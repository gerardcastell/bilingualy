import React from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Panel,
  View,
  Button,
  Fab,
  Icon,
} from "framework7-react";
import { useFirestoreConnect } from "react-redux-firebase";

import { useDispatch, useSelector } from "react-redux";

import StoryCard from "../components/core/StoryCard";
import SidePanel from "../components/core/SidePanel";

export default ({ f7router }) => {
  useFirestoreConnect(["users", "socialStories"]);

  const myStories = useSelector(
    (state) => state.firestore.ordered.socialStories
  );

  const showMyStories = () => {
    let items = myStories ? myStories : [];
    if (items.length) {
      return items.map((item, idx) => <StoryCard key={idx} data={item} />);
    } else {
      return <p>You don't have created any Social Story yet.</p>;
    }
  };

  return (
    <Page name='home'>
      <SidePanel />
      <Navbar>
        <NavLeft>
          <Link style={{ pointerEvents: "none" }} iconMd='' />
        </NavLeft>
        <NavTitle className='header-title display-flex justify-content-center align-items-center'>
          Bilingualy
        </NavTitle>
        <NavRight>
          <Link
            iconIos='f7:menu'
            iconAurora='f7:menu'
            iconMd='material:menu'
            panelOpen='right'
          />
        </NavRight>
      </Navbar>
      {showMyStories()}
      {/* <List>
        <ListItem
          title='Dynamic (Component) Route'
          link='/dynamic-route/blog/45/post/125/?foo=bar#about'
        />
        <ListItem
          title='Default Route (404)'
          link='/load-something-that-doesnt-exist/'
        />
        <ListItem
          title='Request Data & Load'
          link='/request-and-load/user/123456/'
        />
        <ListItem title='New Data' link='new/12' />
        <ListItem title='Create page' link='/create/' />
        <ListItem title='About page' link='/about/' />
      </List> */}
      <Fab
        onClick={() => f7router.navigate("/create/")}
        position='right-bottom'
        slot='fixed'
      >
        <Icon ios='f7:plus' aurora='f7:plus' md='material:add'></Icon>
      </Fab>
    </Page>
  );
};
