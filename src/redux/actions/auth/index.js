import { LOGIN_SUCCESS, LOGIN_FAILED, SIGNOUT_SUCCESS, SIGNOUT_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED } from '../../../constants';
import { f7 } from "framework7-react";
import { firebaseWrapper } from '../../../utils'
const signIn = (payload) => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    f7.dialog.preloader()

    try {
        await firebaseWrapper(firebase.auth().signInWithEmailAndPassword(
            payload.email,
            payload.password
        ))
        dispatch({ type: LOGIN_SUCCESS })

    } catch (e) {
        dispatch({ type: LOGIN_FAILED, e })
    }

    f7.dialog.close()

}

const signOut = () => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
        await firebase.auth().signOut();
        dispatch({ type: SIGNOUT_SUCCESS })

    } catch (e) {
        dispatch({ type: SIGNOUT_FAILED })
    }
}

const signUp = (payload) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    f7.dialog.preloader()

    try {
        const firebaseRes = await firebaseWrapper(firebase.auth().createUserWithEmailAndPassword(
            payload.email,
            payload.password
        ))

        await firestore.collection('users')
            .doc(firebaseRes.user.uid)
            .set({ username: payload.username })
        dispatch({ type: SIGNUP_SUCCESS })

    } catch (e) {
        console.log(e)
        dispatch({ type: SIGNUP_FAILED, err: e })
    }

    f7.dialog.close()
}


export default {
    signIn,
    signOut,
    signUp
}