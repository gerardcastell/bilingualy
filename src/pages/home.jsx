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
import DashboardSckeleton from "../components/Dashboard/Skeleton";
import CardsPresenter from "../components/core/CardsPresenter";

export default ({ f7router }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const uid = useSelector((state) => state.firebase.auth.uid);

  useFirestoreConnect([
    {
      collection: "socialStories",
      where: [["isPublic", "==", true]],
      storeAs: "publicStories",
    },
    {
      collection: "socialStories",
      where: [["userId", "==", uid ? uid : ""]],
      storeAs: "privateStories",
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

  return (
    <Page name="home">
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
      <CardsPresenter
        variant={"home"}
        searchFilter={searchValue}
        onCardOpen={handleCard}
      />

      <Fab
        style={{ display: isDisabled ? "none" : "block" }}
        onClick={() => f7router.navigate("/create/")}
        position="right-bottom"
        slot="fixed"
      >
        <Icon ios="f7:plus" aurora="f7:plus" md="material:add"></Icon>
      </Fab>
    </Page>
  );
};
