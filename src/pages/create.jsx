import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import GridDnd from "../components/core/Grid/GridDnd";
import { searchPictograms } from "../services/arasaac";
import Stepper from "../components/core/Stepper";
import allActions from "../redux/actions";
import { useFirestoreConnect } from "react-redux-firebase";

import { f7 } from "framework7-react";

const createPage = () => {
  const currentStory = useSelector((state) => state.socialStory);

  const dispatch = useDispatch();

  const getPictogramList = async () => {
    const text = word;
    const response = await searchPictograms(text)
      .then((res) => res)
      .catch((err) => err);
    setSearchResults(response);
  };

  return (
    <Page>
      <Navbar title='Create your social story' backLink='Back' />
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
      <Block>
        {/* <GridDnd elements={currentStory} /> */}
        <Stepper />
        <Button fill>Search</Button>
      </Block>
      <Button raised round>
        Round
      </Button>
    </Page>
  );
};

export default createPage;
