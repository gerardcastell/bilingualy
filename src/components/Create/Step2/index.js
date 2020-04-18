import React from 'react'
import {
    Page,
    Navbar,
    Block,
    BlockTitle,
    Link,
    ListInput,
    List,
    Fab,
    FabButtons,
    FabButton,
    Icon,
    Button,
} from "framework7-react";

import NextButton from '../../core/Buttons/NextButton';
import BackButton from '../../core/Buttons/BackButton';

import { useSelector } from 'react-redux'

const Step2 = () => {
    const story = useSelector(state => state.socialStory);

    return (
        <>
            <BlockTitle>Add a title and a description:</BlockTitle>
            <Block>
            </Block>
            <NextButton disabled={true} />
            <BackButton />
        </>
    )
}

export default Step2
