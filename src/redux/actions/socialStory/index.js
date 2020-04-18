import {
    ADD_PICTOGRAM,
    UNDO_PICTOGRAM,
    UPDATE_PICTOGRAMS_POSITION,
    NEXT_STEP,
    MOVE_TO_STEP,
    CREATE_SOCIAL_STORY,
    CREATE_SOCIAL_STORY_ERROR
} from '../../../constants'

const addPictogram = (payload) => {
    return {
        type: ADD_PICTOGRAM,
        payload
    }
}

const undoPictogram = () => {
    return {
        type: UNDO_PICTOGRAM
    }
}

const nextStep = () => {
    return ({ type: NEXT_STEP })
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
    addPictogram,
    undoPictogram,
    createSocialStory,
    nextStep
}
