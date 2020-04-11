import currentUser from './currentUser'
import counter from './counter'
import socialStory from './socialStory'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  currentUser,
  counter,
  socialStory
})

export default rootReducer