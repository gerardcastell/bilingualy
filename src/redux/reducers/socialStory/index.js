import {
    ADD_PICTOGRAMS,
    CREATE_SOCIAL_STORY,
    CREATE_SOCIAL_STORY_ERROR,
    NEXT_STEP,
    BACK_STEP,
    ADD_TITLE,
    ADD_TAGS,
    ADD_PRIVACITY,
    INIT_SOCIAL_STORY,
    IDLE,
    SUCCESS,
    FAILURE
} from '../../../constants'

const initialState = {
    step: 0,
    pictograms: [],
    title: null,
    description: null,
    isPublic: false,
    tags: [],
    requestState: IDLE,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case INIT_SOCIAL_STORY:
            return initialState;

        case ADD_PICTOGRAMS:
            return {
                ...state,
                pictograms: action.payload
            };

        case CREATE_SOCIAL_STORY:
            console.log('Created social story')
            return { ...state, requestState: SUCCESS };

        case CREATE_SOCIAL_STORY_ERROR:
            console.error(`Created social story FAIL: ${action.payload}`);
            return { ...state, requestState: FAILURE };


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

        case ADD_TITLE:
            return {
                ...state,
                title: action.payload.title,
                description: action.payload.description
            }

        case ADD_TAGS:
            return {
                ...state,
                tags: action.payload
            }

        case ADD_PRIVACITY:
            return {
                ...state,
                isPublic: action.payload
            }

        default:
            return state;
    }
}
