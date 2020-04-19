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
import PictoBrowser from './PictoBrowser.jsx'

import Actions from '../../../redux/actions'
import { useSelector, useDispatch } from "react-redux";

import './index.scss'

const Step1 = () => {
  const [openPictoBrowser, setOpenPictoBrowser] = useState(false)
  const [story, setStory] = useState([]);
  const uniqueKey = useRef(0)
  const prevStories = useRef([])

  const dispatch = useDispatch()

  const addPictogram = (id) => {
    prevStories.current = [...prevStories.current, story];
    console.log(prevStories)
    setStory([...story, { key: uniqueKey.current, url: id, position: story.length }])
    uniqueKey.current += 1;
  }

  const handleUpatePositions = (newState) => {
    prevStories.current = [...prevStories.current, story]
    setStory(newState);
  }

  const handleUndo = () => {
    if (prevStories.current.length) {
      setStory(prevStories.current.pop());
    }
  }

  const nextStep = () => {
    const finalStory = story;
    finalStory.forEach((item, index) => {
      delete item.key
      item.position = index
    });
    dispatch(Actions.socialStoryActions.addPictograms(finalStory))
    dispatch(Actions.socialStoryActions.nextStep())
  }

  return (
    <>
      <BlockTitle>Add pictograms to your social story:</BlockTitle>
      <Block>
        <GridDnd elements={story} onUpdate={handleUpatePositions} />
      </Block>
      <NextButton clicked={nextStep} disabled={!story.length} />
      <UndoButton clicked={handleUndo} disabled={!prevStories.current.length} />
      <Fab position='left-bottom' slot='fixed' text='Add'>
        <Icon ios='f7:plus' aurora='f7:plus' md='material:add'></Icon>
        <Icon ios='f7:xmark' aurora='f7:xmark' md='material:close'></Icon>
        <FabButtons position='top'>
          <FabButton onClick={() => { setOpenPictoBrowser(true) }} fabClose label='Pictogram'>
            <Icon md='material:portrait' />
          </FabButton>
          <FabButton fabClose label='Photo'>
            <Icon md='material:photo_camera' />
          </FabButton>
          <FabButton fabClose label='Draw'>
            <Icon md='material:brush' />
          </FabButton>
        </FabButtons>
      </Fab>
      <PictoBrowser opened={openPictoBrowser} addPictogram={(id) => addPictogram(id)} onClose={() => setOpenPictoBrowser(false)} />
    </>
  );
};

export default Step1;
