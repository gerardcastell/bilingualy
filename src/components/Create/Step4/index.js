import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Link,
  ListInput,
  List,
  ListItem,
  Toggle,
  Icon,
  Row,
  Col,
  Button,
  f7,
} from "framework7-react";

import BackButton from "../../core/Buttons/BackButton";

import { useSelector, useDispatch } from "react-redux";

import actions from "../../../redux/actions";

import { SUCCESS, FAILURE } from "../../../constants";

import "./style.scss";

const Step4 = ({ onSuccess }) => {
  const [publicStory, setPublicStory] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const requestState = useSelector((state) => state.socialStory.requestState);
  const isOnline = useSelector((state) => state.device.online);

  useEffect(() => {
    if (requestState === SUCCESS) {
      f7.dialog.alert(
        "Your social story is saved in our servers",
        "Social Story uploaded properly!",
        onSuccess
      );
    } else if (requestState === FAILURE) {
      f7.dialog.alert(
        "Social Story saved properly! Find it in your dashboard",
        "Ooops! Something went wrong",
        setButtonClicked(false)
      );
    }
  }, [requestState]);

  const dispatch = useDispatch();

  const handleToggle = (value) => {
    setPublicStory(value);
  };

  const handleSave = () => {
    dispatch(actions.socialStoryActions.addPrivacity(publicStory));
    dispatch(actions.socialStoryActions.createSocialStory());
  };

  const onClickSave = () => {
    setButtonClicked(true);
    handleSave();
    if (!isOnline) {
      f7.dialog.alert(
        "Thanks to PWA tech, we will save your story in background and upload it when Internet comes back.",
        "It seems like you don't have Internet connection right now",
        onSuccess
      );
    }
  };

  return (
    <>
      <Block>
        <BlockTitle>Your story is almost finished:</BlockTitle>
        <div className="content">
          <span>
            Do you want to share your story with Bilingualy community?
          </span>
          <List simpleList className="list-custom">
            <ListItem>
              <span>Public</span>
              <Toggle onToggleChange={(value) => handleToggle(value)} />
            </ListItem>
          </List>
          <span className="span-spacer">
            Your social story will be{" "}
            <b>{publicStory ? "public" : "private"}</b>
          </span>
          <span className="span-spacer" />
          <Button disabled={buttonClicked} raised fill onClick={onClickSave}>
            Save
          </Button>
        </div>
      </Block>

      <BackButton
        clicked={() => dispatch(actions.socialStoryActions.backStep())}
      />
    </>
  );
};

export default Step4;
