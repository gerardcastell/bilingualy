import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavRight,
  Block,
  Popup,
  ListInput,
  List,
  Link,
  Button,
  Icon,
  Preloader,
  f7,
} from "framework7-react";

import { useDispatch } from "react-redux";
import Actions from "../../../redux/actions";

import { searchPictograms } from "../../../services/arasaac";

const PictoBrowser = ({ opened, onClose }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  //   const [timeout, settimeout] = useState(0);
  let timeout = 0;
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    let text = event.target.value;
    // setWord(id);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log("Se lanza la query");
      getPictogramList(text);
    }, 1000);
  };

  const getPictogramList = async (text) => {
    f7.preloader.show();
    try {
      const response = await searchPictograms(text);
      setSearchResults(response);
      setErrorMsg(null);
    } catch (e) {
      console.error(e);
      setSearchResults([]);
      setErrorMsg("There is any match for this search.");
      //   f7.dialog.alert("Unexpected error has occurred", "Search error");
    }

    f7.preloader.hide();
  };

  const selectPictogram = (id) => {
    dispatch(Actions.socialStoryActions.addPictogram(id));
  };

  const showSearchResults = () => {
    if (searchResults.length && !errorMsg) {
      return (
        <>
          {searchResults.map((item, idx) => (
            <img
              src={item}
              key={idx}
              alt=''
              style={{ height: "100px", width: "100px" }}
              onClick={() => selectPictogram(item)}
            />
          ))}
        </>
      );
    } else if (searchResults.length === 0 && errorMsg) {
      return (
        <>
          <p style={{ color: "gray" }}>{errorMsg}</p>
        </>
      );
    }
  };

  return (
    <>
      <Popup
        className='picto-browser-popup'
        opened={opened}
        onPopupClosed={() => onClose()}
      >
        <Page>
          <Navbar title='Picto Browser'>
            <NavRight>
              <Link popupClose>Close</Link>
            </NavRight>
          </Navbar>
          <Block>
            <List noHairlinesMd>
              <ListInput
                label='Pictogram'
                floatingLabel
                type='text'
                placeholder='Write a word'
                clearButton
                onChange={handleSearchChange}
              >
                <Icon f7='search' slot='media' />
              </ListInput>
            </List>
            <Button fill onClick={getPictogramList}>
              Search
            </Button>
            {showSearchResults()}
          </Block>
        </Page>
      </Popup>
    </>
  );
};

export default PictoBrowser;
