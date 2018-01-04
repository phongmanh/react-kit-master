
import * as types from '../../src/actions/actionTypes'


export function Loading(state = [], action) {
    switch (action.type) {
        case types.PAGE_LOAD:
            return [...state, { type: action.type, status: action.status }]
        default:
            return state;
    }
}