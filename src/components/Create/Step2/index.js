import React, { useState, useEffect, useRef } from "react";
import { Block, BlockTitle, ListInput, List } from "framework7-react";

import NextButton from "../../core/Buttons/NextButton";
import BackButton from "../../core/Buttons/BackButton";

import { useSelector, useDispatch } from "react-redux";

import actions from "../../../redux/actions";

import useMobileKeyboard from "../../Hooks/UseMobileKeyboard";

const Step2 = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isMobileKeyboardOpen = useMobileKeyboard();
  const dataStored = useSelector((state) => {
    const { title, description, ...story } = state.socialStory;
    return { title, description };
  });

  useEffect(() => {
    if (dataStored.title) setTitle(dataStored.title);
    if (dataStored.description) setDescription(dataStored.description);
  }, [dataStored]);

  const showBottomButtons = () => {
    if (!isMobileKeyboardOpen) {
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
          maxlength={30}
          validate
          clearButton
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></ListInput>
        <ListInput
          label="Description"
          type="textarea"
          placeholder="Enter a brief description about the social story"
          required
          maxlength={120}
          validate
          clearButton
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></ListInput>
      </List>

      {showBottomButtons()}
    </>
  );
};

export default Step2;
