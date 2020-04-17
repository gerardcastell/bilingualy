import Stepper from 'react-stepper-horizontal';

import React from 'react'

const CustomStepper = ({steps, activeStep}) => {
    return (
        <>
            <Stepper titleTop="6"	 activeTitleColor="#468edds" activeColor="#468edd" completeColor="#468edd" steps={ [{title: 'Step One'}, {title: 'Step Two'}, {title: 'Step Three'}, {title: 'Step Four'}] } activeStep={ 1 } />
        </>
    )
}

export default CustomStepper
