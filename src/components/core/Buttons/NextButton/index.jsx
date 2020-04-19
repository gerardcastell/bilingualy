import React from "react";
import "../index.scss";
import { Button } from "framework7-react";
const NextButton = ({ clicked, disabled }) => {
  return (
    <Button
      onClick={() => clicked()}
      disabled={disabled}
      className='next-button'
      small
      raised
      round
      iconMaterial='arrow_forward'
    >
      Next
    </Button>
  );
};

export default NextButton;
