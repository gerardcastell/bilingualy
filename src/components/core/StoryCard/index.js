import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Link,
  Icon,
  BlockTitle,
  f7,
} from "framework7-react";

import moment from "moment";

import { useDispatch } from "react-redux";

import actions from "../../../redux/actions";

import "./style.scss";

const StoryCard = ({ data, onTouchCard, privateScope }) => {
  const dispatch = useDispatch();

  const renderTags = () => {
    return data.tags.map((tag, index) => (
      <Chip
        className="margin-horizontal-half"
        text={tag.text}
        color={tag.color}
        key={index}
      />
    ));
  };

  const renderPictograms = () => {
    return data.pictograms.map(({ url, position, name }) => {
      const caption = name
        ? name.length < 30
          ? name
          : `${name.substring(0, 27)}...`
        : "";

      return (
        <div className="pictogram-container" key={position}>
          <img key={position} className="pictogram" src={url} alt="" />
          <div
            className="pictogram-caption"
            style={{
              display: caption ? "flex" : "none",
              backgroundColor: name ? "white" : "transparent",
              fontSize: caption.length < 14 ? "small" : "x-small",
            }}
          >
            {caption}
          </div>
        </div>
      );
    });
  };

  const renderFooter = () => {
    if (privateScope) {
      return (
        <>
          <BlockTitle>
            <Icon
              md={`material:${data.isPublic ? "public" : "lock"}`}
              ios={`material:${data.isPublic ? "public" : "lock"}`}
              aurora={`material:${data.isPublic ? "public" : "lock"}`}
            ></Icon>
            {data.isPublic ? "Public" : "Private"}
          </BlockTitle>
          <BlockTitle>{moment(data.createdAt.toDate()).calendar()}</BlockTitle>
        </>
      );
    } else {
      return (
        <>
          <BlockTitle>
            <Icon
              md="material:person"
              ios="material:person"
              aurora="material:person"
            />
            <b>{data.username}</b>
          </BlockTitle>
          <BlockTitle>{moment(data.createdAt.toDate()).calendar()}</BlockTitle>
        </>
      );
    }
  };

  const renderDeleteButton = () => {
    function onClickDelete() {
      f7.dialog.confirm(
        "This action will be irreversible",
        "Are you sure you want to delete this social story?",
        deleteStory
      );
    }

    function deleteStory() {
      dispatch(actions.socialStoryActions.deleteSocialStory(data.id));
    }

    if (privateScope) {
      return (
        <Link
          cardClose
          onClick={onClickDelete}
          className="card-opened-fade-in custom-card__icon-delete"
          iconF7="trash"
          color="red"
        />
      );
    }
  };

  return (
    <Card
      onCardOpen={() => onTouchCard(true)}
      onCardClose={() => onTouchCard(false)}
      expandable
      expandableAnimateWidth
      swipeToClose
      closeByBackdropClick
      className="card-short custom-card"
    >
      <CardContent padding={false}>
        <div className="container">
          <div className="row">
            <div className="col bg-color-white card-title">
              <CardHeader textColor="black" className="display-block">
                {data.title}
                <br />
              </CardHeader>
              <Link
                cardClose
                className="card-opened-fade-in custom-card__icon-close"
                iconF7="multiply_circle_fill"
              />
              {renderDeleteButton()}
              <div className="row padding-horizontal-half">
                <div className="row justify-content-start custom-card__tags">
                  {renderTags()}
                </div>
                <div className="row custom-card__subtitle justify-content-space-between align-items-center margin-horizontal-half padding-top-half">
                  {renderFooter()}
                </div>
              </div>
            </div>
          </div>
          <div className="row card-content-padding ">
            <div className="col bg-color-primary text-color-white card-content">
              <div className="card-content__inner">
                <div className="card-content__inner__description">
                  <h4>Description</h4>
                  <p>{data.description}</p>
                </div>
                <hr />
                <div className="card-content__inner__pictograms">
                  {renderPictograms()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;
