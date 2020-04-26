import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Searchbar,
  Fab,
  Icon,
} from "framework7-react";

import CardsPresenter from "../components/core/CardsPresenter";

export default ({ f7router }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const [searchValue, setSearchValue] = useState("");

  const handleCard = (value) => {
    setIsEnabled(!value);
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
        style={{ display: isEnabled ? "block" : "none" }}
        onClick={() => f7router.navigate("/create/")}
        position="right-bottom"
        slot="fixed"
      >
        <Icon ios="f7:plus" aurora="f7:plus" md="material:add"></Icon>
      </Fab>
    </Page>
  );
};
