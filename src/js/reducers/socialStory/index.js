import { ADD_PICTOGRAM } from '../../../constants'

const initialState = [];
export default (state = initialState, { type, payload }) => {
    switch (type) {

        case ADD_PICTOGRAM:
            return [...state, payload];

        default:
            return state
    }
}
