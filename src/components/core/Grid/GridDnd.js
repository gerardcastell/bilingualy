import React, { useState, useEffect } from 'react';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";
import './GridDnd.scss'

const GridDnd = ({ elements, onUpdate }) => {
    const [items, setItems] = useState([]); // supply your own state
    useEffect(
        () => {
            setItems(elements)
        }, [elements]
    );

    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        const nextState = swap(items, sourceIndex, targetIndex);
        console.log(`Next state: ${nextState}`);
        setItems(nextState);
        onUpdate(nextState)
    }

    return (
        <GridContextProvider onChange={onChange}>
            <div className="dnd-container">

                <GridDropZone
                    className="dropzone"
                    id="items"
                    boxesPerRow={3}
                    rowHeight={100}
                >
                    {items.map((item) => (
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