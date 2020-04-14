import React from 'react'
import { Panel, View, Page, Navbar, Block, Button, ListItem } from 'framework7-react'
import { useSelector, useDispatch } from "react-redux";

import actions from '../../../redux/actions'

const index = () => {
    const auth = useSelector(state => state.firebase.auth)
    const dispatch = useDispatch();

    const showLogButton = () => {
        if (auth.uid) {
            return (
                <>
                    <Button fill onClick={() => dispatch(actions.authActions.signOut())}>Log out</Button>
                </>
            )
        } else {
            return (
                <Button fill href="/login/">Log in</Button>
            )
        }
    }
    return (
        <Panel right cover themeDark swipe>
            <View>
                <Page>
                    <Navbar title='My profile' />
                    <Block>
                        {showLogButton()}
                    </Block>
                </Page>
            </View>
        </Panel>
    )
}

export default index
