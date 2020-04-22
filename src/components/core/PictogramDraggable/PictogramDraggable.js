import React, { useState } from 'react'
import { Device, Request, Support } from 'framework7';
import { f7, f7ready, theme } from 'framework7-react';
import Draggable from "react-draggable";

import './PictogramDraggable.scss'

const PictogramDragable = () => {
  const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 })
  const divRef = React.useRef()

  const handleDrag = (e, position) => {
    const { x, y } = position;
      setDeltaPosition({ x, y })
  };

  const relocateDrop = (e, position) => {
    const { x, y } = position;
    console.log(divRef.current.style.width)

    if(x > 250){
      if(y > 250){
        setDeltaPosition({ x:400, y:400 })
      }else{
        setDeltaPosition({ x:400, y:25 })
      }
    }else{
      if(y > 250){
        setDeltaPosition({ x:25, y:400 })
      }else{
        setDeltaPosition({ x:25, y:25 })
      }
    }
  }


  return (
    <div>
      <h1>React Draggable</h1>
      <div id="divR" ref={divRef} className="box" style={{ height: '500px', width: '500px', position: 'relative', overflow: 'hidden', padding: '10px', backgroundColor: 'gray' }}>
        <Draggable bounds="parent" defaultPosition={{ x: 25, y: 25 }} onDrag={handleDrag} position={deltaPosition} onStop={relocateDrop}>
          <div className="box box-draggable">
            <div>1</div>
            <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
          </div>
        </Draggable>
      </div>
      <div className="block-title">Columns with gap</div>
      <div className="block">
        <div className="row">
          <div className="col">33% (.col)</div>
          <div className="col">33% (.col)</div>
          <div className="col">33% (.col)</div>
        </div>
      </div>
    </div>
  )
}

export default PictogramDragable
