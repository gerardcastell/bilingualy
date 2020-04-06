import React, { useState } from 'react'
import Draggable from "react-draggable";

const PictogramDragable = () => {
    [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
    // handleDrag = (e, ui) => {
    // const {x, y} = this.state.deltaPosition;
    // this.setState({
    //   deltaPosition: {
    //     x: x + ui.deltaX,
    //     y: y + ui.deltaY,
    //   }
    // });
    //   };
    handleDrag = (e, ui) => {
        console.log(`El ui es: ${ui}`)
    };

    return (
        <div>
            <p>HOLA</p>
            <Draggable >
                <div className="box" style={{ width: '100px', backgroundColor: 'red' }}>I can be dragged anywhere</div>
            </Draggable>

            <Draggable onDrag={this.handleDrag}>
                <div className="box">
                    <div>I track my deltas</div>
                </div>
            </Draggable>

            {/* <Draggable onDrag={this.handleDrag} {...dragHandlers}>
                <div className="box">
                    <div>I track my deltas</div>
                    <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
                </div>
            </Draggable> */}
        </div>
    )
}

export default PictogramDragable
