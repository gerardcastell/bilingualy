import React from "react";
import "../index.scss";
import { Button } from "framework7-react";
const NextButton = ({ clicked, disabled }) => {
  return (
    <Button
      className='next-button'
      disabled={disabled}
      small
      onClick={clicked}
      raised
      round
      iconMaterial='arrow_forward'
    >
      Next
    </Button>
  );
};

export default NextButton;
