import { LOGIN_FAILED, LOGIN_SUCCESS, SIGNOUT_SUCCESS, SIGNOUT_FAILED } from '../../../constants'
const initialState = {
    authError: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, authError: null }

        case LOGIN_FAILED:
            return { ...state, authError: 'Login failed' }

        case SIGNOUT_SUCCESS:
            console.log('SignOut success')
            return state

        case SIGNOUT_FAILED:
            return state

        default:
            return state
    }
}
