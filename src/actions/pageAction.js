
import * as types from './actionTypes'
import 'whatwg-fetch'

export function page_Loading() {
    return dispatch => {
        dispatch({
            type: types.PAGE_LOAD,
            status: 'LOADING'
        })
    }
}


