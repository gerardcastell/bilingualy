import React, { useState, useEffect } from "react";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

import useWindowDimensions from "../../Hooks/UseWindowDimensions";

import "./style.scss";

const GridDnd = ({ elements, onUpdate }) => {
  const { height, width } = useWindowDimensions();

  const getHeight = () => {
    if (height < 350) {
      return 100;
    } else if (width < 420) {
      return 125;
    } else {
      return 150;
    }
  };

  const getBoxesPerRow = () => {
    if (width < 480) {
      return 3;
    } else if (width < 781) {
      return 5;
    } else {
      return 6;
    }
  };

  const handleChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const nextState = swap(elements, sourceIndex, targetIndex);
    onUpdate(nextState);
  };
  return (
    <GridContextProvider onChange={handleChange}>
      <div className="dnd-container">
        <GridDropZone
          className="dropzone"
          id="items"
          boxesPerRow={getBoxesPerRow()}
          rowHeight={getHeight()}
        >
          {elements.map((item) => (
            <GridItem
              key={item.key || item.position}
              style={{ marginBottom: "2rem", marginTop: "2rem" }}
            >
              <div className="grid-item">
                <div className="grid-item-content">
                  <img src={item.url} alt="" className="image" />
                </div>
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </div>
    </GridContextProvider>
  );
};

export default GridDnd;
