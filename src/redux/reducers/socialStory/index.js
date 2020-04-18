import {
    ADD_PICTOGRAM,
    UNDO_PICTOGRAM,
    CREATE_SOCIAL_STORY,
    CREATE_SOCIAL_STORY_ERROR,
    NEXT_STEP,
    MOVE_TO_STEP,
} from '../../../constants'

const initialState = {
    step: 1,
    pictograms: [],
    title: null,
    description: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PICTOGRAM:
            const index = state.pictograms.length;
            return {
                ...state,
                pictograms: [...state.pictograms, { url: action.payload, position: index }]
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

        case NEXT_STEP:
            return {
                ...state,
                step: state.step + 1
            }

        case MOVE_TO_STEP:
            return {
                ...state,
                step: action.payload
            }

        default:
            return state;
    }
}
