import React, { useState, useRef, useEffect } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Link,
  ListInput,
  List,
  Fab,
  FabButtons,
  FabButton,
  Icon,
  Button,
} from "framework7-react";

import UndoButton from "../../core/Buttons/UndoButton";
import NextButton from "../../core/Buttons/NextButton";
import GridDnd from "../../core/Grid/GridDnd";
import PictoBrowser from "./PictoBrowser.jsx";

import Actions from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

import "./index.scss";

const Step1 = () => {
  const [openPictoBrowser, setOpenPictoBrowser] = useState(false);
  const [story, setStory] = useState([]);
  const uniqueKey = useRef(0);
  const prevStories = useRef([]);

  const dispatch = useDispatch();

  const addPictogram = (id, name) => {
    prevStories.current = [...prevStories.current, story];
    setStory([
      ...story,
      { key: uniqueKey.current, url: id, name, position: story.length },
    ]);
    uniqueKey.current += 1;
  };

  const handleUpatePositions = (newState) => {
    prevStories.current = [...prevStories.current, story];
    setStory(newState);
  };

  const handleUndo = () => {
    if (prevStories.current.length) {
      setStory(prevStories.current.pop());
    }
  };

  const nextStep = () => {
    const finalStory = story;
    finalStory.forEach((item, index) => {
      delete item.key;
      item.position = index;
    });
    dispatch(Actions.socialStoryActions.addPictograms(finalStory));
    dispatch(Actions.socialStoryActions.nextStep());
  };

  return (
    <div className="step1">
      <BlockTitle>Add pictograms to your social story:</BlockTitle>
      <Block>
        <GridDnd elements={story} onUpdate={handleUpatePositions} />
      </Block>
      <PictoBrowser
        opened={openPictoBrowser}
        addPictogram={(id, name) => addPictogram(id, name)}
        onClose={() => setOpenPictoBrowser(false)}
      />
      <div className="buttons-row">
        <NextButton clicked={nextStep} disabled={!story.length} />
        <UndoButton
          clicked={handleUndo}
          disabled={!prevStories.current.length}
        />
        <Fab position="left-bottom" slot="fixed" text="Add">
          <Icon
            ios="f7:plus"
            aurora="f7:plus"
            md="material:add"
            ios="material:add"
          ></Icon>
          <Icon
            ios="f7:xmark"
            aurora="f7:xmark"
            md="material:close"
            ios="material:close"
          ></Icon>
          <FabButtons position="top">
            <FabButton
              onClick={() => {
                setOpenPictoBrowser(true);
              }}
              fabClose
              label="Pictogram"
            >
              <Icon
                md="material:portrait"
                ios="material:portrait"
                aurora="material:portrait"
              />
            </FabButton>
            <FabButton fabClose label="Photo">
              <Icon
                md="material:photo_camera"
                ios="material:photo_camera"
                aurora="material:portrait"
              />
            </FabButton>
            <FabButton fabClose label="Draw">
              <Icon
                md="material:brush"
                ios="material:brush"
                aurora="material:portrait"
              />
            </FabButton>
          </FabButtons>
        </Fab>
      </div>
    </div>
  );
};

export default Step1;
