import React, { useState } from 'react'
import {
    Page,
    Navbar,
    Block,
    BlockTitle,
    Link,
    ListInput,
    List,
    ListItem,
    Toggle,
    Icon,
    Row,
    Col,
    Button,
} from "framework7-react";

import NextButton from '../../core/Buttons/NextButton';
import BackButton from '../../core/Buttons/BackButton';

import { useSelector, useDispatch } from 'react-redux'

import actions from '../../../redux/actions'

import './style.scss'

const Step4 = () => {
    const [publicStory, setPublicStory] = useState(false)

    const dispatch = useDispatch();

    const handleToggle = (value) => {
        setPublicStory(value)
    }

    const nextStep = () => {
        // dispatch(actions.socialStoryActions.addTitle({ title, description }))
        dispatch(actions.socialStoryActions.nextStep())
    }

    return (
        <>
            <Block>
                <BlockTitle>Your story is almost finished:</BlockTitle>
                <div className="content" >
                    <span>Do you want to share your story with Bilingualy community?</span>
                    <List simpleList className="list-custom">
                        <ListItem>
                            <span>Public</span>
                            <Toggle onToggleChange={(value) => handleToggle(value)} />
                        </ListItem>
                    </List>
                    <span className="span-spacer">
                        Your social story will be <b>{publicStory ? 'public' : 'private'}</b>
                    </span>
                    <span className="span-spacer" />
                    <Button raised fill >Save</Button>
                </div>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                    </Col>

                    <Col>
                    </Col>
                </Row>
            </Block>

            <BackButton clicked={() => dispatch(actions.socialStoryActions.backStep())
            } />
        </>
    )
}

export default Step4
