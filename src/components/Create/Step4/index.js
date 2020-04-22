import React, { useState, useEffect } from 'react'
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
    f7
} from "framework7-react";

import BackButton from '../../core/Buttons/BackButton';

import { useSelector, useDispatch } from 'react-redux'

import actions from '../../../redux/actions'

import { SUCCESS, FAILURE } from '../../../constants'

import './style.scss'

const Step4 = ({ onSuccess }) => {
    const [publicStory, setPublicStory] = useState(false)

    const requestState = useSelector(state => state.socialStory.requestState);

    useEffect(() => {
        if (requestState === SUCCESS) {
            f7.dialog.alert("You will be redirected to your dashboard.", "Social Story saved properly!", onSuccess)
        } else if (requestState === FAILURE) {
            f7.dialog.alert(
                "Social Story saved properly! Find it in your dashboard", "Ooops! Something went wrong",
                null
            )
        }
    }, [requestState])

    const dispatch = useDispatch();

    const handleToggle = (value) => {
        setPublicStory(value)
    }

    const handleSave = () => {
        dispatch(actions.socialStoryActions.addPrivacity(publicStory))
        dispatch(actions.socialStoryActions.createSocialStory())
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
                    <Button raised fill onClick={() => { handleSave() }} >Save</Button>
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
