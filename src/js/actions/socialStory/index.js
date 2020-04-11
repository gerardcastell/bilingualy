import { ADD_PICTOGRAM } from '../../../constants'

const addPictogram = (payload) => {
    return {
        type: ADD_PICTOGRAM,
        payload
    }
}

export default {
    addPictogram
}
