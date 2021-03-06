import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Link,
  ListInput,
  List,
  Icon,
  Button,
} from "framework7-react";
import { useSelector, useDispatch } from "react-redux";
import GridDnd from "../components/core/Grid/GridDnd";
import { searchPictograms } from "../services/arasaac";
import allActions from "../redux/actions";
import { useFirestoreConnect } from "react-redux-firebase";

import { f7 } from "framework7-react";

const createPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [word, setWord] = useState("");
  const stories = useSelector((state) => state.firestore.ordered.prueba);
  const currentStory = useSelector((state) => state.socialStory);
  const dispatch = useDispatch();
  useFirestoreConnect({ collection: "prueba", orderBy: ["createdAt", "desc"] });

  const handleChange = (event) => {
    let id = event.target.value;
    setWord(id);
  };

  const getPictogramList = async () => {
    const text = word;
    const response = await searchPictograms(text)
      .then((res) => res)
      .catch((err) => err);
    setSearchResults(response);
  };

  const selectPictogram = (id) => {
    dispatch(allActions.socialStoryActions.addPictogram(id));
  };

  const saveSocialStory = () => {
    dispatch(allActions.socialStoryActions.createSocialStory(currentStory));
  };

  const showCurrentStory = () => {
    return (
      <div>
        {currentStory.map((item, idx) => (
          <img
            src={item}
            key={idx}
            alt=""
            style={{ height: "100px", width: "100px" }}
          />
        ))}
      </div>
    );
  };

  const downloadSocialStories = () => {
    f7.dialog.alert(
      stories ? `${stories.length} lodaded` : "No story loaded",
      "Social stories"
    );
  };

  const showSearchResults = () => {
    if (searchResults.length) {
      return (
        <div>
          {searchResults.map((item, idx) => (
            <img
              src={item}
              key={idx}
              alt=""
              style={{ height: "100px", width: "100px" }}
              onClick={() => selectPictogram(item)}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <Page>
      <Navbar title="About" backLink="Back" />
      <BlockTitle>About My App</BlockTitle>
      <Block>
        <h1>My social Story</h1>
        {/* {showCurrentStory()} */}
        <GridDnd elements={currentStory} />
      </Block>
      <Block strong></Block>
      <Block>
        <List noHairlinesMd>
          <ListInput
            label="Pictogram"
            floatingLabel
            type="text"
            placeholder="Write a word"
            clearButton
            onChange={handleChange}
          >
            <Icon f7="search" slot="media" />
          </ListInput>
        </List>
        <Button fill onClick={getPictogramList}>
          Search
        </Button>
        <Button fill onClick={saveSocialStory} style={{ marginTop: "10px" }}>
          Save Social Story
        </Button>
        <Button
          fill
          onClick={downloadSocialStories}
          style={{ marginTop: "10px" }}
        >
          Download social stories
        </Button>
        {showSearchResults()}
      </Block>
    </Page>
  );
};

export default createPage;
