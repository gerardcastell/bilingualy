import React from 'react'
import { Panel, View, Page, Navbar, Icon, Block, Button, f7 } from 'framework7-react'
import { useSelector, useDispatch } from "react-redux";

import actions from '../../../redux/actions'

const SidePanel = () => {
    const auth = useSelector(state => state.firebase.auth)
    const username = useSelector(state => state.firebase.profile.username)

    const dispatch = useDispatch();

    const showLogButton = () => {
        if (auth.uid) {
            return (
                <>
                    <p>Logged as {username}</p>
                    <Button fill onClick={() => { dispatch(actions.authActions.signOut()); f7.panel.close("right") }}>Log out</Button>
                </>
            )
        } else {
            return (
                <Button fill href="/login/">Log in</Button>
            )
        }
    }
    return (
        <Panel right cover themeDark>
            <View>
                <Page>
                    <Navbar>
                        <Icon md={`material:person`}></Icon>
                     My profile
                    </Navbar>
                    <Block>
                        {showLogButton()}
                    </Block>
                </Page>
            </View>
        </Panel>
    )
}

export default SidePanel
