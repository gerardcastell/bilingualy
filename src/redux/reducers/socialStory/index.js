import {
    ADD_PICTOGRAM,
    UNDO_PICTOGRAM,
    CREATE_SOCIAL_STORY,
    CREATE_SOCIAL_STORY_ERROR
} from '../../../constants'

const initialState = { pictograms: [] };
export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PICTOGRAM:
            return {
                ...state,
                pictograms: [...state.pictograms, action.payload]
            };

        case UNDO_PICTOGRAM:
            return {
                ...state,
                pictograms: state.pictograms.filter((item, idx) => idx !== (state.pictograms.length - 1))
            };

        case CREATE_SOCIAL_STORY:
            console.log('Created social story')
            return initialState;

        case CREATE_SOCIAL_STORY_ERROR:
            console.error(`Created social story FAIL: ${action.payload}`);
            return state;

        default:
            return state;
    }
}
