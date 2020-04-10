
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";
import React from 'react';

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
                style={{ height: "400px", backgroundColor: 'gray' }}
            >
                {items.map((item) => (
                    <GridItem key={item}>
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: 'white'
                            }}
                        >
                            <img
                                src={item}
                                alt=''
                                style={{ height: "100px", width: "100px", display: 'flex', justifyContent: 'center' }}
                            />
                            {item}
                        </div>
                    </GridItem>
                ))}
            </GridDropZone>
        </GridContextProvider>
    );
}

export default GridDnd;