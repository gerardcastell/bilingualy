import {
    ADD_PICTOGRAM,
    CREATE_SOCIAL_STORY,
    CREATE_SOCIAL_STORY_ERROR
} from '../../../constants'

const initialState = [];
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_PICTOGRAM:
            return [...state, payload];
        case CREATE_SOCIAL_STORY:
            console.log('Created social story')
            return initialState;
        case CREATE_SOCIAL_STORY_ERROR:
            console.error(`Created social story FAIL: ${payload}`);
            return state;
        default:
            return state;
    }
}
