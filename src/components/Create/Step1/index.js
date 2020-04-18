import React, { useState } from "react";
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
  const [updatedStory, setUpdatedStory] = useState([]);
  const [prevStory, setPrevStory] = useState([]);
  const [key, setKey] = useState(0)

  const addPictogram = (id) => {
    setPrevStory([...prevStory, story])
    setStory([...story, { key, url: id, position: story.length }])
    setUpdatedStory([...story, { key, url: id, position: story.length }])
    setKey(key + 1)
  }

  const updatePictogramPositions = () => {
    const newStory = updatedStory.map((item, idx) => {
      return { ...item, position: idx }
    })
    setPrevStory([...prevStory, story]);
    setStory(newStory);
  }

  const onUndo = () => {
    const previousStates = prevStory
    const lastState = previousStates.pop();
    setStory(lastState);
    setUpdatedStory(lastState);
    setPrevStory(previousStates);
  }

  return (
    <>
      <BlockTitle>Add pictograms to your social story:</BlockTitle>
      <Block>
        <GridDnd elements={story} onUpdate={(newStory) => setUpdatedStory(newStory)} />
      </Block>
      <NextButton />
      <UndoButton clicked={onUndo} disabled={!prevStory.length} />
      <Fab position='left-bottom' slot='fixed' text='Add'>
        <Icon ios='f7:plus' aurora='f7:plus' md='material:add'></Icon>
        <Icon ios='f7:xmark' aurora='f7:xmark' md='material:close'></Icon>
        <FabButtons position='top'>
          <FabButton onClick={() => { setOpenPictoBrowser(true); updatePictogramPositions() }} fabClose label='Pictogram'>
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
