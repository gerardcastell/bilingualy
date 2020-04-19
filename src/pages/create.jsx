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
import { f7 } from "framework7-react";

import Stepper from "../components/core/Stepper";
import Step1 from "../components/Create/Step1/index";
import Step2 from "../components/Create/Step2/index";
import Step3 from "../components/Create/Step3/index";
import Step4 from "../components/Create/Step4/index";

import { useDispatch, useSelector } from "react-redux";

const createPage = ({ f7router }) => {
  const activeStep = useSelector((state) => state.socialStory.step);
  const steps = [
    { title: "Design" },
    { title: "Title" },
    { title: "Tags" },
    { title: "Save" },
  ];
  const confirmBack = () => {
    f7.dialog.confirm(
      "Current social story will be deleted if you go on. Go back anyway?",
      () => {
        f7router.navigate("/");
      },
      () => {
        f7router.navigate("/create/");
        console.log("Delete current object");
      }
    );
  };

  const showStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      case 3:
        return <Step4 />;
      default:
        return <p>Unexpected error</p>;
    }
  };

  return (
    <Page>
      <Navbar
        onClickBack={confirmBack}
        title='Create your social story'
        backLink='Back'
      />
      <Stepper steps={steps} activeStep={activeStep} />
      {showStep()}
      {/* <Step1 /> */}
    </Page>
  );
};

export default createPage;
