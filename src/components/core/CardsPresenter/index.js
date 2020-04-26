import React, { useState, useEffect } from "react";
import { Button, Icon, f7 } from "framework7-react";
import { useFirestoreConnect } from "react-redux-firebase";

import { useDispatch, useSelector } from "react-redux";

import StoryCard from "../StoryCard";
import DashboardSckeleton from "../../Dashboard/Skeleton";

const CardsPresenter = ({ variant, searchFilter, onCardOpen }) => {
  const [loading, setLoading] = useState(true);

  const uid = useSelector((state) => state.firebase.auth.uid);
  const isOnline = useSelector((state) => state.device.online);
  const requestStatus = useSelector(
    (state) => state.firestore.status.requested
  );

  const privateStories = useSelector(
    (state) => state.firestore.ordered.privateStories
  );
  const publicStories = useSelector(
    (state) => state.firestore.ordered.publicStories
  );
  useFirestoreConnect([
    {
      collection: "socialStories",
      where: [["isPublic", "==", true]],
      storeAs: "publicStories",
    },
    {
      collection: "socialStories",
      where: [["userId", "==", uid ? uid : ""]],
      storeAs: "privateStories",
    },
  ]);

  useEffect(() => {
    setLoading(!requestStatus.privateStories);
  });

  const renderTitle = () => {
    if (variant === "home") {
      return (
        <Button raised outline className="dashboard-title-button">
          MY SOCIAL STORIES
          <Icon
            md="material:lock"
            ios="material:lock"
            aurora="material:lock"
          ></Icon>
        </Button>
      );
    } else {
      return (
        <Button raised outline className="dashboard-title-button">
          COMMUNITY STORIES
          <Icon
            md="material:public"
            ios="material:public"
            aurora="material:public"
          ></Icon>
        </Button>
      );
    }
  };

  const renderCards = () => {
    let fetchedStories = variant === "home" ? privateStories : publicStories;
    let finalStories;

    if (!loading && fetchedStories) {
      if (searchFilter) {
        const regex = new RegExp(searchFilter.toLowerCase());
        const filteredStories = fetchedStories.filter((item) =>
          item.title.toLowerCase().match(regex)
        );

        finalStories = filteredStories;
        if (!finalStories.length) {
          return (
            <div className="list-empty-result">
              <div className="icon-no-results">
                <Icon
                  md="f7:square_stack_3d_up_slash"
                  ios="f7:square_stack_3d_up_slash"
                  aurora="f7:square_stack_3d_up_slash"
                ></Icon>
                <p>Nothing found with this title</p>
              </div>
            </div>
          );
        }
      } else if (fetchedStories.length && !isOnline) {
        return (
          <div className="icon-no-results">
            <Icon
              md="material:wifi_off"
              ios="material:wifi_off"
              aurora="material:wifi_off"
            ></Icon>
            <p>
              There are connectivity issues and the app couldn't precache any
              social story
            </p>
          </div>
        );
      } else if (!searchFilter && !fetchedStories.length) {
        return (
          <div className="icon-no-results">
            <Icon
              md="f7:person_2_square_stack_fill"
              ios="f7:person_2_square_stack_fill"
              aurora="f7:person_2_square_stack_fill"
            ></Icon>
            <p>
              You don't have created <br />
              any social story yet
            </p>
          </div>
        );
      } else {
        finalStories = fetchedStories;
      }

      return (
        <>
          {finalStories.map((item, idx) => (
            <StoryCard
              privateScope={variant === "home"}
              className="item-content"
              key={idx}
              id={item.title}
              onTouchCard={onCardOpen}
              data={item}
            />
          ))}
        </>
      );
    } else {
      return <DashboardSckeleton />;
    }
  };

  return (
    <>
      <div className="container-content">
        <div className="col container-content__col">
          {renderTitle()}
          {renderCards()}
        </div>
      </div>
    </>
  );
};

export default CardsPresenter;
