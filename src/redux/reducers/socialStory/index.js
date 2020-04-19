import {
    ADD_PICTOGRAMS,
    CREATE_SOCIAL_STORY,
    CREATE_SOCIAL_STORY_ERROR,
    NEXT_STEP,
    BACK_STEP,
    MOVE_TO_STEP,
    ADD_TITLE,
    ADD_TAGS
} from '../../../constants'

const initialState = {
    step: 2,
    pictograms: [],
    title: null,
    description: null,
    isPublic: false,
    tags: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PICTOGRAMS:
            return {
                ...state,
                pictograms: action.payload
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

        case BACK_STEP:
            return {
                ...state,
                step: state.step - 1
            }

        case MOVE_TO_STEP:
            return {
                ...state,
                step: action.payload
            }

        case ADD_TITLE:
            return {
                ...state,
                title: action.payload.title,
                description: action.payload.description
            }

        case ADD_TAGS:
            return {
                ...state,
                tags: payload
            }

        default:
            return state;
    }
}
