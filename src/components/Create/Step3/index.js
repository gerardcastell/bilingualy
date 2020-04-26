import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Link,
  ListInput,
  List,
  Icon,
  Col,
  Row,
  Button,
} from "framework7-react";

import CustomChip from "../../core/Chip";

import NextButton from "../../core/Buttons/NextButton";
import BackButton from "../../core/Buttons/BackButton";
import TagsZone from "./TagsZone";

import { useSelector, useDispatch } from "react-redux";
import useMobileKeyboard from "../../Hooks/UseMobileKeyboard";

import actions from "../../../redux/actions";

import "./style.scss";

const Step3 = () => {
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");

  const isMobileKeyboardOpen = useMobileKeyboard();
  const dispatch = useDispatch();

  const dataStored = useSelector((state) => state.socialStory.tags);

  useEffect(() => {
    if (dataStored) setTags(dataStored);
  }, [dataStored]);

  const handleColorPicker = ({ hex }) => {
    let color = null;
    switch (hex) {
      case "#ff3b30":
        color = "red";
        break;
      case "#ff2d55":
        color = "pink";
        break;
      case "#ff6b22":
        color = "deeporange";
        break;
      case "#ff9500":
        color = "orange";
        break;
      case "#ffcc00":
        color = "yellow";
        break;
      case "#cddc39":
        color = "lime";
        break;
      case "#4cd964":
        color = "green";
        break;
      case "#009688":
        color = "teal";
        break;
      case "#5ac8fa":
        color = "lightblue";
        break;
      case "#2196f3":
        color = "blue";
        break;
      case "#673ab7":
        color = "deeppurple";
        break;
      case "#9c27b0":
        color = "purple";
        break;
      case "#000000":
        color = "white";
        break;
      case "#8e8e93":
        color = "gray";
        break;
      case "#ffffff":
        color = "black";
        break;
    }
    setTagColor(color);
  };

  const addTag = () => {
    setTags([...tags, { text: tagName, color: tagColor }]);
    setTagName("");
    setTagColor("");
  };

  const handleDeleteTag = (id) => {
    setTags(tags.filter((a, idx) => idx !== id));
  };

  const renderTags = () => {
    if (tags.length) {
      return tags.map((tag, idx) => {
        return (
          <CustomChip
            key={idx}
            text={tag.text}
            color={tag.color}
            onDelete={() => handleDeleteTag(idx)}
          />
        );
      });
    }
  };

  const nextStep = () => {
    dispatch(actions.socialStoryActions.addTags(tags));
    dispatch(actions.socialStoryActions.nextStep());
  };

  const renderBottomButtons = () => {
    if (!isMobileKeyboardOpen) {
      return (
        <>
          <NextButton clicked={() => nextStep()} disabled={!tags.length} />
          <BackButton
            clicked={() => dispatch(actions.socialStoryActions.backStep())}
          />
        </>
      );
    }
  };

  return (
    <>
      <BlockTitle>Add tags to gather your social stories in topics:</BlockTitle>
      <Block></Block>

      <List inlineLabels noHairlines>
        <ListInput
          label="Tag"
          type="text"
          placeholder="Enter a tag name"
          required
          maxlength={12}
          validate
          clearButton
          onChange={(e) => setTagName(e.target.value)}
          value={tagName}
        ></ListInput>
        <ListInput
          type="colorpicker"
          label="Palette"
          placeholder="Enter a color"
          readonly
          required
          onColorPickerChange={(color) => handleColorPicker(color)}
          colorPickerParams={{
            modules: ["current-color", "palette"],
            openIn: "auto",
            openInPhone: "sheet",
            palette: [
              ["#ff3b30", "#ff2d55", "#ff6b22"],
              ["#ff9500", "#ffcc00", "#cddc39"],
              ["#4cd964", "#009688", "#5ac8fa"],
              ["#2196f3", "#673ab7", "#9c27b0"],
              ["#000000", "#8e8e93", "#ffffff"],
            ],
            formatValue(value) {
              switch (value.hex) {
                case "#ff3b30":
                  return "red";
                case "#ff2d55":
                  return "pink";
                case "#ff6b22":
                  return "deeporange";
                case "#ff9500":
                  return "orange";
                case "#ffcc00":
                  return "yellow";
                case "#cddc39":
                  return "lime";
                case "#4cd964":
                  return "green";
                case "#009688":
                  return "teal";
                case "#5ac8fa":
                  return "lightblue";
                case "#2196f3":
                  return "blue";
                case "#673ab7":
                  return "deeppurple";
                case "#9c27b0":
                  return "purple";
                case "#000000":
                  return "white";
                case "#8e8e93":
                  return "gray";
                case "#ffffff":
                  return "black";
              }
              return value.hex;
            },
          }}
        />
      </List>
      <Block display-flex>
        <Row>
          <Col className="tag-example">
            <CustomChip
              color={tagColor ? tagColor : "orange"}
              text={tagName ? tagName : "Example"}
            />
          </Col>
          <Col></Col>
          <Col>
            <Button
              onClick={() => addTag()}
              fill
              round
              disabled={!tagName || !tagColor}
            >
              Add Tag
            </Button>
          </Col>
        </Row>
      </Block>
      <Block>
        <h3>Current tags:</h3>
        <Row className="row-separated">
          <Col>{renderTags()}</Col>
        </Row>
      </Block>
      {renderBottomButtons()}
    </>
  );
};

export default Step3;
