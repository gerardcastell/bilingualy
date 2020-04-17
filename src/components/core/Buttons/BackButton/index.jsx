import React from "react";
import "../index.scss";
import { Button } from "framework7-react";

const BackButton = () => {
  return (
    <Button
      className='back-button'
      small
      raised
      round
      iconMaterial='arrow_forward'
    >
      Next
    </Button>
  );
};

export default BackButton;
