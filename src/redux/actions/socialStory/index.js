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

const createSocialStory = payload => (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('prueba').add({
        pictograms: payload,
        createdAt: new Date()
    }).then(() => {
        dispatch({ type: CREATE_SOCIAL_STORY, payload })
    }).catch((err) => {
        dispatch({ type: CREATE_SOCIAL_STORY_ERROR, err })
    })
}

export default {
    addPictogram,
    createSocialStory
}
