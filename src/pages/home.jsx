import React, { useState } from "react";
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
} from "framework7-react";
import { useFirestoreConnect } from "react-redux-firebase";

import { useDispatch, useSelector } from "react-redux";

import StoryCard from "../components/core/StoryCard";
import SidePanel from "../components/core/SidePanel";
import DashboardSckeleton from "../components/Dashboard/Skeleton";
import TabMyStories from "../components/Dashboard/TabMyStories";
import TabSharedStories from "../components/Dashboard/TabSharedStories";

export default ({ f7router }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const uid = useSelector((state) => state.firebase.auth.uid);
  useFirestoreConnect([
    {
      collection: "socialStories",
      where: [["userId", "==", uid]],
      storeAs: "privateStories",
    },
    {
      collection: "socialStories",
      where: [["isPublic", "==", true]],
      storeAs: "publicStories",
    },
  ]);

  const fetchedStories = useSelector((state) =>
    state.firestore.ordered.privateStories
      ? state.firestore.ordered.privateStories
      : []
  );

  const handleCard = (value) => {
    setIsDisabled(value);
  };

  const handleOnClear = () => {
    setSearchValue("");
  };

  const handleMatch = (value) => {
    setSearchValue(value);
  };

  const showStories = () => {
    let finalStories;
    if (fetchedStories.length) {
      if (searchValue) {
        const regex = new RegExp(searchValue);
        const filteredStories = fetchedStories.filter((item) =>
          item.title.match(regex)
        );
        if (filteredStories.length) finalStories = filteredStories;
        else {
          finalStories = [];
        }
      } else {
        finalStories = fetchedStories;
      }

      return (
        <>
          <List className='search-list searchbar-found' style={{ zIndex: 300 }}>
            {finalStories.map((item, idx) => (
              <StoryCard
                className='item-content'
                key={idx}
                id={item.title}
                onTouchCard={handleCard}
                data={item}
              />
            ))}
          </List>
        </>
      );
    } else {
      return <DashboardSckeleton />;
    }
  };

  return (
    <Page name='home'>
      <SidePanel />
      <Navbar>
        <NavLeft>
          {/* <Link style={{ pointerEvents: "none" }} iconMd='' /> */}
          <Link
            searchbarEnable='.searchbar-demo'
            iconIos='f7:search'
            iconAurora='f7:search'
            iconMd='material:search'
          ></Link>
        </NavLeft>
        <Searchbar
          // onFocus={handleSearchBar}
          onChange={(e) => handleMatch(e.target.value)}
          onSearchbarClear={handleOnClear}
          onSearchbarDisable={handleOnClear}
          className='searchbar-demo'
          expandable
          searchContainer='.search-list'
          searchIn='.item-title'
        ></Searchbar>
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
      <List className='searchbar-not-found'>
        <ListItem title='Nothing found' />
      </List>
      {/* <List className='search-list searchbar-found'>
        <ListItem title='Acura' />
        <ListItem title='Audi' />
        <ListItem title='BMW' />
        <ListItem title='Cadillac ' />
        <ListItem title='Chevrolet ' />
        <ListItem title='Chrysler ' />
        <ListItem title='Dodge ' />
        <ListItem title='Ferrari ' />
        <ListItem title='Ford ' />
        <ListItem title='GMC ' />
        <ListItem title='Honda' />
        <ListItem title='Hummer' />
        <ListItem title='Hyundai' />
        <ListItem title='Infiniti ' />
        <ListItem title='Isuzu ' />
        <ListItem title='Jaguar ' />
        <ListItem title='Jeep ' />
        <ListItem title='Kia' />
        <ListItem title='Lamborghini ' />
        <ListItem title='Land Rover' />
        <ListItem title='Lexus ' />
        <ListItem title='Lincoln ' />
        <ListItem title='Lotus ' />
        <ListItem title='Mazda' />
        <ListItem title='Mercedes-Benz' />
        <ListItem title='Mercury ' />
        <ListItem title='Mitsubishi' />
        <ListItem title='Nissan ' />
        <ListItem title='Oldsmobile ' />
        <ListItem title='Peugeot ' />
        <ListItem title='Pontiac ' />
        <ListItem title='Porsche' />
        <ListItem title='Regal' />
        <ListItem title='Saab ' />
        <ListItem title='Saturn ' />
        <ListItem title='Subaru ' />
        <ListItem title='Suzuki ' />
        <ListItem title='Toyota' />
        <ListItem title='Volkswagen' />
        <ListItem title='Volvo' />
      </List> */}

      {/* <Toolbar tabbar bottom>
        <Link tabLink='#tab-private' tabLinkActive>
          My Stories
        </Link>
        <Link tabLink='#tab-shared'>Public Stories</Link>
      </Toolbar> 
       <Tabs swipeable>
        <TabMyStories onTouchCard={handleCard} />
        <TabSharedStories onTouchCard={handleCard} />
      </Tabs> */}
      {showStories()}
      <footer className='footer-dashboard-bottom'>
        <span>Empowered with PWA technologies</span>
      </footer>
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
        style={{ display: isDisabled ? "none" : "block" }}
        onClick={() => f7router.navigate("/create/")}
        position='right-bottom'
        slot='fixed'
      >
        <Icon ios='f7:plus' aurora='f7:plus' md='material:add'></Icon>
      </Fab>
    </Page>
  );
};
