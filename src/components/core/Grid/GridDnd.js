import React, { useState, useEffect } from 'react';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";
import './GridDnd.scss'

const GridDnd = ({ elements }) => {
    const [items, setItems] = useState([]); // supply your own state
    useEffect(
        () => {
            setItems(elements)
        }, [elements]
    );
    // target id will only be set if dragging from one dropzone to another.
    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        const nextState = swap(items, sourceIndex, targetIndex);
        console.log(`Next state: ${nextState}`);
        setItems(nextState);
    }

    return (
        <GridContextProvider onChange={onChange}>
            <div className="dnd-container">

                <GridDropZone
                    className="dropzone"
                    id="items"
                    boxesPerRow={3}
                    rowHeight={200}
                >
                    {items.map((item, idx) => (
                        <GridItem key={idx}>
                            <div className="grid-item">
                                <div className="grid-item-content">
                                    <img
                                        src={item}
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