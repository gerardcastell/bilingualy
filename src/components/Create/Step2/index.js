import React, { useState, useEffect, useRef } from "react";
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

import NextButton from "../../core/Buttons/NextButton";
import BackButton from "../../core/Buttons/BackButton";

import { useSelector, useDispatch } from "react-redux";

import actions from "../../../redux/actions";

import useWindowDimensions from "../../Hooks/UseWindowDimensions";

const Step2 = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const initialHeight = useRef();
  const { height, width } = useWindowDimensions();
  //Set initial viewport height to handle mobile keyboard
  useEffect(() => {
    initialHeight.current = height;
    console.log(height);
  }, []);

  //If mobile and viewport height changes set keyboard to open
  useEffect(() => {
    console.log(
      "TECLADO ABIERTO: ",
      width < 450 && height < 0.8 * initialHeight.current
    );
    setKeyboardOpen(width < 450 && height < 0.8 * initialHeight.current);
  }, [height]);

  const showBottomButtons = () => {
    if (!keyboardOpen) {
      return (
        <>
          <NextButton
            clicked={() => nextStep()}
            disabled={title === "" || description === ""}
          />
          <BackButton
            clicked={() => dispatch(actions.socialStoryActions.backStep())}
          />
        </>
      );
    }
  };

  const dispatch = useDispatch();

  const nextStep = () => {
    dispatch(actions.socialStoryActions.addTitle({ title, description }));
    dispatch(actions.socialStoryActions.nextStep());
  };

  return (
    <>
      <BlockTitle>Add a title and a description:</BlockTitle>
      <Block></Block>

      <List inlineLabels noHairlines>
        <ListInput
          label="Title"
          type="text"
          placeholder="Enter a title"
          required
          validate
          clearButton
          onChange={(e) => setTitle(e.target.value)}
        ></ListInput>
        <ListInput
          label="Description"
          type="textarea"
          placeholder="Enter a brief description about the social story"
          required
          validate
          clearButton
          onChange={(e) => setDescription(e.target.value)}
        ></ListInput>
      </List>

      {showBottomButtons()}
    </>
  );
};

export default Step2;
