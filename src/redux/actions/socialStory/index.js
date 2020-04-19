import {
    ADD_PICTOGRAMS,
    NEXT_STEP,
    BACK_STEP,
    MOVE_TO_STEP,
    CREATE_SOCIAL_STORY,
    CREATE_SOCIAL_STORY_ERROR,
    ADD_TITLE
} from '../../../constants'

const addPictograms = (payload) => {
    return {
        type: ADD_PICTOGRAMS,
        payload
    }
}

const nextStep = () => {
    return ({ type: NEXT_STEP })
}

const backStep = () => {
    return ({ type: BACK_STEP })
}

const addTitle = (payload) => {
    return ({
        type: ADD_TITLE,
        payload
    })
}

const createSocialStory = payload => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    try {
        await firestore.collection('prueba').add({
            pictograms: payload,
            username: profile.username,
            userId,
            createdAt: new Date()
        })
        dispatch({ type: CREATE_SOCIAL_STORY, payload })

    } catch (e) {
        dispatch({ type: CREATE_SOCIAL_STORY_ERROR, err: e })
    }
}

export default {
    addPictograms,
    createSocialStory,
    nextStep,
    backStep,
    addTitle
}
