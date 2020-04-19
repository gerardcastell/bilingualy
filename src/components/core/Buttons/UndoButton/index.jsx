import React from "react";
import "../index.scss";
import { Button } from "framework7-react";

const UndoButton = ({ clicked, disabled }) => {
  return (
    <Button
      onClick={() => clicked()}
      disabled={disabled}
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
