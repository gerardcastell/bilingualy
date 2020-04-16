import {
    ADD_PICTOGRAM,
    CREATE_SOCIAL_STORY,
    CREATE_SOCIAL_STORY_ERROR
} from '../../../constants'


const addPictogram = (payload) => {
    return {
        type: ADD_PICTOGRAM,
        payload
    }
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
    createSocialStory
}
