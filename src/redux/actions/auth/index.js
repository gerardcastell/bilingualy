import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNOUT_SUCCESS, SIGNOUT_FAILED } from '../../../constants';

const signIn = (payload) => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
        payload.email,
        payload.password
    ).then(() => {
        dispatch({
            type: LOGIN_SUCCESS,
        })
    }).catch((err) => {
        dispatch({
            type: LOGIN_FAILED,
            err
        })
    })
}

const signOut = () => (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
        dispatch({
            type: SIGNOUT_SUCCESS
        })
    }).catch(() => {
        dispatch({
            type: SIGNOUT_FAILED
        })
    })
}

export default {
    signIn,
    signOut
}