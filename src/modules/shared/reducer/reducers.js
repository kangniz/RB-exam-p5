import {
  handleActions
} from 'redux-actions'
import * as T from './actionTypes'

const initialState = {
  langList: [],
  navType: ''
}

export const sharedModel = handleActions({
  [T.GET_LANG_LIST]: {
    next(state, action) {
      return {
        ...state,
        langList: action.payload.data
      }
    }
  },
  [T.SET_NAV_TYPE]: {
    next(state, action) {
      return {
        ...state,
        navType: action.payload
      }
    }
  }
}, initialState)
