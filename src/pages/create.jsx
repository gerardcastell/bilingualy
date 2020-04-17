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
import Step1 from "../components/Create/Step1";

const createPage = ({ f7router }) => {
  const activeStep = 0;
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
        f7router.navigate("/create/");
      },
      () => {
        f7router.navigate("/");
        console.log("Delete current object");
      }
    );
  };

  return (
    <Page>
      <Navbar
        onClickBack={confirmBack}
        title='Create your social story'
        backLink='Back'
      />
      <Stepper steps={steps} activeStep={activeStep} />

      <Step1 />
    </Page>
  );
};

export default createPage;
