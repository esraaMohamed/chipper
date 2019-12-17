import { combineReducers } from 'redux'
import authedUser from './authedUserReducer'
import users from './usersReducer'
import tweets from './tweetsReducer'
import { loadingBarReducer} from "react-redux-loading";

export default combineReducers ({
    authedUser, users, tweets, loadingBar: loadingBarReducer
})