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

const Step1 = () => {
  const [openPictoBrowser, setOpenPictoBrowser] = useState(false)

  const currentStory = useSelector((state) => state.socialStory);
  const dispatch = useDispatch()

  const onUndo = () => {
    console.log('clicked')
    dispatch(Actions.socialStoryActions.undoPictogram())
  }

  return (
    <>
      <BlockTitle>Add pictograms to your social story</BlockTitle>
      <Block>
        <GridDnd elements={currentStory.pictograms} />
      </Block>
      <NextButton />
      <UndoButton clicked={onUndo} />
      <Fab position='left-bottom' slot='fixed' text='Add'>
        <Icon ios='f7:plus' aurora='f7:plus' md='material:add'></Icon>
        <Icon ios='f7:xmark' aurora='f7:xmark' md='material:close'></Icon>
        <FabButtons position='top'>
          <FabButton onClick={() => setOpenPictoBrowser(true)} label='Pictogram'>
            <Icon md='material:portrait' />
          </FabButton>
          <FabButton label='Photo'>
            <Icon md='material:photo_camera' />
          </FabButton>
          <FabButton label='Draw'>
            <Icon md='material:brush' />
          </FabButton>
        </FabButtons>
      </Fab>
      <PictoBrowser opened={openPictoBrowser} onClose={() => setOpenPictoBrowser(false)} />
    </>
  );
};

export default Step1;
