import React from 'react';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";
import './GridDnd.scss'

const GridDnd = ({ elements }) => {
    const [items, setItems] = React.useState([]); // supply your own state
    React.useEffect(
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
            <GridDropZone
                id="items"
                boxesPerRow={3}
                rowHeight={200}
                style={{ height: "200px", width: '800px', backgroundColor: 'gray' }}
            >
                {items.map((item, idx) => (
                    <GridItem key={item}>
                        <div
                            key={idx}
                            style={{
                                pointerEvents: "none",
                                width: "100%",
                                height: "100%",
                                backgroundColor: 'white',
                                zIndex: 30
                            }}
                        >
                            <img
                                src={item}
                                alt=''
                                style={{ zIndex: 20, height: "100px", width: "100px", display: 'flex', justifyContent: 'center' }}
                            />
                        </div>
                    </GridItem>
                ))}
            </GridDropZone>
        </GridContextProvider>
    );
}

export default GridDnd;