import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Searchbar,
  Subnavbar,
  Toolbar,
  Tabs,
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
  f7,
} from "framework7-react";
import { useFirestoreConnect, useFirebaseConnect } from "react-redux-firebase";

import { useDispatch, useSelector } from "react-redux";

import StoryCard from "../components/core/StoryCard";
import SidePanel from "../components/core/SidePanel";
import DashboardSckeleton from "../components/Dashboard/Skeleton";

import OfflineToast from "../components/core/OfflineToast";

export default ({ f7router }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const uid = useSelector((state) => state.firebase.auth.uid);

  useFirestoreConnect([
    {
      collection: "socialStories",
      where: [["userId", "==", uid ? uid : ""]],
      storeAs: "privateStories",
    },
    {
      collection: "socialStories",
      where: [["isPublic", "==", true]],
      storeAs: "publicStories",
    },
  ]);
  const requestStatus = useSelector(
    (state) => state.firestore.status.requested
  );

  const privateStories = useSelector(
    (state) => state.firestore.ordered.privateStories
  );
  const publicStories = useSelector(
    (state) => state.firestore.ordered.publicStories
  );

  useEffect(() => {
    setLoading(!requestStatus.privateStories);
  });

  const handleCard = (value) => {
    setIsDisabled(value);
  };

  const handleOnClear = () => {
    setSearchValue("");
  };

  const handleMatch = (value) => {
    setSearchValue(value);
  };

  const showStories = (scope) => {
    let fetchedStories = scope === "public" ? publicStories : privateStories;
    let finalStories;

    if (!loading && fetchedStories) {
      if (searchValue) {
        const regex = new RegExp(searchValue);
        const filteredStories = fetchedStories.filter((item) =>
          item.title.match(regex)
        );

        finalStories = filteredStories;
        if (!finalStories.length) {
          return (
            <div className="list-empty-result">
              <h2>Nothing found with this title</h2>
            </div>
          );
        }
      } else {
        finalStories = fetchedStories;
      }

      return (
        <>
          <Button raised outline className="dashboard-title-button">
            MY SOCIAL STORIES
            <Icon
              md="material:lock"
              ios="material:lock"
              aurora="material:lock"
            ></Icon>
          </Button>
          {finalStories.map((item, idx) => (
            <StoryCard
              privateScope={scope === "private"}
              className="item-content"
              key={idx}
              id={item.title}
              onTouchCard={handleCard}
              data={item}
            />
          ))}
        </>
      );
    } else {
      return <DashboardSckeleton />;
    }
  };

  return (
    <Page name="home">
      {/* <SidePanel /> */}
      <OfflineToast />

      <Navbar>
        <NavLeft>
          <Link
            searchbarEnable=".searchbar-my-stories"
            iconIos="f7:search"
            iconAurora="f7:search"
            iconMd="material:search"
          ></Link>
        </NavLeft>
        <Searchbar
          onChange={(e) => handleMatch(e.target.value)}
          onSearchbarClear={handleOnClear}
          onSearchbarDisable={handleOnClear}
          onClickClear={handleOnClear}
          onClickDisable={handleOnClear}
          className="searchbar-my-stories"
          expandable
          searchContainer=".search-list"
          searchIn=".item-title"
        ></Searchbar>
        <NavTitle className="header-title display-flex justify-content-center align-items-center">
          Bilingualy
        </NavTitle>
        <NavRight>
          <Link
            iconIos="f7:menu"
            iconAurora="f7:menu"
            iconMd="material:menu"
            panelOpen="right"
          />
        </NavRight>
      </Navbar>
      <List className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <div className="container-content">
        {/* <div className="col-25"></div> */}
        <div className="col container-content__col">
          {showStories("private")}
        </div>
        {/* <div className="col-25"></div> */}
      </div>
      <footer className="footer-dashboard-bottom">
        <span>Empowered with PWA technology</span>
      </footer>

      <Fab
        style={{ display: isDisabled ? "none" : "block" }}
        onClick={() => f7router.navigate("/create/")}
        position="right-bottom"
        slot="fixed"
      >
        <Icon ios="f7:plus" aurora="f7:plus" md="material:add"></Icon>
      </Fab>
      <div id="prueba"></div>
    </Page>
  );
};
