import { combineReducers } from 'redux'
import { filterActions, ignoreActions } from 'redux-ignore'
import * as types from '../../src/actions/actionTypes'
import { Loading } from './pageReducer'


const reducersApp = combineReducers({
    pageLoad: filterActions(Loading, [types.PAGE_LOAD]),
})

export default reducersApp;