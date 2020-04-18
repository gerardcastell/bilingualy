import React from "react";
import "../index.scss";
import { Button } from "framework7-react";

const UndoButton = ({ clicked, disabled }) => {
  return (
    <Button
      onClick={() => clicked()}
      className='undo-button'
      color='gray'
      fill
      raised
      round
      disabled={disabled}
      iconMaterial='undo'
    >
      Undo
    </Button>
  );
};

export default UndoButton;
