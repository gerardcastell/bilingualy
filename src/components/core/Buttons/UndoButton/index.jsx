import React from "react";
import "../index.scss";
import { Button } from "framework7-react";

const UndoButton = ({ clicked }) => {
  return (
    <Button
      onClick={() => clicked()}
      className='undo-button'
      color='gray'
      fill
      raised
      round
      iconMaterial='undo'
    >
      Undo
    </Button>
  );
};

export default UndoButton;
