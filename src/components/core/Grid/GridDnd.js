import React, { useState, useEffect } from 'react';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";
import './GridDnd.scss'

const GridDnd = ({ elements, onUpdate }) => {
    const handleChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        const nextState = swap(elements, sourceIndex, targetIndex);
        onUpdate(nextState)
    }
    return (
        <GridContextProvider onChange={handleChange}>
            <div className="dnd-container">

                <GridDropZone
                    className="dropzone"
                    id="items"
                    boxesPerRow={3}
                    rowHeight={100}
                >
                    {elements.map((item) => (
                        <GridItem key={item.key}>
                            <div className="grid-item">
                                <div className="grid-item-content">
                                    <img
                                        src={item.url}
                                        alt=''
                                        className="image"
                                    />
                                </div>
                            </div>
                        </GridItem>
                    ))}
                </GridDropZone>
            </div>

        </GridContextProvider>
    );
}

export default GridDnd;