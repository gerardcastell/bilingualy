import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNOUT_SUCCESS, SIGNOUT_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED } from '../../../constants';
import { firebaseWrapper } from '../../../utils'
import { f7 } from "framework7-react";

const signIn = (payload) => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    f7.dialog.preloader()
    try {
        await firebaseWrapper(firebase.auth().signInWithEmailAndPassword(
            payload.email,
            payload.password
        ))
        dispatch({ type: LOGIN_SUCCESS })
    } catch (err) {
        console.log('jajaj', err)
        dispatch({ type: LOGIN_FAILED, err })
    }
    f7.dialog.close()

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

    f7.dialog.preloader()
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
    }).finally(() => {
        f7.dialog.close()
    })
}


export default {
    signIn,
    signOut,
    signUp
}