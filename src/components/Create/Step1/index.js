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
  const [story, setStory] = useState([{ key: 2, url: "https://api.arasaac.org/api/pictograms/29566", position: 0 },
  { key: 0, url: "https://api.arasaac.org/api/pictograms/3021", position: 1 },
  { key: 3, url: "https://api.arasaac.org/api/pictograms/3021", position: 2 },
  { key: 1, url: "https://api.arasaac.org/api/pictograms/7041", position: 3 }]);
  const [updatedStory, setUpdatedStory] = useState([]);
  const [key, setKey] = useState(0)
  // const currentStory = useSelector((state) => {
  //   const items = state.socialStory.pictograms;
  //   return items.map(item => item.url)
  // });

  const addPictogram = (id) => {
    setStory([...story, { key, url: id, position: story.length }])
    setUpdatedStory([...story, { key, url: id, position: story.length }])
    setKey(key + 1)
  }

  const updatePictogramPositions = () => {
    const newStory = updatedStory.map((item, idx) => {
      return { ...item, position: idx }
    })
    setStory(newStory)
  }

  const dispatch = useDispatch()

  const onUndo = () => {
    dispatch(Actions.socialStoryActions.undoPictogram())
  }

  return (
    <>
      <BlockTitle>Add pictograms to your social story:</BlockTitle>
      <Block>
        <GridDnd elements={story} onUpdate={(newStory) => setUpdatedStory(newStory)} />
      </Block>
      <NextButton />
      <UndoButton clicked={onUndo} />
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
