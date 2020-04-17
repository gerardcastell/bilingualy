import Stepper from 'react-stepper-horizontal';
import React from 'react';
import './index.scss'

const CustomStepper = ({ steps, activeStep }) => {
    return (
        <>
            <Stepper
                // circleTop={0}
                completeBarColor="#68a3e3"
                completeColor="#68a3e3"
                activeColor="#468edd"
                steps={steps}
                activeStep={activeStep}
            />
        </>
    )
}

export default CustomStepper
