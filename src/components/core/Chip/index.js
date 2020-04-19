import React from 'react'
import { Chip } from 'framework7-react'

const CustomChip = ({ text, color, onDelete }) => {
    return (
        <>
            <Chip onDelete={onDelete} deleteable className="margin-horizontal-half" text={text} color={color} />
        </>
    )
}

export default CustomChip
