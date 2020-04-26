import React from "react";
import { Page, Navbar, Block, BlockTitle, f7 } from "framework7-react";

export default () => (
  <Page>
    <Navbar title="About PWA's?" backLink='Back' />
    <BlockTitle>What are Progressive Web Applications?</BlockTitle>
    <Block strong>
      <p>
        Progressive web applications are web apps that uses modern web
        capabilities to deliver an app-like experience to users. These apps meet
        certain requirements (explained below), are deployed to servers,
        accessible through URLs, and indexed by search engines.
      </p>
      <p></p>
    </Block>
  </Page>
);
