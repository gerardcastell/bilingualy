import React from "react";
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

import NextButton from "../core/Buttons/NextButton";
import GridDnd from "../core/Grid/GridDnd";

import { useSelector, useDispatch } from "react-redux";

const Step1 = () => {
  const currentStory = useSelector((state) => state.socialStory);

  return (
    <>
      <BlockTitle>Add pictograms to your social story</BlockTitle>
      <Block>
        <GridDnd elements={currentStory} />
      </Block>
      <NextButton />
      <Fab position='left-bottom' slot='fixed' text='Add'>
        <Icon ios='f7:plus' aurora='f7:plus' md='material:add'></Icon>
        <Icon ios='f7:xmark' aurora='f7:xmark' md='material:close'></Icon>
        <FabButtons position='top'>
          <FabButton label='Pictogram'>
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
    </>
  );
};

export default Step1;
