import React, { useEffect, useState } from "react";
import {
    Page,
    Navbar,
    Block,
    BlockTitle,
    NavRight,
    Link,
    Button,
    LoginScreen,
    View,
    LoginScreenTitle,
    List,
    ListInput,
    ListButton,
    BlockFooter,
    Popup,
} from "framework7-react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../redux/actions";
import { f7 } from "framework7-react";

const SignUpPopup = ({ openSignUp, closeSignUp }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const auth = useSelector((state) => state.auth);
    const firebase = useSelector((state) => state.firebase);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('HA ENTRADO EN EL USE EFFECT')
        closeSignUp()
    }, [firebase.auth.uid])

    const signIn = () => {
        dispatch(actions.authActions.signUp({ username, email, password }));
    };

    const showSignedIn = () => {
        if (auth.authError) {
            return <BlockFooter style={{ color: "red" }}>{auth.authError}</BlockFooter>;
        }
    };

    return (
        <Popup className='signup-popup' opened={openSignUp} swipeToClose>
            <Page loginScreen>
                <Navbar>
                    <NavRight>
                        <Link popupClose>Close</Link>
                    </NavRight>
                </Navbar>
                <div
                    style={{
                        height: "100%",
                        width: "100%",
                        flexDirection: "column",
                    }}
                    className='display-flex justify-content-center align-items-center'
                >
                    <LoginScreenTitle>Welcome to Bilingualy!</LoginScreenTitle>
                    <List form style={{ margin: 0, width: "100%" }}>
                        <ListInput
                            type='text'
                            name='Username'
                            placeholder='Your username'
                            value={username}
                            onInput={(e) => setUsername(e.target.value)}
                        ></ListInput>
                        <ListInput
                            type='text'
                            name='Email'
                            placeholder='Your email'
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                        ></ListInput>
                        <ListInput
                            type='password'
                            name='password'
                            placeholder='Your password'
                            value={password}
                            onInput={(e) => setPassword(e.target.value)}
                        ></ListInput>
                    </List>
                    <List style={{ margin: 0, width: "100%", marginTop: "1.5rem" }}>
                        <Button onClick={signIn}>Sign Up</Button>
                        <BlockFooter>{showSignedIn()}</BlockFooter>
                        <p>{openSignUp ? 'OpenSignUp true' : 'OpenSignUp false'}</p>
                        <p>{firebase.auth.uid ? 'firebase.auth.uid true' : 'firebase.auth.uid false'}</p>
                    </List>
                </div>
            </Page>
        </Popup>
    );
};

export default SignUpPopup;
