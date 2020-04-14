import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNOUT_SUCCESS, SIGNOUT_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED } from '../../../constants';

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

const signUp = (payload) => (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
        payload.email,
        payload.password
    ).then((response) => {
        return firestore.collection('users').doc(response.user.uid).set({
            username: payload.username,
        })
    }).then(() => {
        dispatch({
            type: SIGNUP_SUCCESS
        })
    }).catch((err) => {
        dispatch({
            type: SIGNUP_FAILED,
            err
        })
    })

}


export default {
    signIn,
    signOut,
    signUp
}