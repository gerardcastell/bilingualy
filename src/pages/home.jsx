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
} from "framework7-react";
import { useFirestoreConnect } from "react-redux-firebase";

import { CardItem } from "../components/core/CardItem/CardItem";
import SidePanel from "../components/core/SidePanel";
export default () => {
  useFirestoreConnect(["users", "prueba"]);

  return (
    <Page name='home'>
      <SidePanel />
      {/* Top Navbar */}
      <Navbar>
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

      <CardItem />
      {/* Page content
    <Block strong>
      <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    </Block>
*/}

      {/* <BlockTitle>Navigation</BlockTitle>
    <List>
      <ListItem link="/about/" title="About"/>
      <ListItem link="/form/" title="Form"/>
    </List> */}
      {/* Page content

    <BlockTitle>Modals</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill raised popupOpen="#my-popup">Popup</Button>
        </Col>
        <Col width="50">
          <Button fill raised loginScreenOpen="#my-login-screen">Login Screen</Button>
        </Col>
      </Row>
    </Block>

    <BlockTitle>Panels</BlockTitle>
    <Block strong>
      <Row>
        <Col width="50">
          <Button fill raised panelOpen="left">Left Panel</Button>
        </Col>
        <Col width="50">
          <Button fill raised panelOpen="right">Right Panel</Button>
        </Col>
      </Row>
    </Block>
*/}
      <List>
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
        <ListItem title='Login page' link='/login/' />
        <ListItem title='Create page' link='/create/' />
      </List>
    </Page>
  );
};
