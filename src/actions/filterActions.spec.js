import { setFilter } from './filterActions'
import * as types from '../types/filterTypes'
import { SET_VISIBILITY_FILTER } from "../types/actionTypes";

it(' should change filter value', () => {
    const expectedAction1 = {
        type: SET_VISIBILITY_FILTER,
        payload: types.SHOW_ACTIVE
    }
    const expectedAction2 = {
        type: SET_VISIBILITY_FILTER,
        payload: types.SHOW_COMPLETED
    }
    const expectedAction3 = {
        type: SET_VISIBILITY_FILTER,
        payload: types.SHOW_ALL
    }
    expect(setFilter(types.SHOW_ACTIVE)).toEqual(expectedAction1)
    expect(setFilter(types.SHOW_COMPLETED)).toEqual(expectedAction2)
    expect(setFilter(types.SHOW_ALL)).toEqual(expectedAction3)
})