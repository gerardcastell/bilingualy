import React from "react";
import "../index.scss";
import { Button } from "framework7-react";

const BackButton = ({ clicked }) => {
  return (
    <Button
      onClick={() => clicked()}
      className='back-button'
      small
      raised
      round
      iconMaterial='arrow_back'
    >
      Back
    </Button>
  );
};

export default BackButton;
