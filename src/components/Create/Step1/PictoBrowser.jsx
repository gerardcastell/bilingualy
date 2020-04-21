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

import { searchPictograms } from "../../../services/arasaac";

const PictoBrowser = ({ opened, addPictogram, onClose }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  let timeout = 0;

  const handleSearchChange = (event) => {
    let text = event.target.value.trim();
    if (text !== "") {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        getPictogramList(text);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const getPictogramList = async (text) => {
    f7.preloader.show();

    try {
      const response = await searchPictograms(text);
      setSearchResults(response);
      setErrorMsg(null);
    } catch (e) {
      setSearchResults([]);
      setErrorMsg("There isn't any match for this search.");
    }

    f7.preloader.hide();
  };

  const selectPictogram = (id) => {
    // f7.dialog.confirm(
    //   "Is this pictogram your final selection?",
    //   null,
    //   () => confirmPictogram(id),
    //   null
    // );
    f7.dialog.prompt(
      " Otherwise, press 'Okay' anyway",
      "Do you want to add a caption to your pictogram?",
      function (caption) {
        f7.dialog.confirm(
          "Are you sure that the caption would be '" + caption + "'?",
          () => confirmPictogram(id, caption)
        );
      }
    );

    //   app.dialog.prompt('What is your name?', function (name) {
    //     app.dialog.confirm('Are you sure that your name is ' + name + '?', function () {
    //       app.dialog.alert('Ok, your name is ' + name);
    //     });
    //   });
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
              style={{ height: "6.5rem", width: "6.5rem" }}
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

  const confirmPictogram = (id, name) => {
    addPictogram(id, name);
    onClose();
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
            {showSearchResults()}
          </Block>
        </Page>
      </Popup>
    </>
  );
};

export default PictoBrowser;
